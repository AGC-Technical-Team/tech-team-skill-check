import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'survey.db');
const db = new Database(dbPath);

// Create the table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS survey_responses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    answers TEXT NOT NULL,
    comfortable_with TEXT,
    want_to_learn TEXT,
    timestamp TEXT NOT NULL
  )
`);

export interface SurveyResponse {
  id: string;
  name: string;
  answers: { [key: string]: string };
  comfortableWith: string[];
  wantToLearn: string[];
  timestamp: string;
}

interface DatabaseRow {
  id: string;
  name: string;
  answers: string;
  comfortable_with: string;
  want_to_learn: string;
  timestamp: string;
}

export function insertSurveyResponse(response: SurveyResponse) {
  const stmt = db.prepare(`
    INSERT INTO survey_responses (id, name, answers, comfortable_with, want_to_learn, timestamp)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(
    response.id,
    response.name,
    JSON.stringify(response.answers),
    JSON.stringify(response.comfortableWith),
    JSON.stringify(response.wantToLearn),
    response.timestamp
  );
}

export function getAllSurveyResponses(): SurveyResponse[] {
  const stmt = db.prepare('SELECT * FROM survey_responses ORDER BY timestamp DESC');
const rows = stmt.all() as DatabaseRow[];
  
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    answers: JSON.parse(row.answers),
    comfortableWith: JSON.parse(row.comfortable_with || '[]'),
    wantToLearn: JSON.parse(row.want_to_learn || '[]'),
    timestamp: row.timestamp
  }));
}

export default db;
