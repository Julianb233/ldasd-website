"use client";

import { useState } from "react";
import Link from "next/link";

interface QuizAnswer {
  questionIndex: number;
  answerIndex: number;
}

const questions = [
  {
    question: "Do you own real estate or property?",
    subtitle: "This includes your primary home, rental properties, or land.",
    answers: [
      { text: "No, I don't own any property", points: { will: 2, trust: 0, estate: 0 } },
      { text: "Yes, I own one property (my home)", points: { will: 1, trust: 2, estate: 2 } },
      { text: "Yes, I own multiple properties", points: { will: 0, trust: 2, estate: 3 } },
    ],
  },
  {
    question: "Are you married or in a domestic partnership?",
    subtitle: "Your relationship status affects which documents you need.",
    answers: [
      { text: "Single, no dependents", points: { will: 2, trust: 0, estate: 0 } },
      { text: "Single with children or dependents", points: { will: 1, trust: 2, estate: 2 } },
      { text: "Married or in a domestic partnership", points: { will: 0, trust: 2, estate: 3 } },
    ],
  },
  {
    question: "What is the approximate value of your total assets?",
    subtitle: "Include savings, investments, retirement accounts, and property equity.",
    answers: [
      { text: "Under $100,000", points: { will: 3, trust: 0, estate: 0 } },
      { text: "$100,000 - $500,000", points: { will: 1, trust: 2, estate: 1 } },
      { text: "Over $500,000", points: { will: 0, trust: 2, estate: 3 } },
    ],
  },
  {
    question: "Do you have minor children?",
    subtitle: "Naming a guardian is one of the most important decisions you can make.",
    answers: [
      { text: "No", points: { will: 1, trust: 1, estate: 0 } },
      { text: "Yes, and I want to name a guardian", points: { will: 2, trust: 1, estate: 2 } },
      { text: "Yes, and I want to set up financial protections for them", points: { will: 0, trust: 2, estate: 3 } },
    ],
  },
  {
    question: "How important is avoiding probate to you?",
    subtitle: "Probate is a public court process that can take 6-18 months and cost 3-7% of your estate.",
    answers: [
      { text: "I'm not concerned about probate", points: { will: 3, trust: 0, estate: 0 } },
      { text: "I'd like to avoid it if possible", points: { will: 0, trust: 3, estate: 2 } },
      { text: "Avoiding probate is very important to me", points: { will: 0, trust: 2, estate: 3 } },
    ],
  },
  {
    question: "Do you want to plan for potential incapacity?",
    subtitle: "This includes healthcare decisions and financial management if you become unable to make decisions.",
    answers: [
      { text: "Not right now, I just need a basic plan", points: { will: 2, trust: 0, estate: 0 } },
      { text: "Yes, I want someone to manage my finances if needed", points: { will: 0, trust: 2, estate: 1 } },
      { text: "Yes, I want both healthcare and financial protections", points: { will: 0, trust: 1, estate: 3 } },
    ],
  },
];

const recommendations = {
  will: {
    id: "will",
    name: "Will",
    price: 199,
    tagline: "Simple protection for your wishes",
    description:
      "A Will is the foundation of any estate plan. It lets you name guardians for minor children, specify how your assets should be distributed, and appoint an executor to carry out your wishes.",
    features: [
      "Last Will & Testament",
      "Guardianship designation",
      "Asset distribution instructions",
      "Executor appointment",
      "Digital asset management",
      "Attorney review included",
      "1 year free updates",
    ],
    bestFor: "Individuals with straightforward estates, few assets, and no real estate.",
    href: "/book?product=will",
  },
  trust: {
    id: "trust",
    name: "Living Trust",
    price: 599,
    tagline: "Avoid probate and protect your privacy",
    description:
      "A Living Trust keeps your estate out of probate court, saving your family time, money, and stress. Your assets transfer privately and immediately, without the 6-18 month public court process.",
    features: [
      "Revocable Living Trust",
      "Pour-over Will",
      "Avoid probate completely",
      "Privacy protection",
      "Incapacity planning",
      "Trust funding guidance",
      "3 years free updates",
      "Priority email support",
    ],
    bestFor: "Homeowners, those with $100K+ in assets, or anyone wanting to avoid probate.",
    href: "/book?product=trust",
  },
  estate: {
    id: "estate-plan",
    name: "Complete Estate Plan",
    price: 699,
    tagline: "Comprehensive protection for you and your family",
    description:
      "The Complete Estate Plan covers every aspect of your legacy and protection. From healthcare decisions to financial powers of attorney, everything is handled so your family is never left guessing.",
    features: [
      "Everything in Living Trust, plus:",
      "Durable Power of Attorney",
      "Healthcare Power of Attorney",
      "Living Will / Healthcare Directive",
      "HIPAA Authorization",
      "Digital asset management",
      "Lifetime free updates",
      "Priority phone support",
    ],
    bestFor: "Married couples, parents, those with complex assets, or anyone wanting full coverage.",
    href: "/book?product=estate-plan",
  },
};

type RecommendationKey = keyof typeof recommendations;

export default function FindYourPlanPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers.filter((a) => a.questionIndex !== currentStep)];
    newAnswers.push({ questionIndex: currentStep, answerIndex });
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const getRecommendation = (): RecommendationKey => {
    const scores = { will: 0, trust: 0, estate: 0 };
    answers.forEach((answer) => {
      const question = questions[answer.questionIndex];
      const selected = question.answers[answer.answerIndex];
      scores.will += selected.points.will;
      scores.trust += selected.points.trust;
      scores.estate += selected.points.estate;
    });

    if (scores.estate >= scores.trust && scores.estate >= scores.will) return "estate";
    if (scores.trust >= scores.will) return "trust";
    return "will";
  };

  const getSelectedAnswer = (questionIndex: number) => {
    return answers.find((a) => a.questionIndex === questionIndex)?.answerIndex ?? -1;
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const progress = showResult ? 100 : ((currentStep) / questions.length) * 100;

  const result = showResult ? recommendations[getRecommendation()] : null;

  return (
    <div className="bg-sand min-h-screen">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-tan to-sky overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
            Personalized Recommendation
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
            Find Your Plan
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Answer {questions.length} quick questions and we&apos;ll recommend the estate plan
            that&apos;s right for your situation. Takes less than 2 minutes.
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-sm border-b border-foreground/5">
        <div className="mx-auto max-w-3xl px-6">
          <div className="py-3 flex items-center gap-4">
            <span className="text-sm font-medium text-foreground/60 whitespace-nowrap">
              {showResult ? "Complete!" : `Question ${currentStep + 1} of ${questions.length}`}
            </span>
            <div className="flex-1 h-2 bg-foreground/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {!showResult ? (
            <div key={currentStep} className="animate-fadeIn">
              {/* Question */}
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {questions[currentStep].question}
                </h2>
                <p className="text-foreground/70 text-lg">
                  {questions[currentStep].subtitle}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {questions[currentStep].answers.map((answer, index) => {
                  const isSelected = getSelectedAnswer(currentStep) === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      className={`w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-secondary bg-secondary/5 shadow-premium"
                          : "border-foreground/10 bg-white/80 hover:border-secondary/50 hover:shadow-premium-hover hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isSelected
                              ? "border-secondary bg-secondary"
                              : "border-foreground/20"
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-lg font-medium ${isSelected ? "text-foreground" : "text-foreground/80"}`}>
                          {answer.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="mt-10 flex justify-between items-center">
                <button
                  onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                  className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                    currentStep > 0
                      ? "text-foreground/60 hover:text-foreground"
                      : "text-transparent pointer-events-none"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  Previous
                </button>

                {/* Step indicators */}
                <div className="flex gap-1.5">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => index <= Math.max(...answers.map(a => a.questionIndex), 0) && setCurrentStep(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "bg-secondary w-6"
                          : getSelectedAnswer(index) >= 0
                          ? "bg-secondary/40"
                          : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>

                <div className="w-20" />
              </div>
            </div>
          ) : result ? (
            /* Results */
            <div className="animate-fadeIn">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  We Recommend the {result.name}
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Based on your answers, the <strong>{result.name}</strong> is the best fit for your situation.
                </p>
              </div>

              {/* Recommendation Card */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-premium ring-2 ring-secondary/20 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                  <div>
                    <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                      Best Match
                    </span>
                    <h3 className="text-2xl font-bold text-foreground">{result.name}</h3>
                    <p className="text-foreground/70">{result.tagline}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 text-left sm:text-right">
                    <span className="text-4xl font-bold text-secondary">${result.price}</span>
                    <p className="text-sm text-foreground/50">one-time payment</p>
                  </div>
                </div>

                <p className="text-foreground/80 mb-6">{result.description}</p>

                <div className="bg-sand/50 rounded-2xl p-6 mb-6">
                  <h4 className="font-semibold text-foreground mb-3">What&apos;s Included</h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {result.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-sm text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 mb-8">
                  <p className="text-sm text-foreground/70">
                    <strong className="text-foreground">Best for:</strong> {result.bestFor}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={result.href}
                    className="flex-1 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white text-center hover:bg-secondary/90 shadow-premium hover:shadow-premium-hover transition-all duration-300"
                  >
                    Get Started with {result.name} — ${result.price}
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="rounded-full border-2 border-foreground/10 px-6 py-4 text-sm font-semibold text-foreground/60 hover:border-foreground/20 hover:text-foreground transition-all duration-300"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>

              {/* Compare All Plans */}
              <div className="text-center mt-8">
                <p className="text-foreground/60 mb-3">Want to explore all options?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/pricing"
                    className="text-secondary font-semibold hover:underline"
                  >
                    Compare All Plans
                  </Link>
                  <span className="hidden sm:inline text-foreground/20">|</span>
                  <Link
                    href="/products/attorney-consultation"
                    className="text-secondary font-semibold hover:underline"
                  >
                    Add Attorney Consultation (+$299)
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Trust Indicators */}
      {!showResult && (
        <section className="py-12 border-t border-foreground/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">2 Minutes</p>
                <p className="text-sm text-foreground/60 mt-1">Average completion time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">50,000+</p>
                <p className="text-sm text-foreground/60 mt-1">Families protected</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-foreground/60 mt-1">Attorney reviewed</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
