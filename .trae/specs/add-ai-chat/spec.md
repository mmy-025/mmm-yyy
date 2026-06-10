# 添加AI陪练对话窗口 - Product Requirement Document

## Overview
- **Summary**: 在项目详情页面（KnowledgeDetail）新增AI陪练对话窗口，支持实时答疑、知识点讲解、代码报错纠错、项目实战辅导，布局与现有代码编辑器协调，风格与全站保持一致
- **Purpose**: 为用户提供即时的AI辅助学习功能，提升学习体验
- **Target Users**: 数据分析学习者

## Goals
- 在KnowledgeDetail页面新增AI陪练对话窗口
- 支持实时聊天交互
- 支持多种AI辅助功能（答疑、讲解、纠错、辅导）
- 响应式设计，适配移动端和电脑端
- 与现有代码编辑器布局协调

## Non-Goals (Out of Scope)
- 不修改路由、导航、首页及其他页面结构
- 不删除现有功能
- 不修改其他页面

## Background & Context
- KnowledgeDetail.tsx已具备在线Python代码编辑器功能
- 现有工具函数getHint和getCodeCorrection可用于AI交互
- 需要新增chat message存储和界面展示

## Functional Requirements
- **FR-1**: 新增AI陪练对话窗口组件
- **FR-2**: 支持发送消息和显示对话历史
- **FR-3**: 提供快速提问按钮（思路点拨、代码纠错、知识点讲解）
- **FR-4**: 聊天记录自动保存到LocalStorage
- **FR-5**: 响应式布局，适配移动端和电脑端
- **FR-6**: 与现有代码编辑器协调布局

## Non-Functional Requirements
- **NFR-1**: 聊天界面美观，风格与全站一致
- **NFR-2**: 消息加载状态显示
- **NFR-3**: 良好的移动端适配

## Constraints
- **Technical**: 复用现有的AI工具函数
- **Dependencies**: 依赖现有storage工具函数

## Assumptions
- AI API正常工作
- 用户有基本的聊天交互认知

## Acceptance Criteria

### AC-1: AI对话窗口显示
- **Given**: 用户访问知识详情页面
- **When**: 页面加载完成
- **Then**: 显示AI陪练对话窗口
- **Verification**: human-judgment

### AC-2: 发送消息功能
- **Given**: AI对话窗口已显示
- **When**: 用户输入消息并发送
- **Then**: 消息显示在对话中，并显示AI回复
- **Verification**: human-judgment

### AC-3: 快速提问按钮
- **Given**: AI对话窗口已显示
- **When**: 用户点击快速提问按钮
- **Then**: 发送预设的问题请求
- **Verification**: human-judgment

### AC-4: 聊天记录持久化
- **Given**: 用户进行了对话
- **When**: 刷新页面
- **Then**: 聊天历史记录恢复显示
- **Verification**: programmatic

### AC-5: 响应式布局
- **Given**: 在不同屏幕尺寸查看页面
- **When**: 调整窗口大小
- **Then**: 布局适配良好
- **Verification**: human-judgment

## Open Questions
- [ ] 无
