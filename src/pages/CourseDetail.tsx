import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';
import { useLearningStore } from '../store/store';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const courseId = parseInt(id || '1');
  const navigate = useNavigate();
  const { progress, updateProgress } = useLearningStore();
  const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({});

  // 模拟课程数据
  const course = {
    id: courseId,
    title: courseId === 1 ? 'Python基础' : courseId === 2 ? '数据分析入门' : courseId === 3 ? '数据可视化' : '机器学习基础',
    description: courseId === 1 ? 'Python编程语言基础教程，适合初学者' : courseId === 2 ? '使用Python进行数据分析的基本方法' : courseId === 3 ? '使用Matplotlib和Seaborn创建数据可视化' : '机器学习算法和应用',
    difficulty: courseId === 1 ? '初级' : courseId === 2 ? '初级' : courseId === 3 ? '中级' : '高级',
    duration: courseId === 1 ? 10 : courseId === 2 ? 15 : courseId === 3 ? 20 : 25,
    image: courseId === 1 ? 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20programming%20basics%20tutorial&image_size=landscape_16_9' : courseId === 2 ? 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20analysis%20with%20Python&image_size=landscape_16_9' : courseId === 3 ? 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Data%20visualization%20charts%20and%20graphs&image_size=landscape_16_9' : 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20algorithms%20concept&image_size=landscape_16_9',
    chapters: [
      {
        id: 1,
        title: '课程介绍',
        lessons: [
          { id: 1, title: '课程概述', type: 'video' },
          { id: 2, title: '学习目标', type: 'video' }
        ]
      },
      {
        id: 2,
        title: 'Python基础语法',
        lessons: [
          { id: 3, title: '变量和数据类型', type: 'video' },
          { id: 4, title: '运算符和表达式', type: 'video' },
          { id: 5, title: '基础语法练习', type: 'practice' }
        ]
      },
      {
        id: 3,
        title: '控制流',
        lessons: [
          { id: 6, title: '条件语句', type: 'video' },
          { id: 7, title: '循环语句', type: 'video' },
          { id: 8, title: '控制流练习', type: 'practice' }
        ]
      },
      {
        id: 4,
        title: '函数和模块',
        lessons: [
          { id: 9, title: '函数定义和调用', type: 'video' },
          { id: 10, title: '模块和包', type: 'video' },
          { id: 11, title: '函数练习', type: 'practice' }
        ]
      },
      {
        id: 5,
        title: '课程总结',
        lessons: [
          { id: 12, title: '知识点回顾', type: 'video' },
          { id: 13, title: '综合测评', type: 'assessment' }
        ]
      }
    ]
  };

  // 计算课程进度
  const totalChapters = course.chapters.length;
  const completedChapters = Object.keys(progress[courseId] || {}).filter(chapterId => progress[courseId][parseInt(chapterId)]).length;
  const progressPercentage = Math.round((completedChapters / totalChapters) * 100);

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleLessonClick = (chapterId: number, lessonId: number, type: string) => {
    // 更新学习进度
    updateProgress(courseId, chapterId, true);
    
    // 根据类型导航到不同页面
    if (type === 'video') {
      navigate(`/learn/${courseId}/${chapterId}?lesson=${lessonId}`);
    } else if (type === 'practice') {
      navigate(`/practice/${courseId}/${chapterId}?lesson=${lessonId}`);
    } else if (type === 'assessment') {
      navigate(`/assessment/${courseId}?lesson=${lessonId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 课程封面 */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <img
                src={course.image}
                alt={course.title}
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${course.difficulty === '初级' ? 'bg-green-100 text-green-800' : course.difficulty === '中级' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {course.difficulty}
                </span>
                <span className="mx-4 text-gray-300">|</span>
                <span>{course.duration} 小时</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-blue-200 mb-6">{course.description}</p>
              <div className="flex space-x-4">
                <Link to={`/learn/${courseId}/1`} className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  开始学习
                </Link>
                <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  加入收藏
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 课程内容 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* 左侧章节列表 */}
            <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">课程章节</h2>
                
                {/* 进度条 */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">学习进度</span>
                    <span className="text-sm font-medium">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>

                {/* 章节列表 */}
                <div className="space-y-4">
                  {course.chapters.map((chapter) => {
                    const isCompleted = progress[courseId]?.[chapter.id] || false;
                    return (
                      <div key={chapter.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <button
                          onClick={() => toggleChapter(chapter.id)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <div className="flex items-center">
                            {isCompleted ? (
                              <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                            ) : (
                              <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                            )}
                            <span className="font-medium">{chapter.title}</span>
                          </div>
                          <ChevronRight className={`h-5 w-5 transition-transform ${expandedChapters[chapter.id] ? 'transform rotate-90' : ''}`} />
                        </button>
                        
                        {expandedChapters[chapter.id] && (
                          <div className="mt-2 ml-7 space-y-2">
                            {chapter.lessons.map((lesson) => (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonClick(chapter.id, lesson.id, lesson.type)}
                                className="flex items-center text-sm text-gray-700 hover:text-blue-600 transition-colors w-full text-left"
                              >
                                {lesson.type === 'video' ? (
                                  <Play className="h-4 w-4 mr-2 text-red-500" />
                                ) : lesson.type === 'practice' ? (
                                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                                ) : (
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                                )}
                                {lesson.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 右侧课程介绍 */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">课程介绍</h2>
                <p className="text-gray-700 mb-4">
                  {course.description}
                </p>
                <p className="text-gray-700 mb-4">
                  本课程将帮助您掌握{course.title}的核心概念和实用技能，通过视频讲解、交互式练习和综合测评，让您能够熟练运用所学知识解决实际问题。
                </p>
                <h3 className="text-xl font-semibold mb-2">学习目标</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>掌握{course.title}的基本概念和原理</li>
                  <li>能够独立完成相关的数据分析任务</li>
                  <li>了解行业最佳实践和应用场景</li>
                  <li>通过综合测评检验学习成果</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">适合人群</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>商务数据分析与应用专业的学生</li>
                  <li>希望转行进入数据分析领域的职场人士</li>
                  <li>需要提升数据分析技能的业务人员</li>
                  <li>对Python和数据分析感兴趣的初学者</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
