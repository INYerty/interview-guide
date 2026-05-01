'use client';

import { useState, useEffect, useCallback } from 'react';
import { questions as allQuestions } from '@/data/questions';
import { evaluateAnswer } from '@/services/aiService';
import { Category, Question, AIFeedback } from '@/types';

const allCategories: Category[] = ['算法', '系统设计', '行为面试', '数据库', '网络', '操作系统'];

type Phase = 'setup' | 'interviewing' | 'completed';

interface AnswerRecord {
  question: Question;
  content: string;
  score: number;
  feedback: AIFeedback;
  timeSpent: number;
}

export default function InterviewPage() {
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'random'>('random');
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [submittedFeedback, setSubmittedFeedback] = useState<AIFeedback | null>(null);
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);

  const currentQuestion = sessionQuestions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (phase !== 'interviewing' || submittedFeedback !== null) return;
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [phase, timeLeft, submittedFeedback]);

  const startInterview = () => {
    const pool =
      selectedCategory === 'random'
        ? allQuestions
        : allQuestions.filter((q) => q.category === selectedCategory);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
    setSessionQuestions(shuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setCurrentAnswer('');
    setSubmittedFeedback(null);
    setSubmittedScore(null);
    setTimeLeft(shuffled[0]?.timeLimit ?? 300);
    setStartTime(Date.now());
    setPhase('interviewing');
  };

  const submitAnswer = useCallback(() => {
    if (!currentQuestion) return;
    const timeSpent = currentQuestion.timeLimit - timeLeft;
    const feedback = evaluateAnswer(currentQuestion, currentAnswer);
    setSubmittedFeedback(feedback);
    setSubmittedScore(feedback.score);
    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion,
        content: currentAnswer,
        score: feedback.score,
        feedback,
        timeSpent,
      },
    ]);
  }, [currentQuestion, currentAnswer, timeLeft]);

  const nextQuestion = () => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= sessionQuestions.length) {
      setPhase('completed');
    } else {
      setCurrentIndex(nextIdx);
      setCurrentAnswer('');
      setSubmittedFeedback(null);
      setSubmittedScore(null);
      setTimeLeft(sessionQuestions[nextIdx].timeLimit);
      setStartTime(Date.now());
    }
  };

  const restart = () => {
    setPhase('setup');
    setAnswers([]);
    setCurrentAnswer('');
    setSubmittedFeedback(null);
    setSubmittedScore(null);
  };

  const totalScore =
    answers.length > 0 ? Math.round(answers.reduce((s, a) => s + a.score, 0) / answers.length) : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(Math.abs(s) / 60);
    const sec = Math.abs(s) % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  // ─── SETUP ───────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">模拟面试</h1>
          <p className="text-gray-400">系统将随机抽取 5 道题目，模拟真实面试环境</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6">
          <div>
            <h2 className="text-white font-semibold mb-4">选择题目方向</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedCategory('random')}
                className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                  selectedCategory === 'random'
                    ? 'border-blue-500 bg-blue-500/20 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                🎲 随机混合
              </button>
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'border-blue-500 bg-blue-500/20 text-white'
                      : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 text-sm text-gray-400 space-y-1.5">
            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> 共 5 道题目，每题独立计时</p>
            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> 提交后获得 AI 智能评分和反馈</p>
            <p className="flex items-center gap-2"><span className="text-green-400">✓</span> 完成后查看整体报告</p>
          </div>

          <button
            onClick={startInterview}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] text-lg shadow-lg shadow-blue-500/25"
          >
            🚀 开始面试
          </button>
        </div>
      </div>
    );
  }

  // ─── INTERVIEWING ─────────────────────────────────────────
  if (phase === 'interviewing' && currentQuestion) {
    const progress = ((currentIndex) / sessionQuestions.length) * 100;
    const timePercent = (timeLeft / currentQuestion.timeLimit) * 100;
    const timeCritical = timeLeft < 60 && submittedFeedback === null;

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>问题 {currentIndex + 1} / {sessionQuestions.length}</span>
            <span className={timeCritical ? 'text-red-400 font-semibold animate-pulse' : 'text-gray-400'}>
              ⏱ {formatTime(timeLeft)}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Timer bar */}
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full transition-all duration-1000 ${
                timeCritical ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.max(0, timePercent)}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full">
              {currentQuestion.category}
            </span>
            <span className={`text-xs px-2.5 py-1 rounded-full ${
              currentQuestion.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
              currentQuestion.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
              'bg-red-500/20 text-red-300 border border-red-500/30'
            }`}>
              {currentQuestion.difficulty === 'Easy' ? '简单' : currentQuestion.difficulty === 'Medium' ? '中等' : '困难'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">{currentQuestion.title}</h2>
          <pre className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
            {currentQuestion.description}
          </pre>
        </div>

        {/* Answer area */}
        {submittedFeedback === null ? (
          <div className="space-y-4">
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="在这里输入您的回答..."
              rows={10}
              className="w-full bg-gray-900 border border-gray-800 focus:border-blue-500 rounded-xl p-4 text-white placeholder-gray-600 resize-none focus:outline-none transition-colors text-sm leading-relaxed"
            />
            <button
              onClick={submitAnswer}
              disabled={currentAnswer.trim().length === 0}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300"
            >
              ✅ 提交回答
            </button>
          </div>
        ) : (
          /* Feedback */
          <div className="space-y-4">
            {/* Score */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">AI 评估结果</h3>
                <div className={`text-3xl font-bold ${
                  submittedScore! >= 80 ? 'text-green-400' :
                  submittedScore! >= 60 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {submittedScore} 分
                </div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    submittedScore! >= 80 ? 'bg-green-500' :
                    submittedScore! >= 60 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${submittedScore}%` }}
                />
              </div>
              <p className="text-gray-300 text-sm">{submittedFeedback.summary}</p>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <h4 className="text-green-400 font-semibold text-sm mb-3">✅ 优点</h4>
                <ul className="space-y-2">
                  {submittedFeedback.strengths.map((s, i) => (
                    <li key={i} className="text-gray-300 text-sm flex gap-2">
                      <span className="text-green-400 mt-0.5">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                <h4 className="text-amber-400 font-semibold text-sm mb-3">💡 改进建议</h4>
                <ul className="space-y-2">
                  {submittedFeedback.improvements.map((s, i) => (
                    <li key={i} className="text-gray-300 text-sm flex gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-2">建议延伸学习</p>
              <div className="flex flex-wrap gap-2">
                {submittedFeedback.relatedTopics.map((t) => (
                  <span key={t} className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={nextQuestion}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300"
            >
              {currentIndex + 1 >= sessionQuestions.length ? '🎉 查看最终报告' : '下一题 →'}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── COMPLETED ────────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-2">面试完成！</h1>
        <p className="text-gray-400">以下是本次面试的详细报告</p>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-8 text-center mb-8">
        <p className="text-gray-400 mb-2">综合得分</p>
        <div className={`text-7xl font-extrabold mb-2 ${
          totalScore >= 80 ? 'text-green-400' :
          totalScore >= 60 ? 'text-amber-400' : 'text-red-400'
        }`}>
          {totalScore}
        </div>
        <p className="text-gray-400 text-sm">满分 100 分</p>
        <div className="mt-4">
          <span className={`text-sm px-4 py-1.5 rounded-full ${
            totalScore >= 80 ? 'bg-green-500/20 text-green-300' :
            totalScore >= 60 ? 'bg-amber-500/20 text-amber-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {totalScore >= 80 ? '🌟 优秀，继续保持！' : totalScore >= 60 ? '👍 良好，仍有提升空间' : '📚 需要加强练习'}
          </span>
        </div>
      </div>

      {/* Per-question summary */}
      <div className="space-y-4 mb-8">
        {answers.map((ans, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-medium text-sm">
                {i + 1}. {ans.question.title}
              </h3>
              <span className={`text-xl font-bold ${
                ans.score >= 80 ? 'text-green-400' :
                ans.score >= 60 ? 'text-amber-400' : 'text-red-400'
              }`}>
                {ans.score}
              </span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  ans.score >= 80 ? 'bg-green-500' :
                  ans.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${ans.score}%` }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-2">{ans.feedback.summary}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={restart}
          className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02]"
        >
          🔄 重新开始
        </button>
        <a
          href="/questions"
          className="flex-1 py-3.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold rounded-xl transition-all text-center"
        >
          📚 前往题库练习
        </a>
      </div>
    </div>
  );
}
