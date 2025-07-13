'use client';

import { useState } from 'react';

const skillAreas = [
  {
    title: "Communication & Presentation",
    questions: [
      "Are you comfortable with public speaking or being on stage?",
      "Are you comfortable preparing session material?",
      "How good are you at writing?",
      "How good are you at delivering information clearly to attendees?",
      "Have you heard the term \"analogy\" before? Are you comfortable using analogies to explain concepts?"
    ]
  },
  {
    title: "Technical Background",
    questions: [
      "What is your tech background?",
      "Are you familiar with Docker? If yes, how familiar? Have you tried it?",
      "How comfortable are you with machine learning?",
      "Have you heard of transfer learning before?",
      "Do you know Python?"
    ]
  },
  {
    title: "Modern Tech & AI",
    questions: [
      "Have you heard of prompt engineering?",
      "What's your go-to prompt when you talk to ChatGPT?",
      "Do you know DevOps?",
      "Do you know what SDLC is? If yes, explain in one sentence.",
      "Bonus: Feel free to type in Arabic if you want!"
    ]
  }
];


export default function SkillCheckForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [comfortableWith, setComfortableWith] = useState<string[]>([]);
  const [wantToLearn, setWantToLearn] = useState<string[]>([]);
  const [comfortableOthers, setComfortableOthers] = useState('');
  const [wantToLearnOthers, setWantToLearnOthers] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleComfortableToggle = (skill: string) => {
    setComfortableWith(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleLearnToggle = (skill: string) => {
    setWantToLearn(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          answers,
          comfortableWith: comfortableOthers.trim() ? [...comfortableWith, comfortableOthers] : comfortableWith,
          wantToLearn: wantToLearnOthers.trim() ? [...wantToLearn, wantToLearnOthers] : wantToLearn,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setName('');
    setAnswers({});
    setComfortableWith([]);
    setWantToLearn([]);
    setComfortableOthers('');
    setWantToLearnOthers('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="scf-success">
        <div className="scf-success-icon-wrap">
          <div className="scf-success-icon">
            <svg className="scf-success-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="scf-success-title">
            Thank You, Beautiful! ✨
          </h2>
          <p className="scf-success-desc">
            Your skill check-in has been submitted successfully! 🌸💜
          </p>
        </div>
        <button
          onClick={resetForm}
          className="scf-success-btn"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  const renderWelcomePage = () => (
    <div className="scf-welcome">
      <div className="scf-welcome-header">
        <h1 className="scf-welcome-title">
          Technical Team Skill Recharge 💜
        </h1>
        <div className="scf-welcome-badge">
          <p className="scf-welcome-badge-text">
            ✨ Check-in ✨
          </p>
        </div>
        <div className="scf-welcome-desc-wrap">
          <p className="scf-welcome-desc">
            Hey girls! 🌸 Don&apos;t worry if you don&apos;t know something! You&apos;re here to learn and grow 🌱 
            — this is just to help us understand your current level and what excites you to learn! ❤️✨
          </p>
        </div>
      </div>

      <div className="scf-welcome-form">
        <div>
          <label htmlFor="name" className="scf-label-lg">
            What&apos;s your beautiful name? 💕
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="scf-input-lg"
            placeholder="Enter your name here..."
          />
        </div>

        <div className="scf-welcome-btn-wrap">
          <button
            onClick={() => setCurrentStep(1)}
            disabled={!name.trim()}
            className="scf-welcome-btn"
          >
            Let&apos;s Start! 🚀
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestionPage = (sectionIndex: number) => {
    const section = skillAreas[sectionIndex];
    
    // Check if all questions in this section are answered
    const allAnswered = section.questions.every((_, qIndex) => {
      const questionId = `${sectionIndex}-${qIndex}`;
      return answers[questionId] && answers[questionId].trim() !== '';
    });
    
    const handleNext = () => {
      if (!allAnswered) {
        alert('Please answer all questions before proceeding! 💕');
        return;
      }
      setCurrentStep(currentStep + 1);
    };

    return (
      <div className="scf-question-page">
        <div className="scf-question-header">
          <div className="scf-question-title-wrap">
            <h2 className="scf-question-title">
              {section.title} 💜
            </h2>
            <span className="scf-question-step">
              {sectionIndex + 1} of {skillAreas.length}
            </span>
          </div>
          <div className="scf-question-progress-bar">
            <div 
              className="scf-question-progress-fill"
              style={{ width: `${((sectionIndex + 1) / skillAreas.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="scf-question-content">
          {section.questions.map((question, qIndex) => {
            const questionId = `${sectionIndex}-${qIndex}`;
            const isAnswered = answers[questionId] && answers[questionId].trim() !== '';
            
            return (
              <div key={qIndex} className="scf-question-item">
                <label htmlFor={questionId} className="scf-question-label">
                  {qIndex + 1}. {question} <span className="scf-question-required">*</span>
                </label>
                <textarea
                  id={questionId}
                  value={answers[questionId] || ''}
                  onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                  rows={3}
                  className={`scf-question-textarea ${
                    isAnswered 
                      ? 'scf-question-textarea-answered' 
                      : 'scf-question-textarea-unanswered'
                  }`}
                  placeholder="Share your thoughts... ✨"
                  required
                />
                {isAnswered && (
                  <span className="scf-question-answered-badge">
                    <svg className="scf-question-answered-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Answered!
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="scf-question-footer">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="scf-question-prev-btn"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!allAnswered}
            className={`scf-question-next-btn ${
              allAnswered
                ? 'scf-question-next-btn-enabled'
                : 'scf-question-next-btn-disabled'
            }`}
          >
            {allAnswered ? 'Next →' : `Please answer all questions (${section.questions.length - section.questions.filter((_, qIndex) => {
              const questionId = `${sectionIndex}-${qIndex}`;
              return answers[questionId] && answers[questionId].trim() !== '';
            }).length} remaining)`}
          </button>
        </div>
      </div>
    );
  };

  const renderComfortLevelPage = () => {
    const allSkills = [
      "Public Speaking", "Content Creation", "Writing", "Teaching", "Docker", 
      "Machine Learning", "Python", "AI/Prompt Engineering", "DevOps", "SDLC"
    ];

    return (
      <div className="scf-comfort-level-page">
        <div className="scf-comfort-level-header">
          <h2 className="scf-comfort-level-title">
            What&apos;s Your Comfort Zone? 💕
          </h2>
          <p className="scf-comfort-level-desc">
            Let us know what you&apos;re comfortable with and what you&apos;d love to learn! ✨
          </p>
        </div>

        <div className="scf-comfort-level-grid">
          <div className="scf-comfort-level-section">
            <h3 className="scf-comfort-level-section-title">
              I&apos;m Comfortable With: 🌟
            </h3>
            <div className="scf-comfort-level-skills">
              {allSkills.map((skill) => (
                <label key={skill} className="scf-comfort-level-skill-item">
                  <input
                    type="checkbox"
                    checked={comfortableWith.includes(skill)}
                    onChange={() => handleComfortableToggle(skill)}
                    className="scf-comfort-level-checkbox"
                  />
                  <span className="scf-comfort-level-skill-text">
                    {skill}
                  </span>
                </label>
              ))}
              <div className="scf-comfort-level-others-input">
                <label className="scf-comfort-level-others-label">
                  Others (please specify):
                </label>
                <input
                  type="text"
                  value={comfortableOthers}
                  onChange={(e) => setComfortableOthers(e.target.value)}
                  className="scf-comfort-level-others-input-field"
                  placeholder="e.g., Graphic Design, Data Analysis..."
                />
              </div>
            </div>
          </div>

          <div className="scf-comfort-level-section">
            <h3 className="scf-comfort-level-section-title">
              I Want to Learn: 🌱
            </h3>
            <div className="scf-comfort-level-skills">
              {allSkills.map((skill) => (
                <label key={skill} className="scf-comfort-level-skill-item">
                  <input
                    type="checkbox"
                    checked={wantToLearn.includes(skill)}
                    onChange={() => handleLearnToggle(skill)}
                    className="scf-comfort-level-checkbox"
                  />
                  <span className="scf-comfort-level-skill-text">
                    {skill}
                  </span>
                </label>
              ))}
              <div className="scf-comfort-level-others-input">
                <label className="scf-comfort-level-others-label">
                  Others (please specify):
                </label>
                <input
                  type="text"
                  value={wantToLearnOthers}
                  onChange={(e) => setWantToLearnOthers(e.target.value)}
                  className="scf-comfort-level-others-input-field"
                  placeholder="e.g., UI/UX Design, Cloud Computing..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="scf-comfort-level-footer">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="scf-comfort-level-prev-btn"
          >
            ← Previous
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="scf-comfort-level-submit-btn"
          >
            {isSubmitting ? 'Submitting... ✨' : 'Submit My Check-in! 🚀'}
          </button>
        </div>
      </div>
    );
  };

  // Main render logic
  if (currentStep === 0) {
    return renderWelcomePage();
  } else if (currentStep <= skillAreas.length) {
    return renderQuestionPage(currentStep - 1);
  } else {
    return renderComfortLevelPage();
  }
}
