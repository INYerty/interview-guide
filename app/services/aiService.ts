import { AIFeedback } from '@/types';

export function evaluateAnswer(_question: unknown, answer: string): AIFeedback {
  const wordCount = answer.trim().length;

  let score = 0;
  if (wordCount > 200) score = 85 + Math.floor(Math.random() * 15);
  else if (wordCount > 100) score = 65 + Math.floor(Math.random() * 20);
  else if (wordCount > 50) score = 45 + Math.floor(Math.random() * 20);
  else score = 20 + Math.floor(Math.random() * 25);

  const strengthsList = [
    '回答思路清晰，逻辑结构合理',
    '涵盖了核心知识点',
    '举例说明恰当',
    '表达流畅，条理清楚',
    '对概念理解到位',
  ];

  const improvementsList = [
    '可以增加更多具体的代码示例',
    '建议深入分析时间复杂度',
    '可以补充边界条件的处理',
    '建议结合实际项目经验说明',
    '可以对比不同方案的优缺点',
  ];

  const topicsList = [
    '算法复杂度分析',
    '数据结构基础',
    '设计模式',
    '系统架构',
    '并发编程',
  ];

  const numStrengths = score > 70 ? 3 : score > 50 ? 2 : 1;
  const numImprovements = score > 70 ? 1 : score > 50 ? 2 : 3;

  return {
    score,
    summary:
      score > 70
        ? '回答质量较高，展现了扎实的技术基础'
        : score > 50
          ? '回答涵盖了基本要点，但还有提升空间'
          : '回答较为简短，建议深入展开技术细节',
    strengths: shuffleArray(strengthsList).slice(0, numStrengths),
    improvements: shuffleArray(improvementsList).slice(0, numImprovements),
    relatedTopics: shuffleArray(topicsList).slice(0, 3),
  };
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}
