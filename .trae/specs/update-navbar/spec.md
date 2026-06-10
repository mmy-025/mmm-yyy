# 更新导航栏 - Product Requirement Document

## Overview
- **Summary**: 删除导航栏中的「项目」选项，只保留首页、知识模块、成就三个标签，均匀撑开导航宽度
- **Purpose**: 简化导航，聚焦于知识学习功能，同时保留项目页面入口（通过直接访问URL）
- **Target Users**: 数据分析学习者

## Goals
- 删除导航栏中的「项目」选项
- 保留项目页面源码和路由
- 三个导航标签均匀撑开导航栏
- 保持原有样式完全不变

## Non-Goals (Out of Scope)
- 不删除项目相关页面文件
- 不修改路由配置
- 不改变任何外观样式

## Background & Context
- 当前导航包含：首页、项目、知识模块、成就
- 用户希望隐藏项目入口，但保留功能
- 需要修改Navbar组件，桌面和移动端都要更新

## Functional Requirements
- **FR-1**: 从桌面导航删除「项目」链接
- **FR-2**: 从移动端导航删除「项目」链接
- **FR-3**: 三个导航项均匀分配宽度
- **FR-4**: 保持原有深蓝色背景和白色文字样式

## Non-Functional Requirements
- **NFR-1**: 样式完全一致，无任何改动
- **NFR-2**: 响应式功能正常
- **NFR-3**: 代码改动最小化

## Constraints
- **Technical**: 只修改Navbar组件
- **Business**: 不删除项目页面，可通过URL直接访问

## Assumptions
- 用户理解项目页面仍可通过直接访问URL使用
- 三个导航项自动均分宽度

## Acceptance Criteria

### AC-1: 桌面导航更新
- **Given**: 在桌面浏览器访问网站
- **When**: 查看导航栏
- **Then**: 只显示首页、知识模块、成就三个选项
- **Verification**: `human-judgment`

### AC-2: 移动端导航更新
- **Given**: 在移动端浏览器访问网站
- **When**: 打开导航菜单
- **Then**: 只显示首页、知识模块、成就三个选项
- **Verification**: `human-judgment`

### AC-3: 均匀布局
- **Given**: 在桌面浏览器查看导航
- **When**: 三个导航项显示
- **Then**: 它们均匀撑开导航栏宽度
- **Verification**: `human-judgment`

### AC-4: 样式保持
- **Given**: 查看导航栏
- **When**: 对比更新前后
- **Then**: 背景色、文字色、悬停效果完全一致
- **Verification**: `human-judgment`

## Open Questions
- [ ] 无
