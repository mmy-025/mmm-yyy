import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Clock, Award } from 'lucide-react';

const Assessment: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // 模拟测验数据
  const questions = [
    {
      id: 1,
      question: 'Python中，以下哪个是正确的变量命名？',
      options: ['123var', 'var123', 'var-123', 'var 123'],
      correctAnswer: 'var123'
    },
    {
      id: 2,
      question: '以下哪个不是Python的数据类型？',
      options: ['int', 'float', 'string', 'char'],
      correctAnswer: 'char'
    },
    {
      id: 3,
      question: 'Python中，用于定义函数的关键字是？',
      options: ['function', 'def', 'func', 'define'],
      correctAnswer: 'def'
    },
    {
      id: 4,
      question: '以下哪个是Python的注释符号？',
      options: ['//', '/* */', '#', '--'],
      correctAnswer: '#'
    },
    {
      id: 5,
      question: 'Python中，用于循环遍历序列的关键字是？',
      options: ['for', 'while', 'loop', 'iterate'],
      correctAnswer: 'for'
    }
  ];

  // 倒计时逻辑
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // 计算分数
    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(Math.round((correctCount / questions.length) * 100));
    setIsSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            <h2 className="text-lg font-medium">章节测验</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 测评内容 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {!isSubmitted ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* 进度指示器 */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">问题 {currentQuestion + 1} / {questions.length}</span>
                  <span className="text-gray-600">{Math.round(((currentQuestion + 1) / questions.length) * 100)}% 完成</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* 问题 */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">{questions[currentQuestion].question}</h3>
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = answers[questions[currentQuestion].id] === option;
                    return (
                      <div key={index}>
                        <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}`}>
                          <input
                            type="radio"
                            name={`question-${questions[currentQuestion].id}`}
                            checked={isSelected}
                            onChange={() => handleAnswerChange(questions[currentQuestion].id, option)}
                            className="mr-3 h-4 w-4 text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 导航按钮 */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className="bg-white border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一题
                </button>
                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    提交答案
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    下一题
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-4">
                  <Award className="h-12 w-12" />
                </div>
                <h2 className="text-2xl font-bold mb-2">测验完成！</h2>
                <p className="text-gray-600 mb-6">你的得分：</p>
                <div className="text-4xl font-bold text-blue-900 mb-6">{score} 分</div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${score >= 60 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {score >= 60 ? '通过' : '未通过'}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">答题情况</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {questions.map((question, index) => {
                    const isCorrect = answers[question.id] === question.correctAnswer;
                    return (
                      <div 
                        key={question.id} 
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to={`/course/${courseId}`} className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  返回课程
                </Link>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                    setTimeLeft(600);
                  }}
                  className="bg-white border border-gray-300 rounded-lg px-6 py-2 hover:bg-gray-50 transition-colors"
                >
                  重新测验
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Assessment;
