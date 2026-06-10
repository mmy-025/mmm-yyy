# Pyodide交互式编程实践编辑器升级任务清单

## 任务列表

### [x] Task 1: 优化pyodide.ts工具函数
**Priority**: P0
**Depends On**: None
**Description**:
  - 完善initPyodide函数，确保中文渲染配置完整
  - 优化runPythonCode函数，实现完整的输出捕获（stdout/stderr）
  - 优化generateChart函数，确保每次清除图表缓存，提升分辨率
  - 添加更完善的错误处理和类型安全
**Acceptance Criteria Addressed**: [AC-2, AC-3, AC-4]
**Test Requirements**:
  - programmatic TR-1.1: 所有库正确加载
  - human-judgement TR-1.2: 中文显示正确
  - human-judgement TR-1.3: 图表不重叠
**Notes**:
  - 必须全局预设matplotlib中文字体配置
  - 确保plt.close("all")在每次运行前执行
  - 图表dpi设置为150确保清晰度

---

### [x] Task 2: 优化KnowledgeDetail.tsx中的handleRunCode
**Priority**: P0
**Depends On**: Task 1
**Description**:
  - 完善代码执行流程，确保输出和图表正确显示
  - 优化状态管理，确保每次运行前清除旧的output和chart
  - 改进错误提示，提供更友好的错误信息
**Acceptance Criteria Addressed**: [AC-1, AC-4, AC-5]
**Test Requirements**:
  - human-judgement TR-2.1: 界面完全不变
  - human-judgement TR-2.2: DataFrame打印清晰
  - human-judgement TR-2.3: 图表不重叠
**Notes**:
  - 严禁修改任何布局、样式类名、容器结构
  - 仅修改handleRunCode函数内部逻辑
  - 保持h-96高度、vs-dark主题等所有外观不变

---

### [x] Task 3: 构建和测试验证
**Priority**: P1
**Depends On**: Task 2
**Description**:
  - 运行npm run build确保无编译错误
  - 测试完整数据分析练习流程
  - 验证所有功能正常工作
**Acceptance Criteria Addressed**: [AC-1, AC-2, AC-3, AC-4, AC-5]
**Test Requirements**:
  - programmatic TR-3.1: 构建成功无错误
  - human-judgement TR-3.2: 所有功能正常
  - human-judgement TR-3.3: 可直接部署上线

---

## 任务依赖关系

```
Task 1 (优化pyodide.ts)
  ↓
Task 2 (优化handleRunCode)
  ↓
Task 3 (构建和验证)
```

## 关键注意事项

### 🚨 绝对禁止修改的内容
1. 页面整体布局结构
2. 导航栏
3. 外层容器的任何width/height样式类
4. 外层div的className（bg-*、text-*、rounded-*、shadow-*等）
5. flex布局、grid布局类
6. 响应式断点类
7. 编辑器区域的h-96高度
8. 编辑器的vs-dark主题配置
9. 行号显示设置

### ✅ 允许修改的内容
1. pyodide.ts内部函数实现
2. handleRunCode内部逻辑
3. 状态管理逻辑
4. 输出展示方式

## 功能演示测试用例

### 测试1: 基础pandas和numpy
```python
import pandas as pd
import numpy as np

data = pd.DataFrame({
    '姓名': ['张三', '李四', '王五'],
    '年龄': [25, 30, 35],
    '城市': ['北京', '上海', '广州']
})
print(data)
```

### 测试2: 中文matplotlib图表
```python
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(1, 11)
y = np.random.randint(10, 100, 10)

plt.figure(figsize=(10, 6))
plt.plot(x, y, 'o-', color='blue')
plt.title('销售数据分析图表')
plt.xlabel('月份')
plt.ylabel('销售额（万元）')
plt.grid(True)
plt.show()
```
