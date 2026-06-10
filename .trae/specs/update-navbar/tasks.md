# 更新导航栏 - The Implementation Plan (Decomposed and Prioritized Task List)

## [x] Task 1: 修改桌面导航
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 从桌面导航删除「项目」链接
  - 调整布局使三个导航项均匀撑开宽度
  - 保持原有样式完全不变
- **Acceptance Criteria Addressed**: [AC-1, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgement` TR-1.1: 桌面导航只显示三个选项
  - `human-judgement` TR-1.2: 三个选项均匀布局
  - `human-judgement` TR-1.3: 样式保持一致

## [x] Task 2: 修改移动端导航
- **Priority**: P0
- **Depends On**: None
- **Description**: 
  - 从移动端导航菜单删除「项目」链接
  - 保持移动端原有样式和交互
- **Acceptance Criteria Addressed**: [AC-2, AC-4]
- **Test Requirements**:
  - `human-judgement` TR-2.1: 移动端菜单只显示三个选项
  - `human-judgement` TR-2.2: 样式保持一致

## [x] Task 3: 测试和验证
- **Priority**: P1
- **Depends On**: Task 1, Task 2
- **Description**: 
  - 验证桌面导航显示正确
  - 验证移动端导航显示正确
  - 验证响应式布局正常
  - 确认项目页面仍可通过URL直接访问
- **Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4]
- **Test Requirements**:
  - `human-judgement` TR-3.1: 所有验收条件满足
