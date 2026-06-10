# 知识模块Python代码编辑器 - Product Requirement Document

## Overview
- **Summary**: 在知识模块详情页面中添加交互式Python代码编辑器，使用户能够在学习每个知识模块时直接编写和运行相关的Python代码示例
- **Purpose**: 提升学习体验，让用户在学习理论知识的同时能够立即实践，巩固对每个知识点的理解
- **Target Users**: 数据分析学习者、学生、职场人士

## Goals
- 在每个知识模块详情页面添加Monaco代码编辑器
- 集成Pyodide在浏览器端运行Python代码
- 提供代码运行结果和图表展示功能
- 为每个知识模块预设相关的代码示例
- 支持代码自动保存到LocalStorage

## Non-Goals (Out of Scope)
- 不添加AI功能（思路点拨、代码纠错等）
- 不实现项目进度追踪
- 不添加复杂的代码版本控制

## Background & Context
- 现有Learn.tsx页面已经实现了完整的代码编辑器和Pyodide集成
- 每个知识模块都有对应的"syntax"和"examples"内容可以作为代码模板
- 使用React + TypeScript + Tailwind CSS技术栈
- Monaco Editor和Pyodide已经是项目依赖

## Functional Requirements
- **FR-1**: 在KnowledgeDetail.tsx页面添加Monaco代码编辑器组件
- **FR-2**: 集成Pyodide运行Python代码并显示输出结果
- **FR-3**: 为每个知识模块预填充对应的代码示例
- **FR-4**: 显示代码运行错误信息
- **FR-5**: 支持图表生成和展示
- **FR-6**: 自动保存代码草稿到LocalStorage

## Non-Functional Requirements
- **NFR-1**: 编辑器加载时间 < 2秒
- **NFR-2**: 代码执行响应时间 < 5秒
- **NFR-3**: 支持响应式布局，在移动设备上正常使用

## Constraints
- **Technical**: 使用现有的Monaco Editor和Pyodide库
- **Business**: 不引入新的外部依赖
- **Dependencies**: 依赖现有的pyodide.ts和storage.ts工具函数

## Assumptions
- Pyodide环境能够正常加载
- 浏览器支持WebAssembly
- 用户有基本的Python编程知识

## Acceptance Criteria

### AC-1: 编辑器显示
- **Given**: 用户访问知识模块详情页面
- **When**: 页面加载完成
- **Then**: 显示代码编辑器，预填充对应知识模块的示例代码
- **Verification**: `programmatic`

### AC-2: 代码运行功能
- **Given**: 用户在编辑器中编写了Python代码
- **When**: 用户点击"运行代码"按钮
- **Then**: 代码执行，显示输出结果或错误信息
- **Verification**: `programmatic`

### AC-3: 图表展示
- **Given**: 用户运行包含Matplotlib/Seaborn图表的代码
- **When**: 代码执行完成
- **Then**: 生成的图表正确显示在页面上
- **Verification**: `human-judgment`

### AC-4: 代码自动保存
- **Given**: 用户在编辑器中修改了代码
- **When**: 用户停留1秒以上没有继续输入
- **Then**: 代码自动保存到LocalStorage
- **Verification**: `programmatic`

### AC-5: Pyodide加载状态
- **Given**: 首次访问页面或Pyodide正在加载
- **When**: 页面初始化
- **Then**: 显示Pyodide加载状态，禁用运行按钮
- **Verification**: `human-judgment`

## Open Questions
- [ ] 编辑器应该放在页面的什么位置？（建议：内容区域下方）
- [ ] 是否需要"重置代码"按钮？（建议：添加）
