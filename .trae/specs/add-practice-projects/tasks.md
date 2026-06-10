# 添加实战项目页面 - Implementation Plan

## 任务列表

### [x] Task 1: 添加导航栏入口"实战项目"
**Priority**: P0
**Depends On**: None
**Description**:
  - 在Navbar.tsx中添加第四个导航入口
  - 图标使用：Briefcase或Target
  - 路由指向：/projects
**Acceptance Criteria Addressed**: [AC-1]
**Test Requirements**:
  - human-judgement TR-1.1: 导航栏正确显示4个入口

---

### [x] Task 2: 创建项目列表页面
**Priority**: P0
**Depends On**: Task 1
**Description**:
  - 创建src/pages/Projects.tsx
  - 实现项目卡片列表布局
  - 显示3-5个实战项目
  - 每个项目包含：标题、描述、难度标签、预估时间
**Acceptance Criteria Addressed**: [AC-2]
**Test Requirements**:
  - human-judgement TR-2.1: 项目列表正确显示

---

### [x] Task 4: 添加路由配置
**Priority**: P0
**Depends On**: Task 2
**Description**:
  - 创建src/pages/ProjectDetail.tsx
  - 实现项目介绍区域
  - 集成代码编辑器（复用Pyodide）
  - 实现运行结果展示
**Acceptance Criteria Addressed**: [AC-3]
**Test Requirements**:
  - human-judgement TR-3.1: 项目详情页面功能完整

---

### [ ] Task 4: 添加路由配置
**Priority**: P0
**Depends On**: Task 3
**Description**:
  - 在App.tsx中添加路由
  - /projects - 项目列表
  - /projects/:id - 项目详情
**Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3]
**Test Requirements**:
  - human-judgement TR-4.1: 路由正确跳转

---

### [ ] Task 5: 添加项目数据
**Priority**: P0
**Depends On**: Task 4
**Description**:
  - 在kv-data.json中添加项目数据
  - 至少3个完整实战项目
  - 每个项目包含：介绍、需求、代码模板
**Acceptance Criteria Addressed**: [AC-2, AC-3]
**Test Requirements**:
  - programmatic TR-5.1: 数据正确加载

---

### [ ] Task 6: 测试验证
**Priority**: P1
**Depends On**: Task 5
**Description**:
  - 运行npm run build
  - 测试页面功能
  - 验证代码编辑器运行
**Acceptance Criteria Addressed**: [All]
**Test Requirements**:
  - programmatic TR-6.1: 构建成功
  - human-judgement TR-6.2: 功能完整

---

## 任务依赖关系

```
Task 1 (导航入口)
  ↓
Task 2 (项目列表页) ← Task 4 (路由配置)
  ↓                    ↓
Task 3 (项目详情页) ← Task 4 (路由配置)
  ↓
Task 5 (项目数据)
  ↓
Task 6 (测试验证)
```

## 实战项目内容建议

### 项目1: 电商用户分析
- 用户画像分析
- 购买行为分析
- RFM模型应用

### 项目2: 销售数据报表
- 月度销售统计
- 地区销售对比
- 产品销售排行

### 项目3: 运营数据监控
- 转化率漏斗分析
- 用户留存分析
- A/B测试结果分析
