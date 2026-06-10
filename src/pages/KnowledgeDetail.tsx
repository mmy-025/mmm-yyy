import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, Layers, ShoppingCart, Users, BarChart3, TestTube, Clock, Wrench, AlertTriangle, GitMerge, ChevronLeft, Loader2, BookOpen, Code, ListChecks, Terminal, Play, AlertCircle, BarChart2, RotateCcw, Send, Bot, User, Lightbulb, HelpCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { getKnowledgeModuleDetail } from '../utils/content';
import { initPyodide, runPythonCode, generateChart, getLoadingStatus } from '../utils/pyodide';
import { saveCodeDraft, getCodeDraft, saveChatMessages, getChatMessages, type ChatMessage } from '../utils/storage';
import { getHint, getCodeCorrection } from '../utils/ai';

interface KnowledgeModule {
  id: number;
  title: string;
  description: string;
  knowledge: string;
  syntax: string;
  steps: string;
  examples: string;
  codeTemplate: string;
  icon: string;
}

const KnowledgeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const moduleId = parseInt(id || '1');
  
  const [module, setModule] = useState<KnowledgeModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  // 代码编辑器状态
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [chart, setChart] = useState<string | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [runtimeError, setRuntimeError] = useState<string>('');

  // AI聊天状态
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>('');
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadModule = async () => {
      setLoading(true);
      try {
        const result = await getKnowledgeModuleDetail(moduleId);
        if (result.success && result.data) {
          setModule(result.data);
        }
      } catch (err) {
        setError('加载知识模块失败');
        console.error('加载知识模块失败:', err);
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [moduleId]);

  // Pyodide加载状态检测
  useEffect(() => {
    const checkPyodideLoading = setInterval(() => {
      setPyodideLoading(getLoadingStatus());
    }, 500);
    return () => clearInterval(checkPyodideLoading);
  }, []);

  // 加载代码草稿
  useEffect(() => {
    if (module) {
      const draft = getCodeDraft(`knowledge-${moduleId}`);
      if (draft) {
        setCode(draft);
      } else {
        setCode(module.codeTemplate);
      }
    }
  }, [module, moduleId]);

  // 自动保存代码草稿
  useEffect(() => {
    if (code && module) {
      const timer = setTimeout(() => {
        saveCodeDraft(`knowledge-${moduleId}`, code);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [code, module, moduleId]);

  // 加载聊天记录
  useEffect(() => {
    const savedMessages = getChatMessages(`chat-knowledge-${moduleId}`);
    setChatMessages(savedMessages);
  }, [moduleId]);

  // 保存聊天记录
  useEffect(() => {
    if (chatMessages.length > 0) {
      saveChatMessages(`chat-knowledge-${moduleId}`, chatMessages);
    }
  }, [chatMessages, moduleId]);

  // 滚动到底部
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // 运行代码
  const handleRunCode = async () => {
    setCodeLoading(true);
    setRuntimeError('');
    setOutput('');
    setChart(null);

    try {
      // 先初始化 Pyodide 环境
      await initPyodide();
      
      // 运行代码获取输出
      const result = await runPythonCode(code);
      
      if (result.success) {
        // 处理输出结果
        const outputText = result.result;
        if (outputText !== undefined && outputText !== null && outputText.trim() !== '') {
          setOutput(outputText);
        } else {
          setOutput('代码执行成功（无输出）');
        }
        
        // 尝试生成图表
        const chartResult = await generateChart(code);
        if (chartResult.success && chartResult.chart) {
          setChart(chartResult.chart);
        }
      } else {
        setRuntimeError(result.error || '代码执行失败');
      }
    } catch (err: any) {
      setRuntimeError(err?.message || '执行代码时发生错误');
    } finally {
      setCodeLoading(false);
    }
  };

  // 重置代码
  const handleResetCode = () => {
    if (module) {
      setCode(module.codeTemplate);
      setOutput('');
      setChart(null);
      setRuntimeError('');
    }
  };

  // 发送消息
  const handleSendMessage = async () => {
    if (!chatInput.trim() || aiLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setAiLoading(true);

    try {
      const result = await getHint(`knowledge-${moduleId}`, code, chatInput);
      if (result.success && result.data?.choices[0]?.message?.content) {
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: result.data.choices[0].message.content,
          timestamp: Date.now()
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(result.error || 'AI回复失败');
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '抱歉，我暂时无法回答，请稍后重试。',
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setAiLoading(false);
    }
  };

  // 快速提问
  const handleQuickQuestion = async (type: 'hint' | 'correction' | 'knowledge') => {
    if (aiLoading) return;

    setAiLoading(true);
    let userContent = '';
    let result;

    try {
      switch (type) {
        case 'hint':
          userContent = '我在学习这个知识模块时遇到了困难，需要思路点拨';
          result = await getHint(`knowledge-${moduleId}`, code, userContent);
          break;
        case 'correction':
          if (!runtimeError) {
            alert('请先运行代码，查看是否有错误');
            setAiLoading(false);
            return;
          }
          userContent = `我的代码报错：${runtimeError}\n\n代码：\n${code}`;
          result = await getCodeCorrection(`knowledge-${moduleId}`, code, runtimeError);
          break;
        case 'knowledge':
          userContent = '请详细解释这个知识模块涉及的主要知识点';
          result = await getHint(`knowledge-${moduleId}`, code, userContent);
          break;
      }

      if (result && result.success && result.data?.choices[0]?.message?.content) {
        const userMessage: ChatMessage = {
          role: 'user',
          content: userContent,
          timestamp: Date.now()
        };
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: result.data.choices[0].message.content,
          timestamp: Date.now()
        };
        setChatMessages(prev => [...prev, userMessage, aiMessage]);
      } else {
        throw new Error(result?.error || 'AI回复失败');
      }
    } catch (error) {
      console.error('快速提问失败:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: '抱歉，我暂时无法回答，请稍后重试。',
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setAiLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'broom':
      case 'sparkles':
        return <Sparkles className="h-16 w-16 text-white" />;
      case 'layers':
        return <Layers className="h-16 w-16 text-white" />;
      case 'shopping-cart':
        return <ShoppingCart className="h-16 w-16 text-white" />;
      case 'users':
        return <Users className="h-16 w-16 text-white" />;
      case 'chart-bar':
        return <BarChart3 className="h-16 w-16 text-white" />;
      case 'test-tube':
        return <TestTube className="h-16 w-16 text-white" />;
      case 'clock':
        return <Clock className="h-16 w-16 text-white" />;
      case 'wrench':
        return <Wrench className="h-16 w-16 text-white" />;
      case 'exclamation-triangle':
      case 'alert-triangle':
        return <AlertTriangle className="h-16 w-16 text-white" />;
      case 'merge':
      case 'git-merge':
        return <GitMerge className="h-16 w-16 text-white" />;
      default:
        return <Sparkles className="h-16 w-16 text-white" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">加载失败</h2>
            <p>{error || '知识模块未找到'}</p>
            <Link to="/knowledge" className="mt-4 inline-block text-blue-600 hover:underline">
              返回知识模块列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部区域 */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/knowledge" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回知识模块列表
          </Link>
          
          <div className="flex flex-col md:flex-row items-start">
            <div className="mb-6 md:mb-0 md:mr-8">
              {getIcon(module.icon)}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-blue-200 text-lg">{module.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* 知识讲解 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">知识讲解</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{module.knowledge}</p>
            </div>
          </div>

          {/* 语法说明 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <Code className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">语法说明</h2>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="whitespace-pre-wrap">{module.syntax}</pre>
            </div>
          </div>

          {/* 步骤指导 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-4">
              <ListChecks className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">步骤指导</h2>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{module.steps}</p>
            </div>
          </div>

          {/* 示例代码 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Terminal className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">示例代码</h2>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="whitespace-pre-wrap">{module.examples}</pre>
            </div>
          </div>

          {/* 代码编辑器和 AI 陪练区域 */}
          <div className="flex flex-col lg:flex-row gap-6 mt-8">
            {/* 左侧：代码编辑器和运行结果 */}
            <div className="lg:w-2/3 space-y-6">
              {/* 代码编辑器 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Code className="h-6 w-6 text-blue-600 mr-3" />
                    <h2 className="text-2xl font-bold">交互式编程实践</h2>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleResetCode}
                      disabled={codeLoading || pyodideLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className="h-4 w-4" />
                      重置代码
                    </button>
                    <button
                      onClick={handleRunCode}
                      disabled={codeLoading || pyodideLoading}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {codeLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          运行中...
                        </>
                      ) : pyodideLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          加载环境...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          运行代码
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {pyodideLoading && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                    <Loader2 className="h-5 w-5 text-blue-600 mr-3 animate-spin" />
                    <span className="text-blue-800">正在加载Python环境，请稍候...</span>
                  </div>
                )}

                {/* Monaco Editor */}
                <div className="h-96 border rounded-lg overflow-hidden">
                  <Editor
                    height="100%"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true
                    }}
                  />
                </div>
              </div>

              {/* 运行结果 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <BarChart2 className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold">运行结果</h2>
                </div>

                {/* 错误信息 */}
                {runtimeError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <pre className="whitespace-pre-wrap">{runtimeError}</pre>
                  </div>
                )}

                {/* 输出信息 */}
                {output && (
                  <div className="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg mb-4">
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </div>
                )}

                {/* 图表 */}
                {chart && (
                  <div className="mt-4">
                    <img src={chart} alt="图表" className="max-w-full h-auto mx-auto" />
                  </div>
                )}
              </div>
            </div>

            {/* 右侧：AI 陪练 */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col" style={{ maxHeight: 'calc(100vh - 200px)', minHeight: '600px' }}>
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold">AI 陪练</h2>
                </div>

                {/* 快速提问按钮 */}
                <div className="space-y-2 mb-4">
                  <button
                    onClick={() => handleQuickQuestion('hint')}
                    disabled={aiLoading}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <Lightbulb className="h-4 w-4" />
                    思路点拨
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('correction')}
                    disabled={aiLoading}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <AlertCircle className="h-4 w-4" />
                    代码纠错
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('knowledge')}
                    disabled={aiLoading}
                    className="w-full flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
                  >
                    <HelpCircle className="h-4 w-4" />
                    知识点讲解
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4 flex-1 flex flex-col overflow-hidden">
                  {/* 聊天消息区域 */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {chatMessages.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <Bot className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>开始和 AI 教练聊天吧！</p>
                      </div>
                    )}
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.role === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                            <span className="text-xs opacity-75">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap">{message.content}</div>
                        </div>
                      </div>
                    ))}
                    {aiLoading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>AI 正在思考...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* 输入框区域 */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="输入你的问题..."
                      disabled={aiLoading}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={aiLoading || !chatInput.trim()}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4" />
                    </button>
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

export default KnowledgeDetail;