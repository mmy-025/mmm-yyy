import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, X, Code, BookOpen } from 'lucide-react';

const Practice: React.FC = () => {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 模拟练习数据
  const practice = {
    id: 1,
    title: '基础语法练习',
    description: '请编写一个Python程序，计算1到100的和',
    hint: '可以使用for循环或while循环来实现',
    solution: 'sum = 0\nfor i in range(1, 101):\n    sum += i\nprint(sum)',
    expectedOutput: '5050'
  };

  const handleSubmit = () => {
    // 简单的验证逻辑
    if (userCode.includes('sum') && userCode.includes('range') && userCode.includes('print')) {
      setIsCorrect(true);
      setFeedback('恭喜！你的代码是正确的。');
    } else {
      setIsCorrect(false);
      setFeedback('代码有问题，请检查并修改。提示：记得使用sum变量和range函数。');
    }
  };

  const handleReset = () => {
    setUserCode('');
    setFeedback(null);
    setIsCorrect(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <section className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={`/course/${courseId}`} className="flex items-center hover:text-green-400 transition-colors">
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>返回课程</span>
            </Link>
            <h2 className="text-lg font-medium">{practice.title}</h2>
            <div className="w-24"></div> {/* 占位，保持标题居中 */}
          </div>
        </div>
      </section>

      {/* 练习内容 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* 左侧练习区域 */}
            <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">练习题目</h3>
                <p className="text-gray-700 mb-6">{practice.description}</p>
                
                {/* 代码编辑器 */}
                <div className="mb-6">
                  <div className="flex items-center bg-gray-100 px-4 py-2 rounded-t-lg border-b border-gray-200">
                    <Code className="h-5 w-5 text-gray-600 mr-2" />
                    <span className="font-medium">Python Code</span>
                  </div>
                  <textarea
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="请在此处编写Python代码..."
                  ></textarea>
                </div>

                {/* 操作按钮 */}
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    提交代码
                  </button>
                  <button
                    onClick={handleReset}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    重置
                  </button>
                </div>

                {/* 反馈区域 */}
                {feedback && (
                  <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                    <div className="flex items-start">
                      {isCorrect ? (
                        <Check className="h-5 w-5 mr-2 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 mr-2 mt-0.5" />
                      )}
                      <p>{feedback}</p>
                    </div>
                  </div>
                )}

                {/* 提示和解决方案 */}
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      提示
                    </h4>
                    <p className="text-gray-700">{practice.hint}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">解决方案</h4>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{practice.solution}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧信息 */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">练习信息</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-600 mb-1">练习类型</h4>
                    <p className="text-gray-700">编程练习</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 mb-1">难度</h4>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 mb-1">预期输出</h4>
                    <p className="text-gray-700 font-mono">{practice.expectedOutput}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">学习提示</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>尝试自己解决问题，不要立即查看解决方案</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <Check className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>测试你的代码，确保它能正确运行</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <span>理解解决方案的思路，而不仅仅是复制代码</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Practice;
