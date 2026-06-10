import React from 'react';
import { User, Book, Award, Settings, ChevronRight, Download, Clock, Calendar } from 'lucide-react';
import { useUserStore } from '../store/store';

const Profile: React.FC = () => {
  const { user } = useUserStore();

  // 模拟学习历史数据
  const learningHistory = [
    { id: 1, course: 'Python基础', activity: '完成第2章学习', time: '2024-01-15 14:30' },
    { id: 2, course: 'Python基础', activity: '完成基础语法练习', time: '2024-01-14 10:15' },
    { id: 3, course: '数据分析入门', activity: '开始学习', time: '2024-01-13 09:45' },
    { id: 4, course: 'Python基础', activity: '完成第1章学习', time: '2024-01-12 16:20' },
    { id: 5, course: 'Python基础', activity: '开始学习', time: '2024-01-11 11:30' }
  ];

  // 模拟证书数据
  const certificates = [
    { id: 1, course: 'Python基础', issueDate: '2024-01-10', url: '#' },
    { id: 2, course: 'SQL基础', issueDate: '2023-12-25', url: '#' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">个人中心</h1>
          <p className="text-blue-200">管理你的学习账户和查看学习记录</p>
        </div>
      </section>

      {/* 个人信息 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* 左侧个人信息 */}
            <div className="lg:w-1/4 mb-8 lg:mb-0 lg:pr-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-900 mb-4">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <h2 className="text-xl font-bold mb-1">{user?.email || '用户名'}</h2>
                  <p className="text-gray-600 mb-6">数据分析学习者</p>
                  <div className="w-full border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">已学课程</span>
                      <span className="font-semibold">2</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">完成练习</span>
                      <span className="font-semibold">15</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">获得徽章</span>
                      <span className="font-semibold">5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">学习时长</span>
                      <span className="font-semibold">24 小时</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="lg:w-3/4">
              {/* 学习历史 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Clock className="h-6 w-6 mr-2" />
                  学习历史
                </h2>
                <div className="space-y-4">
                  {learningHistory.map((item) => (
                    <div key={item.id} className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                        <Book className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{item.activity}</h3>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{item.course}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
                    查看更多历史
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 证书管理 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  我的证书
                </h2>
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div key={certificate.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-medium">{certificate.course}</h3>
                        <p className="text-gray-600 text-sm mt-1 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          颁发日期: {certificate.issueDate}
                        </p>
                      </div>
                      <button className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                        <Download className="h-4 w-4 mr-2" />
                        下载证书
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 个人设置 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Settings className="h-6 w-6 mr-2" />
                  个人设置
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium">账户信息</h3>
                      <p className="text-gray-600 text-sm mt-1">修改邮箱和密码</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium">学习偏好</h3>
                      <p className="text-gray-600 text-sm mt-1">设置学习提醒和偏好</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium">通知设置</h3>
                      <p className="text-gray-600 text-sm mt-1">管理通知偏好</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium">隐私设置</h3>
                      <p className="text-gray-600 text-sm mt-1">管理隐私选项</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
