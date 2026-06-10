# 代码编辑器Pyodide改造规范

## Why
当前代码编辑器需要升级为基于Pyodide的浏览器端Python运行环境，实现真正的Jupyter Notebook体验，无需后端服务器即可运行完整的数据分析代码。

## What Changes
- 替换代码编辑器运行内核为Pyodide
- 预装数据分析必备库：pandas、numpy、matplotlib、seaborn、scikit-learn、mlxtend
- 支持代码高亮、行号显示
- 支持点击运行按钮执行代码
- 支持控制台输出和DataFrame打印展示
- 支持matplotlib图表自动显示
- **严格保留原有界面的宽高、位置、外观风格，不改变任何布局**

## Impact
- Affected specs: KnowledgeDetail.tsx的代码编辑器部分
- Affected code: 
  - src/utils/pyodide.ts
  - src/pages/KnowledgeDetail.tsx
  - src/pages/Learn.tsx

## ADDED Requirements

### Requirement: Pyodide运行环境
系统SHALL提供完整的浏览器端Python运行环境：
- 自动加载Pyodide引擎
- 预装数据分析必备库
- 代码执行和输出分离

#### Scenario: 代码执行
- **WHEN** 用户点击运行按钮
- **THEN** 代码在Pyodide中执行，输出结果显示在控制台区域

### Requirement: 数据展示
系统SHALL支持DataFrame和图表的正确展示：
- DataFrame以表格形式打印
- matplotlib图表转换为base64图片显示

#### Scenario: 图表生成
- **WHEN** 代码生成matplotlib图表
- **THEN** 图表自动显示在输出区域下方

### Requirement: 用户界面
系统SHALL保持原有界面风格：
- 编辑器高度固定为384px（h-96）
- 运行按钮样式保持一致
- 输出区域样式保持一致

#### Scenario: 界面显示
- **WHEN** 页面加载
- **THEN** 代码编辑器显示在原有位置，保持原有宽高和样式

## MODIFIED Requirements

### Requirement: 代码编辑器组件
**修改内容**：
- 使用Pyodide替代任何后端调用
- 集成代码运行和输出展示
- 保留Monaco Editor编辑器组件
- 保留所有UI样式类名

**关键约束**：
- ❌ 禁止修改任何布局类（flex、grid、w-*、h-*）
- ❌ 禁止修改任何样式类（bg-*、text-*、border-*）
- ❌ 禁止修改任何间距类（p-*、m-*、space-*）
- ❌ 禁止修改任何响应式类（md:*、lg:*）
- ✅ 只允许修改功能逻辑代码
- ✅ 只允许修改事件处理函数

## REMOVED Requirements

### Requirement: 旧版代码执行方式
**Reason**: 不再需要后端API调用，所有代码在浏览器内执行
**Migration**: 使用Pyodide本地执行替代

## 核心约束

### 🚫 严禁修改的内容（违反将导致验收失败）

1. **布局结构**
   - 父容器div结构
   - flex/grid布局配置
   - 响应式断点
   - 容器宽度比例

2. **样式类名**
   - 所有bg-*类
   - 所有text-*类  
   - 所有rounded-*类
   - 所有shadow-*类
   - 所有transition-*类

3. **尺寸配置**
   - h-96（编辑器高度）
   - 编辑器所在容器的任何宽度类
   - 任何影响布局的尺寸类

4. **组件位置**
   - 编辑器在页面中的位置
   - 运行按钮的位置
   - 输出区域的位置

### ✅ 允许修改的内容

1. **功能逻辑**
   - pyodide.ts的执行逻辑
   - 状态管理逻辑
   - 事件处理函数

2. **输出展示**
   - 控制台输出格式
   - 图表展示方式
   - 错误信息展示格式

3. **依赖引用**
   - 导入语句
   - 函数调用方式

## 技术实现要求

### pyodide.ts必须包含的功能

```typescript
// 必需功能
export function initPyodide() // 初始化Pyodide
export function runPythonCode(code: string) // 运行代码
export function generateChart(code: string) // 生成图表
export function getLoadingStatus() // 获取加载状态
```

### 预装库清单

```
- pandas
- numpy  
- matplotlib
- seaborn
- scikit-learn
- mlxtend
```

### 输出格式要求

1. **文本输出**: 使用console.log格式，白色背景，黑色文字
2. **DataFrame输出**: 使用pandas的to_string()方法格式化
3. **图表输出**: base64编码的PNG图片，居中显示
4. **错误输出**: 红色背景，红色文字，带错误图标
