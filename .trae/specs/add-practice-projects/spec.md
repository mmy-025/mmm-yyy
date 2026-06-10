# 实战项目页面 - Project Requirements Document

## Overview
- **Summary**: 创建独立的"实战项目"页面，作为导航栏第三个入口（首页、知识模块、成就、实战项目），提供完整的商业数据分析实战案例
- **Purpose**: 为学习者提供真实的商业数据分析项目练习机会
- **Target Users**: 数据分析学习者

## Goals
- 创建新的导航入口"实战项目"
- 实现完整的项目列表页面
- 实现项目详情页面，包含代码编辑器和运行功能
- 提供3-5个完整实战案例

## Non-Goals (Out of Scope)
- 不删除现有页面
- 不修改现有导航结构
- 不修改其他页面内容

## Background & Context
- 当前导航栏：首页、知识模块、成就
- 需要添加第四个入口：实战项目

## Functional Requirements
- **FR-1**: 新增导航栏入口"实战项目"
- **FR-2**: 创建项目列表页面（/projects）
- **FR-3**: 创建项目详情页面（/projects/:id）
- **FR-4**: 实现代码编辑器和运行功能
- **FR-5**: 提供完整的项目数据

## Constraints
- **Technical**: React + TypeScript + Tailwind CSS
- **Business**: Pyodide前端运行

## Assumptions
- 用户需要更多实践案例
- 项目应该有完整的业务场景

## Acceptance Criteria

### AC-1: 新导航入口
- **Given**: 用户访问网站
- **When**: 查看导航栏
- **Then**: 显示"实战项目"入口
- **Verification**: human-judgment

### AC-2: 项目列表页面
- **Given**: 用户点击"实战项目"
- **When**: 页面加载
- **Then**: 显示项目列表
- **Verification**: human-judgment

### AC-3: 项目详情页面
- **Given**: 用户选择某个项目
- **When**: 页面加载
- **Then**: 显示项目介绍和代码编辑器
- **Verification**: human-judgment

## Open Questions
- [ ] 无
