import Link from 'next/link';
import { questions } from './data/questions';
import { Category } from './types';

const categoryIcons: Record<Category, string> = {
  算法: '⚡',
  系统设计: '🏗️',
  行为面试: '💬',
  数据库: '🗄️',
  网络: '🌐',
  操作系统: '💻',
};

const categoryColors: Record<Category, string> = {
  算法: 'from-blue-600/20 to-blue-800/20 border-blue-500/30 hover:border-blue-400/60',
  系统设计: 'from-purple-600/20 to-purple-800/20 border-purple-500/30 hover:border-purple-400/60',
  行为面试: 'from-green-600/20 to-green-800/20 border-green-500/30 hover:border-green-400/60',
  数据库: 'from-orange-600/20 to-orange-800/20 border-orange-500/30 hover:border-orange-400/60',
  网络: 'from-cyan-600/20 to-cyan-800/20 border-cyan-500/30 hover:border-cyan-400/60',
  操作系统: 'from-red-600/20 to-red-800/20 border-red-500/30 hover:border-red-400/60',
};

const allCategories = Object.keys(categoryIcons) as Category[];

export default function HomePage() {
  const totalQuestions = questions.length;

  const categoryCounts = allCategories.reduce(
    (acc, cat) => {
      acc[cat] = questions.filter((q) => q.category === cat).length;
      return acc;
    },
    {} as Record<Category, number>,
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-gray-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            AI 驱动 · 智能评估 · 实时反馈
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              AI 驱动的
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              智能面试平台
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            通过 AI 模拟面试、海量题库练习和个性化反馈，
            <br className="hidden md:block" />
            全面提升您的技术面试表现，斩获心仪 offer。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/interview"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 text-center"
            >
              🚀 开始模拟面试
            </Link>
            <Link
              href="/questions"
              className="w-full sm:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 text-center"
            >
              📚 浏览题库
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: `${totalQuestions}+`, label: '面试题目', icon: '📝' },
            { value: '6', label: '题目分类', icon: '📂' },
            { value: '1000+', label: '用户使用', icon: '👥' },
            { value: '95%', label: '满意度', icon: '⭐' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center hover:border-blue-500/30 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">平台核心功能</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">一站式面试备战工具，从练习到实战全覆盖</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: '🤖',
              title: 'AI 智能评估',
              desc: '提交回答后即获 AI 分析，评分维度涵盖逻辑性、完整性、表达清晰度，提供针对性改进建议。',
              color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
            },
            {
              icon: '📚',
              title: '海量题库',
              desc: '覆盖算法、系统设计、数据库、网络等 6 大核心分类，题目持续更新，对应大厂高频考点。',
              color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
            },
            {
              icon: '⏱️',
              title: '模拟面试',
              desc: '真实计时压力、随机题目组合，模拟正式面试环境，帮助建立临场思路和时间管理能力。',
              color: 'from-green-500/10 to-green-600/5 border-green-500/20',
            },
            {
              icon: '📊',
              title: '数据分析',
              desc: '仪表盘展示历史成绩趋势、薄弱题目类型和能力雷达图，精准定位提升方向。',
              color: 'from-orange-500/10 to-orange-600/5 border-orange-500/20',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className={`bg-gradient-to-br ${feature.color} border rounded-xl p-6 hover:scale-105 transition-transform duration-300`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">题库分类</h2>
          <p className="text-gray-400 text-lg">选择你想练习的方向，开始有针对性的备战</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/questions?category=${encodeURIComponent(cat)}`}
              className={`bg-gradient-to-br ${categoryColors[cat]} border rounded-xl p-6 hover:scale-105 transition-all duration-300 flex items-center gap-4`}
            >
              <span className="text-3xl">{categoryIcons[cat]}</span>
              <div>
                <div className="text-white font-semibold">{cat}</div>
                <div className="text-gray-400 text-sm">{categoryCounts[cat]} 道题目</div>
              </div>
              <svg className="w-4 h-4 text-gray-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            准备好迎接你的下一次面试了吗？
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            立即开始模拟练习，AI 将为你的每一个回答提供专业反馈
          </p>
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 text-lg"
          >
            🎯 立即开始面试练习
          </Link>
        </div>
      </section>
    </div>
  );
}
