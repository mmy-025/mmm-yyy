# Cloudflare部署任务清单

## 部署前准备

- [ ] 任务1: 同步代码到GitHub仓库
  - ⚠️ 代码已在本地完成，需要手动推送到GitHub
  - 请在本地终端执行以下命令：
  ```bash
  cd /workspace
  git remote set-url origin https://<your-github-token>@github.com/mmy-025/da-course.git
  git push origin master
  ```

## Cloudflare Pages部署

- [ ] 任务2: 部署前端到Cloudflare Pages
  - [ ] 2.1 登录Cloudflare Dashboard (https://dash.cloudflare.com)
  - [ ] 2.2 进入左侧菜单"Workers & Pages"
  - [ ] 2.3 点击"创建应用程序"
  - [ ] 2.4 选择"Pages"标签，点击"连接到Git"
  - [ ] 2.5 选择GitHub仓库"mmy-025/da-course"并授权
  - [ ] 2.6 配置构建设置：
    - 项目名称: da-course
    - 框架预设: Vue (或选择"Vite"如果可用)
    - 构建命令: npm run build
    - 构建输出目录: dist
  - [ ] 2.7 点击"保存并部署"
  - [ ] 2.8 等待构建完成，记录生成的访问URL (通常为 *.pages.dev)

## Cloudflare Workers部署

- [ ] 任务3: 部署AI代理Worker
  - [ ] 3.1 进入Workers & Pages页面
  - [ ] 3.2 点击"创建Worker"
  - [ ] 3.3 Worker名称: da-course-ai-proxy
  - [ ] 3.4 删除默认代码，复制 worker-ai-proxy.ts 的全部内容粘贴
  - [ ] 3.5 点击"保存并部署"
  - [ ] 3.6 点击"设置" → "变量和秘密"
  - [ ] 3.7 添加环境变量：
    - CLOUDFLARE_ACCOUNT_ID: (您的Cloudflare Account ID)
    - AI_GATEWAY_NAME: (AI Gateway名称)
    - AI_API_KEY: (AI API密钥)
  - [ ] 3.8 点击"部署"
  - [ ] 3.9 记录Worker URL: https://da-course-ai-proxy.<your-subdomain>.workers.dev

- [ ] 任务4: 部署静态内容托管Worker
  - [ ] 4.1 创建新的Worker
  - [ ] 4.2 Worker名称: da-course-content
  - [ ] 4.3 复制 worker-static-content.ts 的全部内容粘贴
  - [ ] 4.4 点击"设置" → "KV" → "绑定"
  - [ ] 4.5 点击"添加绑定":
    - 变量名称: STATIC_CONTENT
    - KV命名空间: da-course-content (将在任务5中创建)
  - [ ] 4.6 点击"保存并部署"
  - [ ] 4.7 记录Worker URL: https://da-course-content.<your-subdomain>.workers.dev

## Workers KV配置

- [ ] 任务5: 创建和配置Workers KV
  - [ ] 5.1 进入左侧菜单"Workers & Pages" → "KV"
  - [ ] 5.2 点击"创建命名空间"
  - [ ] 5.3 命名空间名称: da-course-content
  - [ ] 5.4 点击"创建"
  - [ ] 5.5 进入该命名空间，点击"添加条目"
  - [ ] 5.6 逐个添加 kv-data.json 中的数据:
    - 思维模型数据
    - 行业争议数据
    - 辨析题数据
    - 项目内容数据
  - [ ] 5.7 注意: 确保JSON格式正确

## AI Gateway配置

- [ ] 任务6: 配置AI Gateway
  - [ ] 6.1 进入左侧菜单"AI" → "AI Gateway"
  - [ ] 6.2 点击"创建Gateway"
  - [ ] 6.3 Gateway名称: da-course-gateway
  - [ ] 6.4 点击"添加Provider":
    - Provider类型: OpenAI 或 豆包
    - API Key: (您的AI API密钥)
  - [ ] 6.5 点击"保存"
  - [ ] 6.6 复制Gateway URL: https://gateway.ai.cloudflare.com/v1/<account-id>/da-course-gateway
  - [ ] 6.7 返回任务3的Worker设置，更新AI_GATEWAY_NAME为 "da-course-gateway"

## 验证测试

- [ ] 任务7: 功能验证
  - [ ] 7.1 访问Cloudflare Pages生成的URL，测试首页加载
  - [ ] 7.2 测试项目列表页面
  - [ ] 7.3 测试代码编辑器功能
  - [ ] 7.4 测试Python代码运行（会加载Pyodide）
  - [ ] 7.5 测试AI陪练功能
  - [ ] 7.6 测试思维模型页面
  - [ ] 7.7 测试辨析题页面
  - [ ] 7.8 测试学习进度保存

## 任务依赖关系

- 任务3(AI代理Worker)依赖任务6(AI Gateway配置)
- 任务4(静态内容Worker)依赖任务5(KV配置)
- 任务2(Pages部署)可以在任务1完成后独立进行
- 任务7(验证测试)依赖所有部署任务完成

## 注意事项

- GitHub认证: 使用Personal Access Token (在GitHub设置中生成)
- 环境变量: 在Cloudflare Workers设置中配置敏感信息，不要在前端代码中暴露
- KV数据: 确保kv-data.json格式正确，每个key对应一个JSON对象
- 跨域问题: Workers会自动处理CORS，前端无需额外配置
- Account ID: 在Cloudflare Dashboard右侧或URL中可以找到
