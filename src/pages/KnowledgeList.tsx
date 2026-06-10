import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Layers, ShoppingCart, Users, BarChart3, TestTube, Clock, Wrench, AlertTriangle, GitMerge, Loader2 } from 'lucide-react';
import { getKnowledgeModules } from '../utils/content';

interface KnowledgeModule {
  id: number;
  title: string;
  description: string;
  knowledge: string;
  syntax: string;
  steps: string;
  examples: string;
  icon: string;
}

const KnowledgeList: React.FC = () => {
  const [modules, setModules] = useState<KnowledgeModule[]>([
    { id: 1, title: '数据清洗', description: '对原始数据中的缺失值、重复值、异常值、无效格式、冗余数据进行检测与修正，提升数据质量。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'sparkles' },
    { id: 2, title: '分组聚合分析', description: '将数据集按维度分组，对每组数据进行统计计算，实现维度拆解分析。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'layers' },
    { id: 3, title: '购物篮分析', description: '挖掘用户同时购买商品的关联关系，应用于商品捆绑销售、推荐系统。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'shopping-cart' },
    { id: 4, title: '客户聚类分析', description: '根据客户多维特征，将相似客户自动划分为不同群体，实现客户分层。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'users' },
    { id: 5, title: '数据可视化', description: '将结构化数据转化为图表，直观展示数据分布、趋势、关联、对比关系。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'chart-bar' },
    { id: 6, title: 'A/B测试分析', description: '通过对照实验和统计检验，判断新方案指标是否显著优于原方案。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'test-tube' },
    { id: 7, title: '时间序列分析', description: '基于时间顺序排列的动态数据，挖掘趋势、周期性、季节性，实现数据预测。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'clock' },
    { id: 8, title: '特征工程', description: '对原始数据进行加工、转换、衍生，生成高质量特征，是机器学习建模的核心基础。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'wrench' },
    { id: 9, title: '异常值检测', description: '检测偏离正常数据分布的极端数值，避免干扰统计分析和模型训练。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'alert-triangle' },
    { id: 10, title: '多数据集合并', description: '将多个结构相同/关联的数据集整合为完整数据集，分为纵向合并和横向合并。', knowledge: '', syntax: '', steps: '', examples: '', icon: 'git-merge' }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadModules = async () => {
      setLoading(true);
      try {
        const result = await getKnowledgeModules();
        if (result.success && result.data) {
          setModules(result.data);
        }
      } catch (err) {
        setError('加载知识模块失败，使用本地数据');
        console.error('加载知识模块失败:', err);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'broom':
      case 'sparkles':
        return <Sparkles className="h-12 w-12 text-blue-600" />;
      case 'layers':
        return <Layers className="h-12 w-12 text-blue-600" />;
      case 'shopping-cart':
        return <ShoppingCart className="h-12 w-12 text-blue-600" />;
      case 'users':
        return <Users className="h-12 w-12 text-blue-600" />;
      case 'chart-bar':
        return <BarChart3 className="h-12 w-12 text-blue-600" />;
      case 'test-tube':
        return <TestTube className="h-12 w-12 text-blue-600" />;
      case 'clock':
        return <Clock className="h-12 w-12 text-blue-600" />;
      case 'wrench':
        return <Wrench className="h-12 w-12 text-blue-600" />;
      case 'exclamation-triangle':
      case 'alert-triangle':
        return <AlertTriangle className="h-12 w-12 text-blue-600" />;
      case 'merge':
      case 'git-merge':
        return <GitMerge className="h-12 w-12 text-blue-600" />;
      default:
        return <Sparkles className="h-12 w-12 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">知识模块</h1>
          <p className="text-blue-200">数据分析核心知识模块，从基础到高级循序渐进</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {modules.map((module) => (
                  <Link key={module.id} to={`/knowledge/${module.id}`} className="block">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow p-6">
                      <div className="mb-4">
                        {getIcon(module.icon)}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors">
                        学习详情
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeList;