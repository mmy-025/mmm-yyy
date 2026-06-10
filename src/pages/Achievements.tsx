import React from 'react';
import { Trophy, Star, Medal, Crown, ChevronRight } from 'lucide-react';
import { useAchievementStore } from '../store/store';

const Achievements: React.FC = () => {
  const { achievements, unlockAchievement } = useAchievementStore();

  // 模拟成就数据
  const mockAchievements = [
    { id: 1, name: '初学者', description: '完成第一个课程', icon: '🎓', unlocked: true },
    { id: 2, name: '勤奋学习者', description: '连续学习7天', icon: '🔥', unlocked: true },
    { id: 3, name: '数据分析大师', description: '完成所有数据分析课程', icon: '🏆', unlocked: false },
    { id: 4, name: '练习达人', description: '完成50个练习', icon: '💪', unlocked: false },
    { id: 5, name: '测验高手', description: '测验平均分数90分以上', icon: '⭐', unlocked: false },
    { id: 6, name: '分享大使', description: '分享3个课程给朋友', icon: '🤝', unlocked: false }
  ];

  // 模拟等级数据
  const userLevel = 3;
  const currentExp = 250;
  const expToNextLevel = 500;
  const levelProgress = (currentExp / expToNextLevel) * 100;

  // 模拟排行榜数据
  const leaderboard = [
    { rank: 1, name: '张三', score: 1200, level: 5 },
    { rank: 2, name: '李四', score: 980, level: 4 },
    { rank: 3, name: '王五', score: 850, level: 4 },
    { rank: 4, name: '赵六', score: 720, level: 3 },
    { rank: 5, name: '你', score: 650, level: 3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">成就系统</h1>
          <p className="text-blue-200">查看你的学习成就和排行榜</p>
        </div>
      </section>

      {/* 等级信息 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="w-20 h-20 rounded-full bg-blue-900 text-white flex items-center justify-center text-3xl font-bold mr-6">
                  {userLevel}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">数据分析学习者</h2>
                  <p className="text-gray-600">等级 {userLevel}</p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">经验值</span>
                  <span className="text-sm font-medium">{currentExp} / {expToNextLevel}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-green-600 h-4 rounded-full" style={{ width: `${levelProgress}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">距离下一级还需 {expToNextLevel - currentExp} 经验值</p>
              </div>
            </div>
          </div>

          {/* 徽章系统 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="h-6 w-6 mr-2" />
              我的徽章
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {mockAchievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg text-center ${achievement.unlocked ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-200 opacity-50'}`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <h3 className="font-semibold mb-1">{achievement.name}</h3>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 排行榜 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Crown className="h-6 w-6 mr-2" />
              学习排行榜
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">排名</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">用户名</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">等级</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">积分</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((user) => (
                    <tr key={user.rank} className={user.name === '你' ? 'bg-blue-50' : ''}>
                      <td className="py-3 px-4 text-sm">
                        <div className={`flex items-center ${user.rank <= 3 ? 'text-yellow-500' : 'text-gray-600'}`}>
                          {user.rank === 1 && <Crown className="h-4 w-4 mr-1" />}
                          {user.rank === 2 && <Medal className="h-4 w-4 mr-1" />}
                          {user.rank === 3 && <Star className="h-4 w-4 mr-1" />}
                          {user.rank}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-sm">{user.level}</td>
                      <td className="py-3 px-4 text-sm">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center">
                查看完整排行榜
                <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
