import { Category } from '@/types';

const colorMap: Record<Category, string> = {
  算法: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  系统设计: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  行为面试: 'bg-green-500/20 text-green-300 border border-green-500/30',
  数据库: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  网络: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  操作系统: 'bg-red-500/20 text-red-300 border border-red-500/30',
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorMap[category]}`}>
      {category}
    </span>
  );
}
