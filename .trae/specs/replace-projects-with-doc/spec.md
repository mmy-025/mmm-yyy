# 替换实战项目内容为文档规范

## Overview
- **Summary**: 将现有5个实战项目替换为文档中的10个核心技能实战项目，基于商务数据专用，覆盖10大核心技能
- **Purpose**: 完善实战项目体系，与知识模块形成完整呼应，提供系统化的商务数据分析学习路径
- **Target Users**: 商务数据分析与应用专业学生

## Goals
- 替换现有项目为文档中的10个核心技能实战项目
- 每个项目对应一个核心技能
- 保持原有页面结构不变
- 提供完整的代码模板和详细的项目说明

## Non-Goals (Out of Scope)
- 不修改页面布局结构
- 不修改导航栏
- 不修改其他页面内容
- 不改变代码编辑器功能

## Background & Context
- 文档提供10个核心技能实战项目：数据清洗、分组聚合、购物篮分析、客户聚类、数据可视化、A/B测试、时间序列分析、特征工程、异常值检测、多数据集合并
- 需要将现有5个项目替换为这10个项目
- 保持原有Projects.tsx和ProjectDetail.tsx的页面结构

## Functional Requirements
- **FR-1**: 替换Projects.tsx中的项目列表为10个新项目
- **FR-2**: 替换ProjectDetail.tsx中的项目数据为10个新项目
- **FR-3**: 每个项目包含完整代码模板
- **FR-4**: 保持原有页面样式和功能不变

## Non-Functional Requirements
- **NFR-1**: 构建成功无错误
- **NFR-2**: 功能完整可用
- **NFR-3**: 代码可正常运行

## Constraints
- **Technical**: 保持现有页面结构不变
- **Dependencies**: Pyodide现有功能

## Assumptions
- 现有页面结构适合新内容
- 文档内容完整可直接使用

## Acceptance Criteria

### AC-1: 项目列表更新
- **Given**: 用户访问/projects页面
- **When**: 页面加载
- **Then**: 显示10个新的核心技能项目
- **Verification**: human-judgment

### AC-2: 项目详情完整
- **Given**: 用户点击任意项目
- **When**: 进入项目详情页
- **Then**: 显示完整的项目介绍、需求、代码
- **Verification**: human-judgment

### AC-3: 代码功能正常
- **Given**: 项目详情页加载完成
- **When**: 用户点击运行代码
- **Then**: 代码正常执行，结果正常显示
- **Verification**: human-judgment

## Open Questions
- [x] 无
