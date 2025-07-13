'use client';

import { useState } from 'react';

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

export default function SurveyForm() {
  const [name, setName] = useState('');
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName('');
        setAnswers(new Array(questions.length).fill(''));
      } else {
        alert('Error submitting survey. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Error submitting survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="sf-success">
        <div className="sf-success-icon-wrap">
          <div className="sf-success-icon">
            <svg className="sf-success-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="sf-success-title">Thank you!</h2>
          <p className="sf-success-desc">Your responses have been submitted successfully. 🌱</p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="sf-success-btn"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="sf-form">
      <div className="sf-form-header">
        <h1 className="sf-form-title">Attendee Survey</h1>
        <div className="sf-form-desc-wrap">
          <p className="sf-form-desc">
          Don&apos;t worry if you don&apos;t know something! You&apos;re here to learn and grow 🌱 — this is just to help us understand your current level ❤️
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="sf-form-fields">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="sf-label">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="sf-input"
            placeholder="Enter your name"
          />
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <div key={index} className="sf-question-item">
            <label htmlFor={`question-${index}`} className="sf-label">
              {index + 1}. {question}
            </label>
            <textarea
              id={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows={3}
              className="sf-textarea"
              placeholder="Your answer..."
            />
          </div>
        ))}

        {/* Submit button */}
        <div className="sf-form-btn-wrap">
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="sf-form-btn"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </div>
      </form>
    </div>
  );
}
