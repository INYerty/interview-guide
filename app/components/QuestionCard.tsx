import Link from 'next/link';
import { Question } from '@/types';
import CategoryBadge from './CategoryBadge';
import DifficultyBadge from './DifficultyBadge';

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300 flex flex-col gap-3">
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <CategoryBadge category={question.category} />
        <DifficultyBadge difficulty={question.difficulty} />
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base leading-snug line-clamp-2">
        {question.title}
      </h3>

      {/* Description preview */}
      <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
        {question.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {question.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-md border border-gray-700"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-800">
        <span className="text-xs text-gray-500">
          限时 {Math.floor(question.timeLimit / 60)} 分钟
        </span>
        <Link
          href={`/questions/${question.id}`}
          className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
        >
          查看详情
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
