import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Filter, CheckCircle2, Clock, Award, Loader2 } from 'lucide-react';
import { getAllProgress } from '../utils/storage';
import { getProjects } from '../utils/content';

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  duration: number;
  image: string;
}

const Courses: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: '项目1：Python基础语法',
      description: '学习Python基本语法，包括变量、数据类型、控制流等',
      difficulty: '初级',
      duration: 2,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20basic%20syntax%20tutorial&image_size=landscape_16_9'
    },
    {
      id: 2,
      title: '项目2：数据读取与清洗',
      description: '学习使用Pandas读取和清洗数据',
      difficulty: '初级',
      duration: 3,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20cleaning%20with%20Pandas&image_size=landscape_16_9'
    },
    {
      id: 3,
      title: '项目3：数据可视化基础',
      description: '使用Matplotlib创建基本的数据可视化图表',
      difficulty: '初级',
      duration: 3,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20visualization%20with%20Matplotlib&image_size=landscape_16_9'
    },
    {
      id: 4,
      title: '项目4：数据分析基础',
      description: '学习使用Pandas进行基本的数据分析',
      difficulty: '中级',
      duration: 4,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20analysis%20with%20Pandas&image_size=landscape_16_9'
    },
    {
      id: 5,
      title: '项目5：数据聚合与分组',
      description: '学习使用Pandas进行数据聚合和分组操作',
      difficulty: '中级',
      duration: 4,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20aggregation%20and%20grouping&image_size=landscape_16_9'
    },
    {
      id: 6,
      title: '项目6：数据挖掘与关联分析',
      description: '学习使用mlxtend进行关联规则挖掘',
      difficulty: '中级',
      duration: 5,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20mining%20association%20rules&image_size=landscape_16_9'
    },
    {
      id: 7,
      title: '项目7：机器学习基础',
      description: '学习使用scikit-learn进行简单的机器学习建模',
      difficulty: '高级',
      duration: 6,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20basics&image_size=landscape_16_9'
    },
    {
      id: 8,
      title: '项目8：数据可视化进阶',
      description: '学习使用Seaborn创建更高级的数据可视化图表',
      difficulty: '高级',
      duration: 5,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Advanced%20data%20visualization%20with%20Seaborn&image_size=landscape_16_9'
    },
    {
      id: 9,
      title: '项目9：时间序列分析',
      description: '学习使用Pandas进行时间序列数据分析',
      difficulty: '高级',
      duration: 6,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Time%20series%20analysis&image_size=landscape_16_9'
    },
    {
      id: 10,
      title: '项目10：综合数据分析项目',
      description: '综合运用所学知识进行完整的数据分析',
      difficulty: '高级',
      duration: 8,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Comprehensive%20data%20analysis%20project&image_size=landscape_16_9'
    }
  ]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('全部');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const result = await getProjects();
        if (result.success && result.data) {
          setProjects(result.data);
        }
      } catch (err) {
        setError('加载项目失败，使用本地数据');
        console.error('加载项目失败:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const difficulties = ['全部', '初级', '中级', '高级'];

  // 获取学习进度
  useEffect(() => {
    const allProgress = getAllProgress();
    setProgress(allProgress);
  }, []);

  const filteredProjects = selectedDifficulty === '全部' 
    ? projects 
    : projects.filter(project => project.difficulty === selectedDifficulty);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">10个梯度项目</h1>
          <p className="text-blue-200">从基础到高级的Python数据分析项目，循序渐进提升技能</p>
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
              {/* 筛选器 */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">项目列表</h2>
                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <Filter className="h-4 w-4" />
                      <span>筛选</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {isFilterOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                        {difficulties.map((difficulty) => (
                          <button
                            key={difficulty}
                            onClick={() => {
                              setSelectedDifficulty(difficulty);
                              setIsFilterOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedDifficulty === difficulty ? 'bg-blue-100 text-blue-900' : ''}`}
                          >
                            {difficulty}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">
                  显示 {filteredProjects.length} 个项目 ({selectedDifficulty})
                </p>
              </div>

              {/* 项目网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => {
                  const projectProgress = progress[project.id.toString()] || { completed: false, code: '' };
                  return (
                    <Link key={project.id} to={`/course/${project.id}`} className="block">
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                        <div className="relative">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                          {projectProgress.completed && (
                            <div className="absolute top-4 right-4 bg-green-600 text-white p-2 rounded-full">
                              <CheckCircle2 className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-center mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.difficulty === '初级' ? 'bg-green-100 text-green-800' : project.difficulty === '中级' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {project.difficulty}
                            </span>
                            <span className="text-gray-500 text-sm flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {project.duration} 小时
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg transition-colors flex items-center justify-center">
                            {projectProgress.completed ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                已完成
                              </>
                            ) : (
                              '开始学习'
                            )}
                          </button>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
