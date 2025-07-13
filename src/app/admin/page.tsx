import { promises as fs } from 'fs';
import path from 'path';

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

async function getSurveyResponses() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'survey-responses.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading survey responses:', error);
    return [];
  }
}

export default async function AdminPage() {
  const responses = await getSurveyResponses();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-pink-200">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">📊 Survey Responses</h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 text-lg">Total responses: {responses.length}</p>
              {responses.length > 0 && (
                <a
                  href="/api/export-csv"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg flex items-center gap-2"
                >
                  📥 Download CSV/Excel
                </a>
              )}
            </div>
          </div>

          {responses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No responses yet.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {responses.map((response: { id: string; name: string; answers: string[]; timestamp: string; comfortableWith?: string[]; wantToLearn?: string[] }, index: number) => (
                <div key={response.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Response #{index + 1}: {response.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(response.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {questions.map((question, qIndex) => (
                      <div key={qIndex} className="border-l-4 border-blue-200 pl-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-1">
                          {qIndex + 1}. {question}
                        </h3>
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {response.answers[qIndex] || <span className="text-gray-400 italic">No answer provided</span>}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
