// 静态内容读取工具

const CONTENT_WORKER_URL = 'https://your-content-worker.your-account.workers.dev';

// 本地fallback数据
import localData from '../../kv-data.json';

// 读取静态内容
export async function getStaticContent(key: string) {
  try {
    // 首先尝试从Worker获取
    const response = await fetch(`${CONTENT_WORKER_URL}/api/content/${key}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
  } catch (error: any) {
    console.log('Worker不可用，使用本地数据');
  }

  // 回退到本地数据
  if (localData.hasOwnProperty(key)) {
    return { success: true, data: (localData as any)[key] };
  }

  return { success: false, error: '内容未找到' };
}

// 读取思维模型内容
export async function getThinkingModels() {
  return getStaticContent('thinking-models');
}

// 读取行业争议内容
export async function getControversies() {
  return getStaticContent('controversies');
}

// 读取辨析题内容
export async function getQuizQuestions() {
  return getStaticContent('quiz-questions');
}

// 读取项目内容
export async function getProjects() {
  return getStaticContent('projects');
}

// 读取知识模块列表
export async function getKnowledgeModules() {
  return getStaticContent('knowledge-modules');
}

// 读取知识模块详情
export async function getKnowledgeModuleDetail(id: number) {
  const result = await getKnowledgeModules();
  if (result.success && result.data) {
    const module = result.data.find((m: any) => m.id === id);
    return { success: true, data: module };
  }
  return { success: false, error: '知识模块未找到' };
}