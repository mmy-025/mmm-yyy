// AI API代理配置
const AI_WORKER_URL = 'https://your-worker-name.your-account.workers.dev';

// 聊天消息类型
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// 发送AI请求
export async function sendAIRequest(messages: ChatMessage[]) {
  try {
    const response = await fetch(AI_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });

    if (!response.ok) {
      throw new Error(`AI API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// 生成思路点拨请求
export async function getHint(projectId: string, userCode: string, problem: string) {
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: `我在做项目 ${projectId}，遇到了问题：${problem}\n\n我的代码：\n${userCode}\n\n请给我一个思路点拨，不要直接给完整代码。`
    }
  ];

  return sendAIRequest(messages);
}

// 生成代码纠错请求
export async function getCodeCorrection(projectId: string, userCode: string, error: string) {
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: `我在做项目 ${projectId}，代码报错：${error}\n\n我的代码：\n${userCode}\n\n请指出错误原因并告诉我如何修改，不要直接贴修正后的代码。`
    }
  ];

  return sendAIRequest(messages);
}

// 生成错题追问请求
export async function getQuestionFeedback(question: string, userAnswer: string, correctAnswer: string) {
  const messages: ChatMessage[] = [
    {
      role: 'user',
      content: `辨析题：${question}\n\n我的答案：${userAnswer}\n\n正确答案：${correctAnswer}\n\n我答错了，请先追问我哪里错了，然后再详细解释。`
    }
  ];

  return sendAIRequest(messages);
}
