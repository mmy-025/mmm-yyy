# 知识模块Python代码编辑器 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 更新kv-data.json，为每个知识模块添加完整代码示例
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 为10个知识模块分别创建完整、可运行的Python代码示例
  - 代码示例应该涵盖该模块的核心语法和实战内容
  - 更新kv-data.json，在每个知识模块对象中添加"codeTemplate"字段
- **Acceptance Criteria Addressed**: [FR-3]
- **Test Requirements**:
  - `programmatic` TR-1.1: 每个知识模块都有codeTemplate字段
  - `human-judgement` TR-1.2: 代码示例完整、可运行、与模块内容相关
- **Notes**: 可以结合每个模块的"syntax"和"examples"内容

## [x] Task 2: 修改KnowledgeDetail.tsx，添加编辑器状态管理
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 添加code、output、chart、loading、pyodideLoading、error等状态
  - 添加Pyodide加载状态检测
  - 添加代码草稿自动保存功能
- **Acceptance Criteria Addressed**: [FR-6, AC-4, AC-5]
- **Test Requirements**:
  - `programmatic` TR-2.1: 状态变量正确定义
  - `programmatic` TR-2.2: 自动保存功能正常工作
  - `human-judgement` TR-2.3: Pyodide加载状态正确显示

## [x] Task 3: 添加Monaco编辑器组件到KnowledgeDetail.tsx
- **Priority**: P0
- **Depends On**: Task 2
- **Description**: 
  - 导入Monaco Editor组件
  - 在页面内容下方添加编辑器区域
  - 配置编辑器主题和选项
  - 加载并显示代码模板或草稿
- **Acceptance Criteria Addressed**: [FR-1, AC-1]
- **Test Requirements**:
  - `programmatic` TR-3.1: 编辑器正确显示
  - `programmatic` TR-3.2: 代码预填充正确
  - `human-judgement` TR-3.3: 编辑器样式美观

## [x] Task 4: 实现代码运行和结果展示功能
- **Priority**: P0
- **Depends On**: Task 3
- **Description**: 
  - 导入pyodide.ts中的runPythonCode和generateChart函数
  - 实现handleRunCode函数
  - 添加运行结果和错误信息展示区域
  - 添加图表展示区域
  - 添加"运行代码"和"重置代码"按钮
- **Acceptance Criteria Addressed**: [FR-2, FR-4, FR-5, AC-2, AC-3]
- **Test Requirements**:
  - `programmatic` TR-4.1: 代码运行功能正常
  - `programmatic` TR-4.2: 错误信息正确显示
  - `human-judgement` TR-4.3: 图表展示正确

## [x] Task 5: 样式优化和响应式调整
- **Priority**: P1
- **Depends On**: Task 4
- **Description**: 
  - 优化编辑器和运行结果区域的样式
  - 确保在移动设备上的良好显示
  - 与现有页面风格保持一致
- **Acceptance Criteria Addressed**: [NFR-3]
- **Test Requirements**:
  - `human-judgement` TR-5.1: 样式美观一致
  - `human-judgement` TR-5.2: 响应式布局正常

## [x] Task 6: 测试和验证
- **Priority**: P1
- **Depends On**: Task 5
- **Description**: 
  - 测试所有知识模块的代码编辑器功能
  - 测试代码运行和图表展示
  - 测试自动保存和草稿加载
  - 测试响应式布局
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5]
- **Test Requirements**:
  - `programmatic` TR-6.1: 所有功能正常工作
  - `human-judgement` TR-6.2: 完整用户流程测试通过
