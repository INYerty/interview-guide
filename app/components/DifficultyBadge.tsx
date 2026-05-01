import { Difficulty } from '@/types';

const colorMap: Record<Difficulty, string> = {
  Easy: 'bg-green-500/20 text-green-300 border border-green-500/30',
  Medium: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  Hard: 'bg-red-500/20 text-red-300 border border-red-500/30',
};

const labelMap: Record<Difficulty, string> = {
  Easy: '简单',
  Medium: '中等',
  Hard: '困难',
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorMap[difficulty]}`}>
      {labelMap[difficulty]}
    </span>
  );
}
