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
          comfortableWith,
          wantToLearn,
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
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 text-center border border-pink-200">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Thank You, Beautiful! ✨
          </h2>
          <p className="text-gray-600 text-lg">
            Your skill check-in has been submitted successfully! 🌸💜
          </p>
        </div>
        <button
          onClick={resetForm}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-lg"
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  const renderWelcomePage = () => (
    <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-pink-200">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Technical Team Skill Recharge 💜
        </h1>
        <p className="text-xl text-gray-700 mb-6">& Check-in ✨</p>
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-400 p-6 rounded-r-2xl">
          <p className="text-pink-800 text-lg leading-relaxed">
            Hey gorgeous! 🌸 Don&apos;t worry if you don&apos;t know something! You&apos;re here to learn and grow 🌱 
            — this is just to help us understand your current level and what excites you to learn! ❤️✨
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-3">
            What&apos;s your beautiful name? 💕
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-6 py-4 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/70 text-lg"
            placeholder="Enter your name here..."
          />
        </div>

        <div className="pt-6">
          <button
            onClick={() => setCurrentStep(1)}
            disabled={!name.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-2xl hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium text-lg shadow-lg"
          >
            Let&apos;s Start! 🚀
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuestionPage = (sectionIndex: number) => {
    const section = skillAreas[sectionIndex];
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-pink-200">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {section.title} 💜
            </h2>
            <span className="text-pink-500 font-medium">
              {sectionIndex + 1} of {skillAreas.length}
            </span>
          </div>
          <div className="w-full bg-pink-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((sectionIndex + 1) / skillAreas.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {section.questions.map((question, qIndex) => {
            const questionId = `${sectionIndex}-${qIndex}`;
            return (
              <div key={qIndex} className="space-y-3">
                <label htmlFor={questionId} className="block text-lg font-medium text-gray-700">
                  {qIndex + 1}. {question}
                </label>
                <textarea
                  id={questionId}
                  value={answers[questionId] || ''}
                  onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/70 resize-vertical"
                  placeholder="Share your thoughts... ✨"
                />
              </div>
            );
          })}
        </div>

        <div className="flex justify-between pt-8">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="bg-white text-pink-600 px-6 py-3 rounded-2xl hover:bg-pink-50 transition-all duration-300 font-medium border-2 border-pink-200"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-2xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg"
          >
            Next →
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
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-pink-200">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            What&apos;s Your Comfort Zone? 💕
          </h2>
          <p className="text-gray-600 text-lg">
            Let us know what you&apos;re comfortable with and what you&apos;d love to learn! ✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">
              I&apos;m Comfortable With: 🌟
            </h3>
            <div className="space-y-3">
              {allSkills.map((skill) => (
                <label key={skill} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={comfortableWith.includes(skill)}
                    onChange={() => handleComfortableToggle(skill)}
                    className="w-5 h-5 text-pink-500 border-pink-300 rounded focus:ring-pink-400"
                  />
                  <span className="text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-600 mb-4">
              I Want to Learn: 🌱
            </h3>
            <div className="space-y-3">
              {allSkills.map((skill) => (
                <label key={skill} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantToLearn.includes(skill)}
                    onChange={() => handleLearnToggle(skill)}
                    className="w-5 h-5 text-purple-500 border-purple-300 rounded focus:ring-purple-400"
                  />
                  <span className="text-gray-700">{skill}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="bg-white text-pink-600 px-6 py-3 rounded-2xl hover:bg-pink-50 transition-all duration-300 font-medium border-2 border-pink-200"
          >
            ← Previous
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-2xl hover:from-pink-600 hover:to-purple-600 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium text-lg shadow-lg"
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
