import AdminAuth from '@/components/AdminAuth';
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

function getSurveyResponses() {
  return getAllSurveyResponses();
}

interface SurveyResponse {
  id: string;
  name: string;
  answers: { [key: string]: string } | string[];
  timestamp: string;
  comfortableWith?: string[];
  wantToLearn?: string[];
}

function AdminContent({ responses }: { responses: SurveyResponse[] }) {
  return (
    <div className="admin-bg">
      <div className="admin-container">
        <div className="admin-card">
          <div className="admin-header">
            <h1 className="admin-title">📊 Survey Responses</h1>
            <div className="admin-header-row">
              <p className="admin-total">Total responses: {responses.length}</p>
              {responses.length > 0 && (
                <a
                  href="/api/export-csv"
                  className="admin-download-btn"
                >
                  📥 Download CSV/Excel
                </a>
              )}
            </div>
          </div>

          {responses.length === 0 ? (
            <div className="admin-empty">
              <p className="admin-empty-text">No responses yet.</p>
            </div>
          ) : (
            <div className="admin-responses">
              {responses.map((response: SurveyResponse, index: number) => (
                <div key={response.id} className="admin-response-card">
                  <div className="admin-response-header">
                    <h2 className="admin-response-title">
                      Response #{index + 1}: {response.name}
                    </h2>
                    <p className="admin-response-date">
                      Submitted: {new Date(response.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="admin-response-answers">
                    {questions.map((question, qIndex) => {
                      // Handle both array format and object format
                      let answer = '';
                      if (Array.isArray(response.answers)) {
                        answer = response.answers[qIndex] || '';
                      } else {
                        // Handle object format with keys like "0-1", "0-0", etc.
                        const questionId = `${Math.floor(qIndex / 5)}-${qIndex % 5}`;
                        answer = response.answers?.[questionId] || '';
                      }
                      
                      return (
                        <div key={qIndex} className="admin-question-block">
                          <h3 className="admin-question-title">
                            {qIndex + 1}. {question}
                          </h3>
                          <p className="admin-question-answer">
                            {answer || <span className="admin-question-no-answer">No answer provided</span>}
                          </p>
                        </div>
                      );
                    })}
                    
                    {/* Skills sections */}
                    {(response.comfortableWith && response.comfortableWith.length > 0) && (
                      <div className="admin-skills-comfort">
                        <h3 className="admin-skills-title">
                          Skills Comfortable With:
                        </h3>
                        <p className="admin-skills-list">
                          {response.comfortableWith.join(', ')}
                        </p>
                      </div>
                    )}
                    
                    {(response.wantToLearn && response.wantToLearn.length > 0) && (
                      <div className="admin-skills-learn">
                        <h3 className="admin-skills-title">
                          Skills Want to Learn:
                        </h3>
                        <p className="admin-skills-list">
                          {response.wantToLearn.join(', ')}
                        </p>
                      </div>
                    )}
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

export default async function AdminPage() {
  const responses = await getSurveyResponses();

  return (
    <AdminAuth>
      <AdminContent responses={responses} />
    </AdminAuth>
  );
}
