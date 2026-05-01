'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { getQuestionById, questions } from '@/data/questions';
import CategoryBadge from '@/components/CategoryBadge';
import DifficultyBadge from '@/components/DifficultyBadge';

export default function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const question = getQuestionById(id);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [answerOpen, setAnswerOpen] = useState(false);

  if (!question) {
    notFound();
  }

  const relatedQuestions = question.relatedQuestions
    .map((rid) => questions.find((q) => q.id === rid))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link
        href="/questions"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回题库
      </Link>

      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CategoryBadge category={question.category} />
          <DifficultyBadge difficulty={question.difficulty} />
          <span className="text-xs text-gray-500 ml-auto">
            ⏱ 建议 {Math.floor(question.timeLimit / 60)} 分钟
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{question.title}</h1>
        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-md border border-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
          题目描述
        </h2>
        <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {question.description}
        </pre>
      </div>

      {/* Hints (collapsible) */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl mb-6 overflow-hidden">
        <button
          onClick={() => setHintsOpen((v) => !v)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-800/50 transition-colors"
        >
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-amber-500 rounded-full" />
            💡 解题提示
          </h2>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${hintsOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {hintsOpen && (
          <div className="px-6 pb-6 space-y-3">
            {question.hints.map((hint, i) => (
              <div key={i} className="flex gap-3">
                <span className="w-6 h-6 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">{hint}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sample Answer (collapsible) */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl mb-6 overflow-hidden">
        <button
          onClick={() => setAnswerOpen((v) => !v)}
          className="w-full flex items-center justify-between p-6 hover:bg-gray-800/50 transition-colors"
        >
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <span className="w-1.5 h-5 bg-green-500 rounded-full" />
            ✅ 参考答案
          </h2>
          <div className="flex items-center gap-2">
            {!answerOpen && (
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                建议先自行作答
              </span>
            )}
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${answerOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        {answerOpen && (
          <div className="px-6 pb-6">
            <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-gray-800/50 rounded-xl p-4">
              {question.sampleAnswer}
            </pre>
          </div>
        )}
      </div>

      {/* Related Questions */}
      {relatedQuestions.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-purple-500 rounded-full" />
            相关题目
          </h2>
          <div className="space-y-3">
            {relatedQuestions.map((rq) => rq && (
              <Link
                key={rq.id}
                href={`/questions/${rq.id}`}
                className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors group"
              >
                <div className="flex-1">
                  <p className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors">
                    {rq.title}
                  </p>
                  <div className="flex gap-2 mt-1">
                    <CategoryBadge category={rq.category} />
                    <DifficultyBadge difficulty={rq.difficulty} />
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Practice CTA */}
      <div className="text-center">
        <Link
          href="/interview"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105"
        >
          🎯 开始练习（模拟面试）
        </Link>
      </div>
    </div>
  );
}
