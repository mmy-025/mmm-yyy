import React, { useState, useEffect } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, AlertCircle, Loader2 } from 'lucide-react';
import { getControversies } from '../utils/content';

interface Argument {
  side: string;
  points: string[];
}

interface ControversyData {
  id: number;
  title: string;
  description: string;
  arguments: Argument[];
  conclusion: string;
}

const Controversy: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [controversies, setControversies] = useState<ControversyData[]>([
    {
      id: 1,
      title: '数据驱动 vs 经验驱动',
      description: '在决策过程中，是应该完全依赖数据，还是应该结合经验判断？',
      arguments: [
        {
          side: '数据驱动',
          points: [
            '数据提供客观、可量化的依据',
            '避免主观偏见和直觉错误',
            '能够发现隐藏的模式和趋势',
            '便于追踪和验证决策效果'
          ]
        },
        {
          side: '经验驱动',
          points: [
            '数据可能存在偏差或局限性',
            '经验能够处理复杂的情境因素',
            '快速决策时经验更高效',
            '直觉有时能发现数据之外的机会'
          ]
        }
      ],
      conclusion: '理想的决策方式是数据与经验的结合。数据提供客观基础，经验提供情境理解，两者相辅相成，才能做出更全面、更准确的决策。'
    },
    {
      id: 2,
      title: '机器学习 vs 传统统计方法',
      description: '在数据分析中，是应该优先使用机器学习算法，还是坚持传统的统计方法？',
      arguments: [
        {
          side: '机器学习',
          points: [
            '能够处理复杂的非线性关系',
            '自动发现特征和模式',
            '在大规模数据上表现优异',
            '适应不断变化的数据分布'
          ]
        },
        {
          side: '传统统计方法',
          points: [
            '结果可解释性强',
            '理论基础扎实',
            '计算资源需求低',
            '对小样本数据更稳健'
          ]
        }
      ],
      conclusion: '选择哪种方法取决于具体的应用场景。对于需要解释性的场景，传统统计方法更合适；对于复杂的预测问题，机器学习可能更有效。在实际应用中，常常需要结合使用两种方法。'
    },
    {
      id: 3,
      title: '大数据 vs 小数据',
      description: '在数据分析中，是应该追求数据的规模，还是注重数据的质量？',
      arguments: [
        {
          side: '大数据',
          points: [
            '能够捕捉更全面的信息',
            '降低抽样误差',
            '发现罕见但重要的模式',
            '支持更复杂的分析方法'
          ]
        },
        {
          side: '小数据',
          points: [
            '数据收集和处理成本低',
            '数据质量更容易控制',
            '分析速度快',
            '更适合针对性的问题'
          ]
        }
      ],
      conclusion: '数据的价值不在于规模，而在于是否能够解决具体问题。在保证数据质量的前提下，适当扩大数据规模可以提高分析的准确性和可靠性。关键是根据问题的性质和资源条件，选择合适的数据策略。'
    },
    {
      id: 4,
      title: '自动化分析 vs 人工分析',
      description: '在数据分析中，是应该尽可能自动化分析过程，还是保留人工分析的环节？',
      arguments: [
        {
          side: '自动化分析',
          points: [
            '提高分析效率和一致性',
            '减少人为错误和偏见',
            '处理大规模数据的能力强',
            '可以实时监控和分析数据'
          ]
        },
        {
          side: '人工分析',
          points: [
            '能够理解复杂的业务 context',
            '发现自动化工具可能忽略的洞察',
            '提供创造性的分析视角',
            '更好地解释分析结果'
          ]
        }
      ],
      conclusion: '自动化和人工分析是互补的。自动化可以处理重复性、大规模的分析任务，而人工分析则可以提供深度理解和创造性洞察。理想的分析流程应该是自动化与人工的有机结合。'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadControversies = async () => {
      setLoading(true);
      try {
        const result = await getControversies();
        if (result.success && result.data) {
          setControversies(result.data);
        }
      } catch (err) {
        setError('加载行业争议失败，使用本地数据');
        console.error('加载行业争议失败:', err);
      } finally {
        setLoading(false);
      }
    };

    loadControversies();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">行业争议</h1>
          <p className="text-blue-200">了解数据分析领域的热点争议，培养批判性思维</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
              {error}
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {controversies.map((controversy) => (
                  <div key={controversy.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <button
                      onClick={() => toggleExpand(controversy.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 text-blue-600 mr-3" />
                        <h2 className="text-xl font-semibold">{controversy.title}</h2>
                      </div>
                      {expandedId === controversy.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    
                    {expandedId === controversy.id && (
                      <div className="px-6 py-4 border-t border-gray-200">
                        <p className="text-gray-600 mb-4">{controversy.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {controversy.arguments.map((argument, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <h3 className="font-bold mb-3 text-blue-900">{argument.side}</h3>
                              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                {argument.points.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="font-bold mb-2 text-blue-900">综合观点</h3>
                              <p className="text-gray-700">{controversy.conclusion}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-blue-900">如何看待争议</h2>
                <p className="text-gray-700 mb-4">
                  数据分析领域的争议反映了这个学科的活力和复杂性。这些争议没有绝对的对错，而是取决于具体的应用场景和目标。
                </p>
                <p className="text-gray-700">
                  作为数据分析从业者，我们应该保持开放的心态，了解不同观点的合理性，根据具体情况选择合适的方法和工具。同时，我们也应该不断学习和探索，推动数据分析学科的发展。
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Controversy;