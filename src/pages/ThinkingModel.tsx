import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Lightbulb, Target, Loader2 } from 'lucide-react';
import { getThinkingModels } from '../utils/content';

interface ThinkingModelData {
  id: number;
  title: string;
  description: string;
  keyPoints: string[];
  icon: string;
}

const ThinkingModel: React.FC = () => {
  const [thinkingModels, setThinkingModels] = useState<ThinkingModelData[]>([
    {
      id: 1,
      title: '数据分析的核心思维',
      description: '数据分析不仅仅是技术操作，更是一种思维方式。它要求我们以数据为基础，通过逻辑推理和统计方法，从复杂的现象中发现规律和洞察。',
      keyPoints: [
        '以数据为依据，避免主观臆断',
        '注重逻辑推理，而非直觉判断',
        '善于从数据中发现问题和机会',
        '持续验证和迭代分析方法'
      ],
      icon: 'brain'
    },
    {
      id: 2,
      title: '结构化思维',
      description: '将复杂问题分解为简单的组成部分，通过结构化的方法进行分析和解决。这种思维方式有助于我们更清晰地理解问题，提高分析效率。',
      keyPoints: [
        '分解问题：将复杂问题拆分为可管理的部分',
        '建立框架：构建分析的逻辑框架',
        '层次分明：确保分析的层次清晰',
        '逻辑连贯：保证分析过程的逻辑一致性'
      ],
      icon: 'book-open'
    },
    {
      id: 3,
      title: '假设驱动思维',
      description: '在分析前提出假设，然后通过数据验证假设的正确性。这种思维方式可以帮助我们更有针对性地收集和分析数据，提高分析的效率和准确性。',
      keyPoints: [
        '提出假设：基于已有信息提出合理的假设',
        '设计验证方法：制定验证假设的数据分析方案',
        '收集数据：获取相关数据进行验证',
        '分析结果：根据验证结果调整假设'
      ],
      icon: 'lightbulb'
    },
    {
      id: 4,
      title: '目标导向思维',
      description: '明确分析的目标，围绕目标展开分析工作。这种思维方式可以确保分析的针对性和实用性，避免无意义的数据分析。',
      keyPoints: [
        '明确目标：清晰定义分析的目标和问题',
        '聚焦重点：围绕目标确定分析的重点',
        '衡量指标：建立衡量目标实现程度的指标',
        '结果导向：确保分析结果能够解决实际问题'
      ],
      icon: 'target'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadThinkingModels = async () => {
      setLoading(true);
      try {
        const result = await getThinkingModels();
        if (result.success && result.data) {
          setThinkingModels(result.data);
        }
      } catch (err) {
        setError('加载思维模型失败，使用本地数据');
        console.error('加载思维模型失败:', err);
      } finally {
        setLoading(false);
      }
    };

    loadThinkingModels();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return <Brain className="h-8 w-8 text-blue-600" />;
      case 'book-open':
        return <BookOpen className="h-8 w-8 text-blue-600" />;
      case 'lightbulb':
        return <Lightbulb className="h-8 w-8 text-blue-600" />;
      case 'target':
        return <Target className="h-8 w-8 text-blue-600" />;
      default:
        return <Brain className="h-8 w-8 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">思维模型</h1>
          <p className="text-blue-200">掌握数据分析的核心思维方法，提升分析能力</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {thinkingModels.map((model) => (
                  <div key={model.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      {getIcon(model.icon)}
                      <h2 className="text-xl font-bold ml-3">{model.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-4">{model.description}</p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {model.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4 text-blue-900">思维模型的应用</h2>
                <p className="text-gray-700 mb-4">
                  在实际的数据分析项目中，这些思维模型并不是孤立存在的，而是相互结合、相互补充的。通过不断练习和应用这些思维模型，你将能够更有效地解决复杂的数据分析问题，从数据中获得更有价值的洞察。
                </p>
                <p className="text-gray-700">
                  记住，数据分析的核心是思维方式，而不仅仅是技术工具。掌握了正确的思维模型，你将能够更灵活地运用各种技术工具，为企业和组织创造更大的价值。
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ThinkingModel;