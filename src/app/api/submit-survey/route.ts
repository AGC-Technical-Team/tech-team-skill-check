import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, answers, timestamp } = body;

    // Validate required fields
    if (!name || !answers || !Array.isArray(answers)) {
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
      timestamp,
    };

    // Define the path for the JSON file
    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'survey-responses.json');

    // Ensure the data directory exists
    try {
      await fs.access(dataDir);
    } catch {
      await fs.mkdir(dataDir, { recursive: true });
    }

    // Read existing data or create an empty array
    let existingData = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch {
      // File doesn't exist or is empty, start with empty array
      existingData = [];
    }

    // Add new response
    existingData.push(response);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

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
