import { supabase } from './supabaseClient';

export interface SurveyResponse {
  id: string;
  name: string;
  answers: { [key: string]: string };
  comfortableWith: string[];
  wantToLearn: string[];
  timestamp: string;
}

export async function insertSurveyResponse(response: SurveyResponse) {
  const { error } = await supabase
    .from('survey_responses')
    .insert([
      {
        id: response.id,
        name: response.name,
        answers: JSON.stringify(response.answers),
        comfortable_with: JSON.stringify(response.comfortableWith),
        want_to_learn: JSON.stringify(response.wantToLearn),
        timestamp: response.timestamp,
      },
    ]);
  if (error) throw error;
}

export async function getAllSurveyResponses(): Promise<SurveyResponse[]> {
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')
    .order('timestamp', { ascending: false });
  if (error) throw error;
  return (
    data?.map((row: {
      id: string;
      name: string;
      answers: string;
      comfortable_with?: string;
      want_to_learn?: string;
      timestamp: string;
    }) => ({
      id: row.id,
      name: row.name,
      answers: JSON.parse(row.answers),
      comfortableWith: JSON.parse(row.comfortable_with || '[]'),
      wantToLearn: JSON.parse(row.want_to_learn || '[]'),
      timestamp: row.timestamp,
    })) || []
  );
}
