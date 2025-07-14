-- Create the survey_responses table in Supabase
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS survey_responses (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  answers TEXT NOT NULL,
  comfortable_with TEXT DEFAULT '[]',
  want_to_learn TEXT DEFAULT '[]',
  timestamp TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (optional, for production security)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all operations (you can make this more restrictive later)
CREATE POLICY "Allow all operations on survey_responses" ON survey_responses
  FOR ALL USING (true) WITH CHECK (true);

-- Add an index for better query performance
CREATE INDEX IF NOT EXISTS idx_survey_responses_timestamp ON survey_responses(timestamp);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);
