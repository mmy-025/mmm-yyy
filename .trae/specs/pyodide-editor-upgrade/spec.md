# Pyodide交互式编程实践编辑器升级规范

## Overview
- **Summary**: 升级现有代码编辑器为完整的Pyodide前端Python运行环境，保留所有界面布局、导航、外层样式不变，仅改进编辑器内部功能模块
- **Purpose**: 实现纯浏览器离线数据分析练习平台，提供Jupyter Notebook般的完整交互体验
- **Target Users**: 数据分析学习者

## Goals
- 基于Pyodide实现纯浏览器运行Python代码
- 预装完整数据分析库（numpy、pandas、matplotlib、seaborn）
- 全局中文渲染支持
- 完整保留界面外观布局
- 实现代码运行、控制台输出、DataFrame打印、图表渲染

## Non-Goals (Out of Scope)
- 修改页面整体布局结构
- 修改导航栏
- 修改外层容器宽高
- 修改页面其他模块（AI陪练、知识讲解等）
- 修改页面主题样式风格

## Background & Context
- 现有KnowledgeDetail.tsx已有基础代码编辑器实现
- pyodide.ts已具备基础功能
- 需要优化和完善以达到完整Jupyter体验

## Functional Requirements
- **FR-1**: 保留Monaco Editor的所有现有特性（vs-dark主题、行号、尺寸h-96）
- **FR-2**: 优化Pyodide初始化和库加载
- **FR-3**: 全局预设matplotlib中文渲染配置
- **FR-4**: 实现完整的代码执行、输出捕获、DataFrame打印
- **FR-5**: 实现matplotlib图表自动渲染，清除缓存防止重叠
- **FR-6**: 优化图表分辨率，适配输出面板宽度

## Non-Functional Requirements
- **NFR-1**: 界面外观100%保持原样
- **NFR-2**: 代码执行响应快速
- **NFR-3**: 图表渲染清晰
- **NFR-4**: 支持完整数据分析练习流程

## Constraints
- **Technical**: 仅修改代码编辑器内部功能
- **Business**: 无后端服务依赖

## Assumptions
- 用户浏览器支持Pyodide
- 网络连接足够加载CDN资源

## Acceptance Criteria

### AC-1: 界面完全保留
- **Given**: 用户访问KnowledgeDetail页面
- **When**: 页面加载完成
- **Then**: 所有布局、样式、容器结构完全不变
- **Verification**: human-judgment
- **Notes**: 仅验证编辑器和输出区域功能改进

### AC-2: Pyodide功能完整
- **Given**: 用户点击运行代码按钮
- **When**: 执行包含数据分析代码
- **Then**: 代码在浏览器端正确执行，所有库可用
- **Verification**: human-judgment

### AC-3: 中文渲染正常
- **Given**: 代码包含matplotlib图表的中文内容
- **When**: 运行代码
- **Then**: 图表中的中文标题、坐标轴、图例正确显示
- **Verification**: human-judgment

### AC-4: 图表不重叠
- **Given**: 多次运行包含图表的代码
- **When**: 每次点击运行按钮
- **Then**: 每次只显示最新图表，无重叠
- **Verification**: human-judgment

### AC-5: DataFrame打印
- **Given**: 代码包含DataFrame打印
- **When**: 运行代码
- **Then**: DataFrame以文本表格形式清晰显示
- **Verification**: human-judgment

## Open Questions
- [x] 所有需求明确，无需澄清
