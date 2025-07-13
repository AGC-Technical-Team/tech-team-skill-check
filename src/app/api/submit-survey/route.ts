import { NextRequest, NextResponse } from 'next/server';
import { insertSurveyResponse, getAllSurveyResponses, SurveyResponse } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, answers, timestamp } = body;

    // Validate required fields
    if (!name || !answers) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the response object
    const response: SurveyResponse = {
      id: Date.now().toString(),
      name,
      answers,
      comfortableWith: body.comfortableWith || [],
      wantToLearn: body.wantToLearn || [],
      timestamp,
    };

    // Insert into database
    insertSurveyResponse(response);

    // Also log to console for debugging
    console.log('New survey response:', response);

    return NextResponse.json(
      { message: 'Survey submitted successfully', id: response.id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing survey submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve responses
export async function GET() {
  const responses = getAllSurveyResponses();
  return NextResponse.json(responses);
}
