# 删除项目相关页面 - Product Requirement Document

## Overview
- **Summary**: 从网站中删除项目相关页面，保留知识模块等其他功能
- **Purpose**: 精简网站，聚焦于知识学习功能
- **Target Users**: 数据分析学习者

## Goals
- 删除项目课程相关页面
- 保留知识模块、思维模型等页面
- 更新导航菜单
- 确保网站正常运行

## Non-Goals (Out of Scope)
- 不删除知识模块相关页面
- 不删除首页和成就页面

## Background & Context
- 当前网站包含10个项目课程页面
- 用户希望删除项目相关页面

## Functional Requirements
- **FR-1**: 删除Courses页面（项目列表）
- **FR-2**: 删除CourseDetail页面
- **FR-3**: 删除Learn页面（项目学习）
- **FR-4**: 删除Practice页面
- **FR-5**: 删除Assessment页面
- **FR-6**: 从Navbar移除项目相关链接
- **FR-7**: 更新App.tsx路由

## Non-Functional Requirements
- **NFR-1**: 剩余页面功能正常
- **NFR-2**: 导航菜单更新正确

## Constraints
- **Technical**: 保留React Router结构
- **Dependencies**: 保留现有其他页面功能

## Assumptions
- 用户确认要删除的是项目课程相关页面
- 保留知识模块、思维模型、成就等页面

## Acceptance Criteria

### AC-1: 页面文件删除
- **Given**: 在项目目录中
- **When**: 执行删除操作
- **Then**: 指定页面文件被删除
- **Verification**: `programmatic`

### AC-2: 路由更新
- **Given**: 在App.tsx中
- **When**: 更新路由配置
- **Then**: 项目相关路由被移除
- **Verification**: `programmatic`

### AC-3: 导航更新
- **Given**: 在Navbar组件中
- **When**: 更新导航菜单
- **Then**: 项目相关链接被移除
- **Verification**: `programmatic`

## Open Questions
- [ ] 确认要删除的页面范围（只删除项目，保留知识模块？）
