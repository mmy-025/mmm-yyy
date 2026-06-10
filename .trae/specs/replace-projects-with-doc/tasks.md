# 替换实战项目内容为文档 - Implementation Plan

## [/] Task 1: 更新Projects.tsx中的项目列表
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 将项目列表从5个更新为文档中的10个核心技能项目
  - 更新项目标题、描述、难度、时长等信息
  - 保持原有的卡片样式和布局完全不变
- **Acceptance Criteria Addressed**: [AC-1]
- **Test Requirements**:
  - human-judgement TR-1.1: 10个项目列表正确显示
  - human-judgement TR-1.2: 布局和样式保持不变
- **Notes**: 完全保持原有的组件结构，只更新数据

## [/] Task 2: 更新ProjectDetail.tsx中的项目数据
- **Priority**: P0
- **Depends On**: Task 1
- **Description**: 
  - 替换projectData为文档中的10个完整项目
  - 每个项目包含：项目背景、项目需求、完整代码模板
  - 代码模板对应每个核心技能的实战内容
- **Acceptance Criteria Addressed**: [AC-2, AC-3]
- **Test Requirements**:
  - human-judgement TR-2.1: 每个项目详情完整显示
  - human-judgement TR-2.2: 代码模板完整可运行
- **Notes**: 10个项目分别对应文档中的10大核心技能

## [ ] Task 3: 构建和验证
- **Priority**: P1
- **Depends On**: Task 2
- **Description**: 
  - 运行npm run build确保无错误
  - 测试项目列表和详情页面
  - 验证代码运行功能正常
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]
- **Test Requirements**:
  - programmatic TR-3.1: 构建成功无错误
  - human-judgement TR-3.2: 所有功能正常

## 10个核心技能项目
1. 数据清洗实战
2. 分组聚合分析
3. 购物篮分析
4. 客户聚类分析
5. 数据可视化
6. A/B测试分析
7. 时间序列分析
8. 特征工程
9. 异常值检测
10. 多数据集合并
