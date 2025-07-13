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
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
          <p className="text-gray-600">Your responses have been submitted successfully. 🌱</p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Attendee Survey</h1>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-blue-800">
          Don&apos;t worry if you don&apos;t know something! You&apos;re here to learn and grow 🌱 — this is just to help us understand your current level ❤️
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`question-${index}`} className="block text-sm font-medium text-gray-700">
              {index + 1}. {question}
            </label>
            <textarea
              id={`question-${index}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Your answer..."
            />
          </div>
        ))}

        {/* Submit button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'}
          </button>
        </div>
      </form>
    </div>
  );
}
