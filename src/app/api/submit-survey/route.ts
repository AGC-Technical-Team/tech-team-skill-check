import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface SurveyResponse {
  id: string;
  name: string;
  answers: { [key: string]: string };
  comfortableWith: string[];
  wantToLearn: string[];
  timestamp: string;
}

// Helper function to read existing responses
async function readResponses() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'survey-responses.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading survey responses:', error);
    return [];
  }
}

// Helper function to write responses
async function writeResponses(responses: SurveyResponse[]) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'survey-responses.json');
    await fs.writeFile(filePath, JSON.stringify(responses, null, 2));
  } catch (error) {
    console.error('Error writing survey responses:', error);
    throw error;
  }
}

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
    const response = {
      id: Date.now().toString(),
      name,
      answers,
      comfortableWith: body.comfortableWith || [],
      wantToLearn: body.wantToLearn || [],
      timestamp,
    };

    // Read existing responses
    const existingResponses = await readResponses();
    
    // Add new response
    existingResponses.push(response);
    
    // Write back to file
    await writeResponses(existingResponses);

    // Also log to console for debugging
    console.log('New survey response:', response);
    console.log('Total responses:', existingResponses.length);

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
  const responses = await readResponses();
  return NextResponse.json(responses);
}
