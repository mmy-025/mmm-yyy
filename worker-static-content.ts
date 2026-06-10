// worker.ts - 静态内容托管

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 处理静态内容请求
    if (path.startsWith('/api/content/')) {
      const key = path.replace('/api/content/', '');
      try {
        const value = await env.STATIC_CONTENT.get(key);
        if (value) {
          return new Response(value, {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          return new Response(JSON.stringify({ error: '内容不存在' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ error: '读取内容失败' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 处理其他请求
    return new Response('Not Found', { status: 404 });
  }
};

// 环境变量定义（Cloudflare Workers中配置）
interface Env {
  STATIC_CONTENT: KVNamespace;
}
