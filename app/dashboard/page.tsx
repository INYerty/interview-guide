'use client';

import Link from 'next/link';

const mockSessions = [
  { id: 1, date: '2025-06-10', category: '算法', score: 82, duration: '28 分钟', questions: 5 },
  { id: 2, date: '2025-06-08', category: '系统设计', score: 74, duration: '35 分钟', questions: 5 },
  { id: 3, date: '2025-06-06', category: '数据库', score: 90, duration: '22 分钟', questions: 5 },
  { id: 4, date: '2025-06-04', category: '网络', score: 65, duration: '30 分钟', questions: 5 },
  { id: 5, date: '2025-06-02', category: '行为面试', score: 88, duration: '25 分钟', questions: 5 },
];

const categoryPerformance = [
  { category: '算法', score: 78, color: 'bg-blue-500' },
  { category: '系统设计', score: 72, color: 'bg-purple-500' },
  { category: '行为面试', score: 88, color: 'bg-green-500' },
  { category: '数据库', score: 85, color: 'bg-orange-500' },
  { category: '网络', score: 65, color: 'bg-cyan-500' },
  { category: '操作系统', score: 60, color: 'bg-red-500' },
];

const recommendedQuestions = [
  { id: 'os-3', title: '内存分页机制', category: '操作系统', difficulty: '困难' },
  { id: 'net-1', title: 'TCP三次握手与四次挥手', category: '网络', difficulty: '中等' },
  { id: 'sys-1', title: '设计短链接服务', category: '系统设计', difficulty: '困难' },
  { id: 'algo-10', title: '最短路径-Dijkstra算法', category: '算法', difficulty: '困难' },
];

const avgScore = Math.round(mockSessions.reduce((s, m) => s + m.score, 0) / mockSessions.length);
const bestCategory = [...categoryPerformance].sort((a, b) => b.score - a.score)[0];
const weakCategory = [...categoryPerformance].sort((a, b) => a.score - b.score)[0];

function ScoreColor({ score }: { score: number }) {
  if (score >= 80) return <span className="text-green-400 font-bold">{score}</span>;
  if (score >= 65) return <span className="text-amber-400 font-bold">{score}</span>;
  return <span className="text-red-400 font-bold">{score}</span>;
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">学习仪表盘</h1>
        <p className="text-gray-400">追踪你的面试备战进度，精准定位提升方向</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: '练习场次', value: mockSessions.length, icon: '🎯', sub: '累计练习' },
          { label: '平均分', value: avgScore, icon: '📊', sub: '综合得分' },
          { label: '最强分类', value: bestCategory.category, icon: '🏆', sub: `${bestCategory.score} 分` },
          { label: '薄弱分类', value: weakCategory?.category ?? '-', icon: '📌', sub: weakCategory ? `${weakCategory.score} 分` : '' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
            <div className="text-gray-400 text-xs">{stat.label}</div>
            <div className="text-gray-600 text-xs">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
            各分类能力分析
          </h2>
          <div className="space-y-4">
            {categoryPerformance.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-gray-300 text-sm">{item.category}</span>
                  <ScoreColor score={item.score} />
                </div>
                <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Areas */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="w-1.5 h-5 bg-red-500 rounded-full" />
            薄弱领域
          </h2>
          <div className="space-y-3">
            {[...categoryPerformance]
              .sort((a, b) => a.score - b.score)
              .slice(0, 3)
              .map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{item.category}</p>
                    <p className="text-gray-500 text-xs">需要重点加强</p>
                  </div>
                  <div className="text-right">
                    <ScoreColor score={item.score} />
                    <p className="text-gray-500 text-xs">/ 100</p>
                  </div>
                </div>
              ))}
          </div>
          <Link
            href="/questions"
            className="mt-4 block text-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            前往练习薄弱题目 →
          </Link>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-purple-500 rounded-full" />
          近期练习记录
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-xs uppercase tracking-wide border-b border-gray-800">
                <th className="pb-3 text-left">日期</th>
                <th className="pb-3 text-left">题目方向</th>
                <th className="pb-3 text-left">题目数</th>
                <th className="pb-3 text-left">时长</th>
                <th className="pb-3 text-right">得分</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {mockSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 text-gray-400 text-sm">{session.date}</td>
                  <td className="py-3 text-white text-sm">{session.category}</td>
                  <td className="py-3 text-gray-400 text-sm">{session.questions} 题</td>
                  <td className="py-3 text-gray-400 text-sm">{session.duration}</td>
                  <td className="py-3 text-right">
                    <ScoreColor score={session.score} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Questions */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-green-500 rounded-full" />
          为你推荐
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {recommendedQuestions.map((q) => (
            <Link
              key={q.id}
              href={`/questions/${q.id}`}
              className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 border border-gray-700 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium group-hover:text-blue-300 transition-colors truncate">
                  {q.title}
                </p>
                <div className="flex gap-2 mt-1.5">
                  <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-md">
                    {q.category}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-md ${
                    q.difficulty === '简单' ? 'bg-green-500/20 text-green-400' :
                    q.difficulty === '中等' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
              <svg className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
        <div className="mt-5 text-center">
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-sm shadow-lg shadow-blue-500/20"
          >
            🚀 开始新一轮模拟面试
          </Link>
        </div>
      </div>
    </div>
  );
}
