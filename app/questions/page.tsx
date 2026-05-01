'use client';

import { useState, useEffect } from 'react';
import { questions } from '@/data/questions';
import { Category, Difficulty } from '@/types';
import QuestionCard from '@/components/QuestionCard';

const allCategories: Category[] = ['算法', '系统设计', '行为面试', '数据库', '网络', '操作系统'];
const allDifficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];
const difficultyLabels: Record<Difficulty, string> = { Easy: '简单', Medium: '中等', Hard: '困难' };

export default function QuestionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Read category from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') as Category | null;
    if (cat && allCategories.includes(cat)) {
      setSelectedCategory(cat);
    }
  }, []);

  const filtered = questions.filter((q) => {
    const catMatch = selectedCategory === 'all' || q.category === selectedCategory;
    const diffMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const searchMatch =
      searchQuery === '' ||
      q.title.includes(searchQuery) ||
      q.description.includes(searchQuery) ||
      q.tags.some((t) => t.includes(searchQuery));
    return catMatch && diffMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
          面试题库
        </h1>
        <p className="text-gray-400">共 {questions.length} 道题目，覆盖 6 大核心分类</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="搜索题目名称、标签..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          />
        </div>

        {/* Category filter */}
        <div>
          <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">分类</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              全部
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty filter */}
        <div>
          <p className="text-gray-500 text-xs mb-2 uppercase tracking-wide">难度</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedDifficulty === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
              }`}
            >
              全部
            </button>
            {allDifficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {difficultyLabels[diff]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-5 text-gray-400 text-sm">
        找到 <span className="text-white font-semibold">{filtered.length}</span> 道题目
      </div>

      {/* Question Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg">没有找到匹配的题目</p>
          <p className="text-sm mt-2">尝试调整筛选条件或搜索关键词</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((q) => (
            <QuestionCard key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}
