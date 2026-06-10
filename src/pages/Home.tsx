import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, Code, Brain, Zap, ChevronRight, Briefcase,
  Sparkles, Filter, ShoppingBag, Users, BarChart3, TrendingUp, Clock,
  Clock as ClockIcon, AlertTriangle, Database, ArrowRight
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Python数据分析AI训练平台
              </h1>
              <p className="text-xl mb-8">
                基于Cloudflare免费资源，实现"3步认知+10个梯度项目+AI错题倒逼"的Python数据分析实操训练平台，零成本、零运维、无传统后端，打开浏览器即可使用。
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/projects" className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
                  开始学习
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/projects" className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  实战项目
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20AI%20training%20platform%20dashboard&image_size=landscape_16_9"
                alt="Python数据分析AI训练平台"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 项目列表 - 核心功能区域 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">10大核心技能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: '零基础商务数据清洗实战',
                description: '以电商零售订单原始数据集为载体，完成企业级全流程数据清洗，复刻职场真实工作场景',
                difficulty: '初级',
                duration: '2-3小时',
                icon: 'clean',
                coreSkill: '数据清洗',
                scenarios: ['数据导入', '脏数据检测', '分层清洗', '数据合规校验', '标准化输出']
              },
              {
                id: 2,
                title: '电商销售多维分组聚合分析',
                description: '基于清洗后的电商订单数据，开展多维商务分组聚合分析，挖掘销售核心规律',
                difficulty: '初级',
                duration: '1-2小时',
                icon: 'group',
                coreSkill: '分组聚合分析',
                scenarios: ['时间维度聚合', '商品维度聚合', '区域维度聚合', '复合维度分析', '透视表汇总']
              },
              {
                id: 3,
                title: '超市商品购物篮关联分析',
                description: '采用超市线下交易数据集，实现经典购物篮分析，赋能商品搭配、捆绑销售运营',
                difficulty: '中级',
                duration: '2-3小时',
                icon: 'basket',
                coreSkill: '购物篮分析',
                scenarios: ['数据预处理', 'Apriori算法建模', '指标筛选', '业务解读', '运营策略输出']
              },
              {
                id: 4,
                title: '零售客户价值聚类分群',
                description: '基于零售用户消费行为数据，通过无监督聚类实现精准客户分群，适配私域运营场景',
                difficulty: '中级',
                duration: '2-3小时',
                icon: 'cluster',
                coreSkill: '客户聚类分析',
                scenarios: ['RFM特征构建', '数据标准化', 'K-Means聚类', '群体画像', '差异化运营策略']
              },
              {
                id: 5,
                title: '商务数据可视化大屏分析',
                description: '整合前期销售、客户数据，制作全套商务可视化图表，输出可直接汇报的数据分析报告',
                difficulty: '初级',
                duration: '1-2小时',
                icon: 'visual',
                coreSkill: '数据可视化',
                scenarios: ['趋势可视化', '占比可视化', '对比可视化', '分布可视化', '完整分析报告']
              },
              {
                id: 6,
                title: '电商页面改版A/B测试分析',
                description: '基于电商页面改版测试数据，完成完整A/B测试分析，判定改版效果是否有效',
                difficulty: '中级',
                duration: '2-3小时',
                icon: 'ab',
                coreSkill: 'A/B测试分析',
                scenarios: ['数据预处理', '指标计算', '统计检验', '结果分析', '决策建议输出']
              },
              {
                id: 7,
                title: '商品销量时间序列预测分析',
                description: '基于3年商品历史销量数据，完成时序分析与未来销量预测，支撑库存备货决策',
                difficulty: '高级',
                duration: '3-4小时',
                icon: 'time',
                coreSkill: '时间序列分析',
                scenarios: ['时序数据规整', '时序特征分析', 'Prophet模型训练', '预测与评估', '库存优化建议']
              },
              {
                id: 8,
                title: '营销数据高阶特征工程实战',
                description: '基于用户营销行为原始数据，从零构建高质量分析特征，适配建模与深度分析',
                difficulty: '高级',
                duration: '3-4小时',
                icon: 'feature',
                coreSkill: '特征工程',
                scenarios: ['时间特征提取', '统计特征构造', '业务特征构造', '特征预处理', '特征筛选']
              },
              {
                id: 9,
                title: '商务数据异常值检测与风险分析',
                description: '针对电商订单、交易数据开展异常值检测，识别业务风险与数据问题',
                difficulty: '高级',
                duration: '2-3小时',
                icon: 'anomaly',
                coreSkill: '异常值检测',
                scenarios: ['数值异常检测', '行为异常检测', '数据异常处理', '风险归因', '风控优化建议']
              },
              {
                id: 10,
                title: '多源商务数据集合并与整合分析',
                description: '整合电商多维度独立数据集，搭建完整用户-订单-商品-渠道全维度分析库',
                difficulty: '中级',
                duration: '2-3小时',
                icon: 'merge',
                coreSkill: '多数据集合并',
                scenarios: ['数据源准备', '纵向拼接', '横向关联', '数据规整', '全链路复盘分析']
              }
            ].map((project) => {
              // 获取图标组件
              const getIcon = () => {
                switch (project.icon) {
                  case 'clean': return <Sparkles className="h-10 w-10" />;
                  case 'group': return <Filter className="h-10 w-10" />;
                  case 'basket': return <ShoppingBag className="h-10 w-10" />;
                  case 'cluster': return <Users className="h-10 w-10" />;
                  case 'visual': return <BarChart3 className="h-10 w-10" />;
                  case 'ab': return <TrendingUp className="h-10 w-10" />;
                  case 'time': return <ClockIcon className="h-10 w-10" />;
                  case 'feature': return <Zap className="h-10 w-10" />;
                  case 'anomaly': return <AlertTriangle className="h-10 w-10" />;
                  case 'merge': return <Database className="h-10 w-10" />;
                  default: return <Briefcase className="h-10 w-10" />;
                }
              };

              // 获取难度颜色
              const getDifficultyColor = () => {
                switch (project.difficulty) {
                  case '初级': return 'bg-green-100 text-green-800';
                  case '中级': return 'bg-yellow-100 text-yellow-800';
                  case '高级': return 'bg-red-100 text-red-800';
                  default: return 'bg-gray-100 text-gray-800';
                }
              };

              return (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* 项目图标 */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white text-center">
                    {getIcon()}
                    <div className="mt-2 text-sm font-medium bg-blue-400 bg-opacity-30 px-3 py-1 rounded-full">
                      {project.coreSkill}
                    </div>
                  </div>

                  {/* 项目内容 */}
                  <div className="p-5">
                    {/* 标签 */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor()}`}>
                        {project.difficulty}
                      </span>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {project.duration}
                      </div>
                    </div>

                    {/* 标题和描述 */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{project.description}</p>

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

                    {/* 按钮 */}
                    <Link
                      to={`/projects/${project.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                      开始学习
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
