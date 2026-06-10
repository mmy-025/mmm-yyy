import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, Clock, ArrowRight,
  Sparkles, Filter, ShoppingBag, Users, 
  BarChart3, TrendingUp, Clock as ClockIcon,
  Zap, AlertTriangle, Database
} from 'lucide-react';

interface PracticeProject {
  id: number;
  title: string;
  description: string;
  difficulty: '初级' | '中级' | '高级';
  duration: string;
  icon: string;
  scenarios: string[];
  coreSkill: string;
  background: string;
  requirements: string[];
}

const projects: PracticeProject[] = [
  {
    id: 1,
    title: '零基础商务数据清洗实战',
    description: '以电商零售订单原始数据集为载体，完成企业级全流程数据清洗，复刻职场真实工作场景',
    difficulty: '初级',
    duration: '2-3小时',
    icon: 'clean',
    coreSkill: '数据清洗',
    scenarios: ['数据导入', '脏数据检测', '分层清洗', '数据合规校验', '标准化输出'],
    background: '某电商平台需要对原始订单数据进行清洗处理，为后续分析提供可靠数据源。',
    requirements: [
      '数据导入：读取CSV格式原始订单数据',
      '脏数据检测：批量查找重复订单、空值、异常数据',
      '分层清洗处理：缺失值、重复值、异常值分别处理',
      '数据合规校验：统计数据完整率、有效率',
      '输出标准化干净数据集'
    ]
  },
  {
    id: 2,
    title: '电商销售多维分组聚合分析',
    description: '基于清洗后的电商订单数据，开展多维商务分组聚合分析，挖掘销售核心规律',
    difficulty: '初级',
    duration: '1-2小时',
    icon: 'group',
    coreSkill: '分组聚合分析',
    scenarios: ['时间维度聚合', '商品维度聚合', '区域维度聚合', '复合维度分析', '透视表汇总'],
    background: '某电商平台需要全面分析销售数据，从时间、商品、区域等多个维度了解销售状况。',
    requirements: [
      '时间维度聚合：按日、周、月分组统计订单量、销售额',
      '商品维度聚合：按商品品类、单品分组统计销量',
      '区域维度聚合：按收货地区分组统计销售贡献',
      '复合维度聚合：多维度交叉分析',
      '通过透视表汇总核心指标'
    ]
  },
  {
    id: 3,
    title: '超市商品购物篮关联分析',
    description: '采用超市线下交易数据集，实现经典购物篮分析，赋能商品搭配、捆绑销售运营',
    difficulty: '中级',
    duration: '2-3小时',
    icon: 'basket',
    coreSkill: '购物篮分析',
    scenarios: ['数据预处理', 'Apriori算法建模', '指标筛选', '业务解读', '运营策略输出'],
    background: '某连锁超市需要分析顾客购物篮中的商品关联关系，找出经常一起购买的商品组合。',
    requirements: [
      '数据预处理：将订单数据转换为事务型购物篮数据',
      'Apriori算法建模：挖掘商品关联组合',
      '指标筛选：通过支持度、置信度、提升度筛选',
      '业务解读：分析高频搭配商品的关联关系',
      '输出运营策略：商品陈列优化、捆绑套餐设计'
    ]
  },
  {
    id: 4,
    title: '零售客户价值聚类分群',
    description: '基于零售用户消费行为数据，通过无监督聚类实现精准客户分群，适配私域运营场景',
    difficulty: '中级',
    duration: '2-3小时',
    icon: 'cluster',
    coreSkill: '客户聚类分析',
    scenarios: ['RFM特征构建', '数据标准化', 'K-Means聚类', '群体画像', '差异化运营策略'],
    background: '某零售企业需要根据用户消费行为数据对客户进行分群，制定精准化运营策略。',
    requirements: [
      '特征构建：计算RFM三大核心特征',
      '数据标准化：消除量纲影响',
      '模型训练：K-Means聚类分群',
      '群体画像：对每一类客户进行定义',
      '输出差异化运营策略'
    ]
  },
  {
    id: 5,
    title: '商务数据可视化大屏分析',
    description: '整合前期销售、客户数据，制作全套商务可视化图表，输出可直接汇报的数据分析报告',
    difficulty: '初级',
    duration: '1-2小时',
    icon: 'visual',
    coreSkill: '数据可视化',
    scenarios: ['趋势可视化', '占比可视化', '对比可视化', '分布可视化', '完整分析报告'],
    background: '某企业需要制作一套完整的商务数据可视化大屏，用于管理层决策汇报。',
    requirements: [
      '趋势可视化：销售趋势、用户增长等时间序列展示',
      '占比可视化：各类别占比、市场份额等饼图展示',
      '对比可视化：不同维度数据对比分析',
      '分布可视化：数据分布特征展示',
      '制作完整的数据分析报告'
    ]
  },
  {
    id: 6,
    title: '电商页面改版A/B测试分析',
    description: '基于电商页面改版测试数据，完成完整A/B测试分析，判定改版效果是否有效',
    difficulty: '中级',
    duration: '2-3小时',
    icon: 'ab',
    coreSkill: 'A/B测试分析',
    scenarios: ['数据预处理', '指标计算', '统计检验', '结果分析', '决策建议输出'],
    background: '某电商平台进行了首页改版A/B测试，需要分析测试结果，判断改版是否有效。',
    requirements: [
      '数据预处理：清洗测试数据，筛选有效样本',
      '指标计算：计算点击率、转化率、平均停留时间等核心指标',
      '统计检验：进行假设检验，判断差异是否显著',
      '结果分析：分析测试结果，解读业务含义',
      '输出决策建议：给出是否上线新版本的建议'
    ]
  },
  {
    id: 7,
    title: '商品销量时间序列预测分析',
    description: '基于3年商品历史销量数据，完成时序分析与未来销量预测，支撑库存备货决策',
    difficulty: '高级',
    duration: '3-4小时',
    icon: 'time',
    coreSkill: '时间序列分析',
    scenarios: ['时序数据规整', '时序特征分析', 'Prophet模型训练', '预测与评估', '库存优化建议'],
    background: '某零售企业需要根据历史销售数据预测未来销量，为库存备货提供决策支持。',
    requirements: [
      '数据规整：处理时序数据，确保时间连续性',
      '特征分析：分析趋势、季节性、周期性',
      '模型训练：使用Prophet进行销量预测',
      '模型评估：评估预测精度',
      '输出库存优化建议'
    ]
  },
  {
    id: 8,
    title: '营销数据高阶特征工程实战',
    description: '基于用户营销行为原始数据，从零构建高质量分析特征，适配建模与深度分析',
    difficulty: '高级',
    duration: '3-4小时',
    icon: 'feature',
    coreSkill: '特征工程',
    scenarios: ['时间特征提取', '统计特征构造', '业务特征构造', '特征预处理', '特征筛选'],
    background: '某营销团队需要构建高质量特征用于用户行为分析和预测建模。',
    requirements: [
      '时间特征：提取小时、星期、节假日等时间相关特征',
      '统计特征：构建均值、方差、百分位数等统计特征',
      '业务特征：基于业务逻辑构造转化率、复购率等指标',
      '特征预处理：缺失值处理、标准化、编码',
      '特征筛选：通过相关性分析筛选有效特征'
    ]
  },
  {
    id: 9,
    title: '商务数据异常值检测与风险分析',
    description: '针对电商订单、交易数据开展异常值检测，识别业务风险与数据问题',
    difficulty: '高级',
    duration: '2-3小时',
    icon: 'anomaly',
    coreSkill: '异常值检测',
    scenarios: ['数值异常检测', '行为异常检测', '数据异常处理', '风险归因', '风控优化建议'],
    background: '某电商平台需要对订单交易数据进行异常值检测，识别潜在的业务风险和数据质量问题。',
    requirements: [
      '数值异常：检测金额、数量等字段的异常值',
      '行为异常：识别异常的用户行为模式',
      '数据异常处理：制定异常处理策略',
      '风险归因：分析异常产生的原因',
      '输出风控优化建议'
    ]
  },
  {
    id: 10,
    title: '多源商务数据集合并与整合分析',
    description: '整合电商多维度独立数据集，搭建完整用户-订单-商品-渠道全维度分析库',
    difficulty: '中级',
    duration: '2-3小时',
    icon: 'merge',
    coreSkill: '多数据集合并',
    scenarios: ['数据源准备', '纵向拼接', '横向关联', '数据规整', '全链路复盘分析'],
    background: '某电商企业需要整合分散在多个系统中的数据，构建统一的分析数据仓库。',
    requirements: [
      '数据源准备：收集用户、订单、商品、渠道等多源数据',
      '纵向拼接：合并不同时间段的数据',
      '横向关联：通过主键关联各数据表',
      '数据规整：处理不一致、缺失值等问题',
      '全链路分析：从用户到订单到商品的完整分析'
    ]
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'clean':
      return <Sparkles className="h-12 w-12" />;
    case 'group':
      return <Filter className="h-12 w-12" />;
    case 'basket':
      return <ShoppingBag className="h-12 w-12" />;
    case 'cluster':
      return <Users className="h-12 w-12" />;
    case 'visual':
      return <BarChart3 className="h-12 w-12" />;
    case 'ab':
      return <TrendingUp className="h-12 w-12" />;
    case 'time':
      return <ClockIcon className="h-12 w-12" />;
    case 'feature':
      return <Zap className="h-12 w-12" />;
    case 'anomaly':
      return <AlertTriangle className="h-12 w-12" />;
    case 'merge':
      return <Database className="h-12 w-12" />;
    default:
      return <Briefcase className="h-12 w-12" />;
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case '初级':
      return 'bg-green-100 text-green-800';
    case '中级':
      return 'bg-yellow-100 text-yellow-800';
    case '高级':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Projects: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-4xl font-bold mb-4">基于10大核心技能的Python数据分析实战项目</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              商务数据专用，从入门到高阶全覆盖，系统化学习商务数据分析核心技能
            </p>
          </div>
        </div>
      </section>

      {/* 项目列表 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                {/* 项目图标 */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white text-center">
                  {getIcon(project.icon)}
                  <div className="mt-2 text-sm font-medium bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full">
                    {project.coreSkill}
                  </div>
                </div>

                {/* 项目内容 */}
                <div className="p-6">
                  {/* 标签 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {project.duration}
                    </div>
                  </div>

                  {/* 标题和描述 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>

                  {/* 场景标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.scenarios.slice(0, 3).map((scenario, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {scenario}
                      </span>
                    ))}
                    {project.scenarios.length > 3 && (
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                        +{project.scenarios.length - 3}
                      </span>
                    )}
                  </div>

                  {/* 项目详情按钮 */}
                  <Link
                    to={`/projects/${project.id}`}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  >
                    项目详情
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
