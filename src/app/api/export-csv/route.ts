import { NextResponse } from 'next/server';
import { getAllSurveyResponses } from '@/lib/database';

const questions = [
  "Are you comfortable with public speaking or being on stage?",
  "Are you comfortable preparing session material?",
  "How good are you at writing?",
  "How good are you at delivering information clearly to attendees?",
  "Have you heard the term \"analogy\" before? Are you comfortable using analogies to explain concepts?",
  "What is your tech background?",
  "Are you familiar with Docker? If yes, how familiar? Have you tried it?",
  "How comfortable are you with machine learning?",
  "Have you heard of transfer learning before?",
  "Do you know Python?",
  "Have you heard of prompt engineering?",
  "What's your go-to prompt when you talk to ChatGPT?",
  "Do you know DevOps?",
  "Do you know what SDLC is? If yes, explain in one sentence.",
  "Bonus: Feel free to type in Arabic if you want!"
];

export async function GET() {
  try {
    const responses = await getAllSurveyResponses();

    if (responses.length === 0) {
      return NextResponse.json({ error: 'No responses found' }, { status: 404 });
    }

    // Create CSV headers
    const headers = [
      'ID',
      'Name',
      'Timestamp',
      ...questions.map((q, i) => `Q${i + 1}: ${q}`),
      'Comfortable With',
      'Want to Learn'
    ];

    // Create CSV rows
    const csvRows = [
      headers.join(','),
      ...responses.map((response: { id: string; name: string; answers: { [key: string]: string } | string[]; timestamp: string; comfortableWith?: string[]; wantToLearn?: string[] }) => {
        const row = [
          response.id || '',
          `"${response.name || ''}"`,
          response.timestamp || '',
          ...questions.map((_, i) => {
            const questionId = `${Math.floor(i / 5)}-${i % 5}`;
            let answer = '';
            if (Array.isArray(response.answers)) {
              answer = response.answers[i] || '';
            } else {
              answer = response.answers?.[questionId] || '';
            }
            return `"${String(answer).replace(/"/g, '""')}"`;
          }),
          `"${(response.comfortableWith || []).join('; ')}"`,
          `"${(response.wantToLearn || []).join('; ')}"`,
        ];
        return row.join(',');
      })
    ];

    const csvContent = csvRows.join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="skill-check-responses.csv"',
      },
    });
  } catch (error) {
    console.error('Error exporting CSV:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
