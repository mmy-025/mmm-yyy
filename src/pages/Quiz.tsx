import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, BookOpen, Loader2 } from 'lucide-react';
import { saveChatMessages, getChatMessages } from '../utils/storage';
import { getQuestionFeedback } from '../utils/ai';
import { getQuizQuestions } from '../utils/content';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: '数据分析的核心是技术工具，掌握了工具就掌握了数据分析。',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '数据分析的核心是思维方式，而不仅仅是技术工具。掌握了正确的思维模型，才能更灵活地运用各种技术工具，从数据中获得有价值的洞察。'
    },
    {
      id: 2,
      question: '在数据分析中，数据量越大，分析结果越准确。',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '数据的价值不在于规模，而在于是否能够解决具体问题。在保证数据质量的前提下，适当扩大数据规模可以提高分析的准确性和可靠性。但如果数据质量差，数据量越大，错误也会越多。'
    },
    {
      id: 3,
      question: '机器学习算法总是比传统统计方法更有效。',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '选择哪种方法取决于具体的应用场景。对于需要解释性的场景，传统统计方法更合适；对于复杂的预测问题，机器学习可能更有效。在实际应用中，常常需要结合使用两种方法。'
    },
    {
      id: 4,
      question: '数据分析的结果应该完全客观，不包含任何主观判断。',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '数据分析的结果需要结合业务 context 进行解读，完全客观的数据分析可能缺乏实际意义。理想的分析应该是数据与经验的结合，数据提供客观基础，经验提供情境理解。'
    },
    {
      id: 5,
      question: '数据可视化的主要目的是使数据更美观。',
      options: ['正确', '错误'],
      correctAnswer: 1,
      explanation: '数据可视化的主要目的是帮助人们更直观地理解数据，发现数据中的模式和趋势，而不仅仅是为了美观。好的数据可视化应该清晰、准确地传达信息。'
    }
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadQuizQuestions = async () => {
      setLoading(true);
      try {
        const result = await getQuizQuestions();
        if (result.success && result.data) {
          setQuestions(result.data);
        }
      } catch (err) {
        setError('加载辨析题失败，使用本地数据');
        console.error('加载辨析题失败:', err);
      } finally {
        setLoading(false);
      }
    };

    loadQuizQuestions();
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errorQuestions, setErrorQuestions] = useState<number[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string>('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    } else {
      setErrorQuestions(prev => [...prev, currentQuestionIndex]);
    }
  };

  const handleNext = async () => {
    if (selectedAnswer !== currentQuestion.correctAnswer) {
      // 获取AI反馈
      setLoading(true);
      try {
        const result = await getQuestionFeedback(
          currentQuestion.question,
          currentQuestion.options[selectedAnswer!],
          currentQuestion.options[currentQuestion.correctAnswer]
        );
        if (result.success && result.data?.choices[0]?.message?.content) {
          setAiFeedback(result.data.choices[0].message.content);
          // 保存聊天记录
          const messages = getChatMessages(`quiz-${currentQuestion.id}`);
          saveChatMessages(`quiz-${currentQuestion.id}`, [
            ...messages,
            { role: 'user', content: `辨析题：${currentQuestion.question}\n我的答案：${currentQuestion.options[selectedAnswer!]}\n正确答案：${currentQuestion.options[currentQuestion.correctAnswer]}`, timestamp: Date.now() },
            { role: 'assistant', content: result.data.choices[0].message.content, timestamp: Date.now() }
          ]);
        }
      } catch (error) {
        console.error('获取AI反馈失败:', error);
      } finally {
        setLoading(false);
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAiFeedback('');
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
    setErrorQuestions([]);
    setAiFeedback('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">辨析题</h1>
          <p className="text-blue-200">测试你的数据分析知识，培养批判性思维</p>
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
            <>              {!completed ? (
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">问题 {currentQuestionIndex + 1}/{questions.length}</h2>
                  <div className="text-sm text-gray-600">得分: {score}/{currentQuestionIndex}</div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => !showResult && handleAnswer(index)}
                        disabled={showResult}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          showResult
                            ? index === currentQuestion.correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : index === selectedAnswer
                              ? 'bg-red-100 border-red-500 text-red-800'
                              : 'bg-gray-100 border-gray-300 text-gray-600'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          {showResult && (
                            <div className="mr-3">
                              {index === currentQuestion.correctAnswer ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : index === selectedAnswer ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : null}
                            </div>
                          )}
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showResult && (
                  <div className="mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2">解析：</h4>
                      <p className="text-gray-700">{currentQuestion.explanation}</p>
                    </div>
                    
                    {aiFeedback && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 text-blue-600 mr-2" />
                          AI 反馈
                        </h4>
                        <p className="text-gray-700">{aiFeedback}</p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!showResult || loading}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        加载中...
                      </>
                    ) : (
                      currentQuestionIndex < questions.length - 1 ? '下一题' : '完成'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">测验完成！</h2>
                  <p className="text-lg text-gray-600">你的得分：{score}/{questions.length}</p>
                  <div className="mt-4">
                    {score === questions.length ? (
                      <div className="bg-green-100 text-green-800 p-4 rounded-lg">
                        <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="font-semibold">太棒了！你全部答对了！</p>
                      </div>
                    ) : score >= questions.length * 0.6 ? (
                      <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="font-semibold">不错！你掌握了大部分知识点。</p>
                      </div>
                    ) : (
                      <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                        <XCircle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                        <p className="font-semibold">继续努力！多复习一下知识点。</p>
                      </div>
                    )}
                  </div>
                </div>

                {errorQuestions.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">错题回顾</h3>
                    <div className="space-y-4">
                      {errorQuestions.map(index => {
                        const q = questions[index];
                        return (
                          <div key={q.id} className="bg-gray-50 p-4 rounded-lg">
                            <p className="font-medium mb-2">{q.question}</p>
                            <p className="text-sm text-gray-600 mb-2">正确答案：{q.options[q.correctAnswer]}</p>
                            <p className="text-sm text-gray-700">{q.explanation}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleRestart}
                    className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    重新测验
                  </button>
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Quiz;