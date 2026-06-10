import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Check, AlertCircle, Code, BarChart2, Loader2 } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { runPythonCode, generateChart, getLoadingStatus } from '../utils/pyodide';
import { saveCodeDraft, getCodeDraft, saveProjectProgress, saveChatMessages, getChatMessages } from '../utils/storage';
import { getHint, getCodeCorrection } from '../utils/ai';

const Learn: React.FC = () => {
  const { courseId, chapterId } = useParams<{ courseId: string; chapterId: string }>();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [chart, setChart] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [error, setError] = useState('');

  // 检查Pyodide加载状态
  useEffect(() => {
    const checkPyodideLoading = setInterval(() => {
      setPyodideLoading(getLoadingStatus());
    }, 500);
    return () => clearInterval(checkPyodideLoading);
  }, []);

  // 10个梯度项目数据
  const projects = [
    {
      id: 1,
      title: '项目1：Python基础语法',
      description: '学习Python基本语法，包括变量、数据类型、控制流等',
      codeTemplate: '# Python基础语法练习\n# 1. 定义变量并打印\nname = "Python"\nage = 30\nprint(f"Hello, {name}! You are {age} years old.")\n\n# 2. 条件语句\nif age > 18:\n    print("You are an adult.")\nelse:\n    print("You are a minor.")\n\n# 3. 循环语句\nprint("Counting from 1 to 5:")\nfor i in range(1, 6):\n    print(i)'
    },
    {
      id: 2,
      title: '项目2：数据读取与清洗',
      description: '学习使用Pandas读取和清洗数据',
      codeTemplate: '# 数据读取与清洗练习\nimport pandas as pd\nimport numpy as np\n\n# 创建示例数据\ndata = {\n    "name": ["Alice", "Bob", "Charlie", "David"],\n    "age": [25, np.nan, 35, 40],\n    "city": ["New York", "London", "Paris", "Tokyo"]\n}\n\ndf = pd.DataFrame(data)\nprint("原始数据:")\nprint(df)\n\n# 处理缺失值\ndf["age"] = df["age"].fillna(df["age"].mean())\nprint("\n处理后的数据:")\nprint(df)\n\n# 计算统计信息\nprint("\n年龄统计信息:")\nprint(df["age"].describe())'
    },
    {
      id: 3,
      title: '项目3：数据可视化基础',
      description: '使用Matplotlib创建基本的数据可视化图表',
      codeTemplate: '# 数据可视化练习\nimport matplotlib.pyplot as plt\nimport numpy as np\n\n# 创建数据\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\n# 创建图表\nplt.figure(figsize=(10, 6))\nplt.plot(x, y, label="sin(x)")\nplt.title("Sin Function")\nplt.xlabel("x")\nplt.ylabel("y")\nplt.legend()\nplt.grid(True)\n\n# 显示图表\nplt.show()'
    },
    {
      id: 4,
      title: '项目4：数据分析基础',
      description: '学习使用Pandas进行基本的数据分析',
      codeTemplate: '# 数据分析基础练习\nimport pandas as pd\nimport numpy as np\n\n# 创建销售数据\ndata = {\n    "date": pd.date_range("2024-01-01", periods=30),\n    "sales": np.random.randint(100, 1000, size=30),\n    "profit": np.random.randint(10, 200, size=30)\n}\n\ndf = pd.DataFrame(data)\nprint("销售数据:")\nprint(df.head())\n\n# 计算每日平均销售额和利润\ndaily_avg = df.mean()\nprint("\n每日平均:")\nprint(daily_avg)\n\n# 计算累计销售额\ndf["cumulative_sales"] = df["sales"].cumsum()\nprint("\n累计销售额:")\nprint(df["cumulative_sales"].tail())\n\n# 可视化销售趋势\nimport matplotlib.pyplot as plt\nplt.figure(figsize=(12, 6))\nplt.plot(df["date"], df["sales"], label="每日销售额")\nplt.plot(df["date"], df["cumulative_sales"], label="累计销售额")\nplt.title("销售趋势")\nplt.xlabel("日期")\nplt.ylabel("金额")\nplt.legend()\nplt.grid(True)\nplt.show()'
    },
    {
      id: 5,
      title: '项目5：数据聚合与分组',
      description: '学习使用Pandas进行数据聚合和分组操作',
      codeTemplate: '# 数据聚合与分组练习\nimport pandas as pd\nimport numpy as np\n\n# 创建销售数据\ndata = {\n    "product": ["A", "B", "C", "A", "B", "C", "A", "B", "C"],\n    "region": ["North", "North", "North", "South", "South", "South", "East", "East", "East"],\n    "sales": np.random.randint(100, 1000, size=9),\n    "profit": np.random.randint(10, 200, size=9)\n}\n\ndf = pd.DataFrame(data)\nprint("销售数据:")\nprint(df)\n\n# 按产品分组计算总销售额和利润\nproduct_group = df.groupby("product").agg({"sales": "sum", "profit": "sum"})\nprint("\n按产品分组:")\nprint(product_group)\n\n# 按地区分组计算平均销售额和利润\nregion_group = df.groupby("region").agg({"sales": "mean", "profit": "mean"})\nprint("\n按地区分组:")\nprint(region_group)\n\n# 按产品和地区双重分组\ndouble_group = df.groupby(["product", "region"]).agg({"sales": "sum", "profit": "sum"})\nprint("\n按产品和地区双重分组:")\nprint(double_group)'
    },
    {
      id: 6,
      title: '项目6：数据挖掘与关联分析',
      description: '学习使用mlxtend进行关联规则挖掘',
      codeTemplate: "# 数据挖掘与关联分析练习\nimport pandas as pd\nfrom mlxtend.frequent_patterns import apriori, association_rules\n\n# 创建购物篮数据\ndata = {\n    \"transaction_id\": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],\n    \"milk\": [1, 1, 0, 1, 0, 1, 0, 0, 1, 0],\n    \"bread\": [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],\n    \"eggs\": [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],\n    \"cheese\": [0, 1, 0, 1, 0, 0, 1, 0, 0, 1],\n    \"apples\": [1, 0, 1, 0, 1, 0, 0, 1, 1, 0]\n}\n\ndf = pd.DataFrame(data)\ndf = df.drop(\"transaction_id\", axis=1)\nprint(\"购物篮数据:\")\nprint(df)\n\n# 使用Apriori算法找出频繁项集\nfrequent_itemsets = apriori(df, min_support=0.3, use_colnames=True)\nprint(\"\n频繁项集:\")\nprint(frequent_itemsets)\n\n# 生成关联规则\nrules = association_rules(frequent_itemsets, metric=\"confidence\", min_threshold=0.7)\nprint(\"\n关联规则:\")\nprint(rules[[\"antecedents\", \"consequents\", \"support\", \"confidence\", \"lift\"]])"
    },
    {
      id: 7,
      title: '项目7：机器学习基础',
      description: '学习使用scikit-learn进行简单的机器学习建模',
      codeTemplate: "# 机器学习基础练习\nimport pandas as pd\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# 创建模拟数据\nnp.random.seed(42)\nX = np.random.rand(100, 1) * 10\ny = 2 * X + 3 + np.random.randn(100, 1) * 2\n\n# 转换为DataFrame\ndf = pd.DataFrame({\"X\": X.flatten(), \"y\": y.flatten()})\nprint(\"模拟数据:\")\nprint(df.head())\n\n# 分割训练集和测试集\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 创建线性回归模型\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\n# 预测\ny_pred = model.predict(X_test)\n\n# 评估模型\nmse = mean_squared_error(y_test, y_pred)\nr2 = r2_score(y_test, y_pred)\nprint(\"\n模型评估:\")\nprint(f\"均方误差: {mse:.2f}\")\nprint(f\"R²评分: {r2:.2f}\")\nprint(f\"模型系数: {model.coef_[0][0]:.2f}\")\nprint(f\"截距: {model.intercept_[0]:.2f}\")\n\n# 可视化结果\nimport matplotlib.pyplot as plt\nplt.figure(figsize=(10, 6))\nplt.scatter(X_train, y_train, color=\"blue\", label=\"训练数据\")\nplt.scatter(X_test, y_test, color=\"green\", label=\"测试数据\")\nplt.plot(X, model.predict(X), color=\"red\", label=\"回归直线\")\nplt.title(\"线性回归模型\")\nplt.xlabel(\"X\")\nplt.ylabel(\"y\")\nplt.legend()\nplt.grid(True)\nplt.show()"
    },
    {
      id: 8,
      title: '项目8：数据可视化进阶',
      description: '学习使用Seaborn创建更高级的数据可视化图表',
      codeTemplate: '# 数据可视化进阶练习\nimport pandas as pd\nimport numpy as np\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# 设置Seaborn样式\nsns.set(style="whitegrid")\n\n# 创建示例数据\nnp.random.seed(42)\ndata = {\n    "category": np.repeat(["A", "B", "C", "D"], 25),\n    "value": np.random.randn(100) * 10 + np.repeat([10, 20, 30, 40], 25),\n    "group": np.tile(["X", "Y"], 50)\n}\n\ndf = pd.DataFrame(data)\nprint("示例数据:")\nprint(df.head())\n\n# 箱线图\nplt.figure(figsize=(10, 6))\nsns.boxplot(x="category", y="value", hue="group", data=df)\nplt.title("箱线图")\nplt.show()\n\n# 小提琴图\nplt.figure(figsize=(10, 6))\nsns.violinplot(x="category", y="value", hue="group", data=df, split=True)\nplt.title("小提琴图")\nplt.show()\n\n# 热力图\n# 创建相关矩阵\ncorr_matrix = df.pivot_table(index="category", columns="group", values="value").corr()\nplt.figure(figsize=(8, 6))\nsns.heatmap(corr_matrix, annot=True, cmap="coolwarm")\nplt.title("热力图")\nplt.show()\n\n# 散点图\nplt.figure(figsize=(10, 6))\nsns.scatterplot(x="category", y="value", hue="group", size="value", data=df)\nplt.title("散点图")\nplt.show()'
    },
    {
      id: 9,
      title: '项目9：时间序列分析',
      description: '学习使用Pandas进行时间序列数据分析',
      codeTemplate: '# 时间序列分析练习\nimport pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\n\n# 创建时间序列数据\ndate_range = pd.date_range("2024-01-01", periods=365, freq="D")\n\n# 创建趋势、季节和噪声\ntrend = np.linspace(0, 100, 365)\nseasonal = 20 * np.sin(2 * np.pi * np.arange(365) / 7)  # 周季节性\nnoise = np.random.randn(365) * 5\n\n# 组合数据\nvalues = trend + seasonal + noise\n\ndf = pd.DataFrame({"date": date_range, "value": values})\ndf.set_index("date", inplace=True)\nprint("时间序列数据:")\nprint(df.head())\n\n# 绘制时间序列\nplt.figure(figsize=(12, 6))\nplt.plot(df.index, df["value"])\nplt.title("时间序列数据")\nplt.xlabel("日期")\nplt.ylabel("值")\nplt.grid(True)\nplt.show()\n\n# 计算移动平均\ndf["moving_average_7"] = df["value"].rolling(window=7).mean()\ndf["moving_average_30"] = df["value"].rolling(window=30).mean()\n\n# 绘制移动平均\nplt.figure(figsize=(12, 6))\nplt.plot(df.index, df["value"], label="原始数据")\nplt.plot(df.index, df["moving_average_7"], label="7天移动平均")\nplt.plot(df.index, df["moving_average_30"], label="30天移动平均")\nplt.title("移动平均分析")\nplt.xlabel("日期")\nplt.ylabel("值")\nplt.legend()\nplt.grid(True)\nplt.show()\n\n# 计算月度统计\nmonthly_stats = df.resample("M").agg({"value": ["mean", "std", "min", "max"]})\nprint("\n月度统计:")\nprint(monthly_stats)'
    },
    {
      id: 10,
      title: '项目10：综合数据分析项目',
      description: '综合运用所学知识进行完整的数据分析',
      codeTemplate: '# 综合数据分析项目\nimport pandas as pd\nimport numpy as np\nimport seaborn as sns\nimport matplotlib.pyplot as plt\nfrom sklearn.cluster import KMeans\n\n# 创建综合数据集\nnp.random.seed(42)\ndata = {\n    "customer_id": range(1, 101),\n    "age": np.random.randint(18, 70, size=100),\n    "income": np.random.randint(30000, 150000, size=100),\n    "spending_score": np.random.randint(1, 100, size=100),\n    "purchase_frequency": np.random.randint(1, 50, size=100)\n}\n\ndf = pd.DataFrame(data)\nprint("客户数据:")\nprint(df.head())\n\n# 数据探索\nprint("\n数据描述:")\nprint(df.describe())\n\n# 相关性分析\ncorr_matrix = df.corr()\nplt.figure(figsize=(10, 8))\nsns.heatmap(corr_matrix, annot=True, cmap="coolwarm")\nplt.title("相关性热力图")\nplt.show()\n\n# 客户分群（K-means聚类）\nX = df[["income", "spending_score"]]\nkmeans = KMeans(n_clusters=4, random_state=42)\ndf["cluster"] = kmeans.fit_predict(X)\n\n# 可视化聚类结果\nplt.figure(figsize=(10, 6))\nsns.scatterplot(x="income", y="spending_score", hue="cluster", data=df, palette="viridis")\nplt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1], s=300, c="red", label="聚类中心")\nplt.title("客户分群结果")\nplt.xlabel("收入")\nplt.ylabel("消费评分")\nplt.legend()\nplt.grid(True)\nplt.show()\n\n# 分析各聚类的特征\ncluster_analysis = df.groupby("cluster").agg({"age": "mean", "income": "mean", "spending_score": "mean", "purchase_frequency": "mean"})\nprint("\n聚类分析:")\nprint(cluster_analysis)'
    }
  ];

  const currentProject = projects.find(p => p.id === parseInt(courseId || '1')) || projects[0];

  // 加载代码草稿
  useEffect(() => {
    const draft = getCodeDraft(courseId || '1');
    if (draft) {
      setCode(draft);
    } else {
      setCode(currentProject.codeTemplate);
    }
  }, [courseId, currentProject.codeTemplate]);

  // 保存代码草稿
  useEffect(() => {
    const timer = setTimeout(() => {
      saveCodeDraft(courseId || '1', code);
    }, 1000);
    return () => clearTimeout(timer);
  }, [code, courseId]);

  const handleRunCode = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    setChart(null);

    try {
      // 运行Python代码
      const result = await runPythonCode(code);
      if (result.success) {
        setOutput(result.result?.toString() || '代码执行成功');
        
        // 尝试生成图表
        const chartResult = await generateChart(code);
        if (chartResult.success && chartResult.chart) {
          setChart(chartResult.chart);
        }
      } else {
        setError(result.error || '代码执行失败');
      }
    } catch (err) {
      setError('执行代码时发生错误');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    // 保存项目进度
    saveProjectProgress(courseId || '1', {
      code,
      completed: true
    });
    
    // 显示成功消息
    alert('项目已完成！');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 课程导航 */}
      <section className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to={`/course/${courseId}`} className="flex items-center hover:text-green-400 transition-colors">
              <ChevronLeft className="h-5 w-5 mr-2" />
              <span>返回项目</span>
            </Link>
            <h2 className="text-lg font-medium">{currentProject.title}</h2>
            <div className="w-24"></div> {/* 占位，保持标题居中 */}
          </div>
        </div>
      </section>

      {/* 学习内容 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row">
            {/* 左侧代码编辑器 */}
            <div className="lg:w-2/3 mb-8 lg:mb-0 lg:pr-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    代码编辑器
                  </h3>
                  <button
                    onClick={handleRunCode}
                    disabled={loading || pyodideLoading}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        运行中...
                      </>
                    ) : pyodideLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        加载环境...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        运行代码
                      </>
                    )}
                  </button>
                </div>
                
                {pyodideLoading && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                    <Loader2 className="h-5 w-5 text-blue-600 mr-3 animate-spin" />
                    <span className="text-blue-800">正在加载Python环境，请稍候...</span>
                  </div>
                )}
                
                {/* Monaco Editor */}
                <div className="h-96">
                  <Editor
                    height="100%"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true
                    }}
                  />
                </div>
              </div>

              {/* 输出结果 */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2" />
                  运行结果
                </h3>
                
                {/* 错误信息 */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
                    <pre className="whitespace-pre-wrap">{error}</pre>
                  </div>
                )}
                
                {/* 输出信息 */}
                {output && (
                  <div className="bg-gray-50 border border-gray-200 text-gray-700 p-4 rounded-lg mb-4">
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </div>
                )}
                
                {/* 图表 */}
                {chart && (
                  <div className="mt-4">
                    <img src={chart} alt="图表" className="max-w-full h-auto" />
                  </div>
                )}
              </div>

              {/* 项目提交 */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-900 hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
                >
                  <Check className="h-4 w-4 mr-2" />
                  完成项目
                </button>
              </div>
            </div>

            {/* 右侧项目信息 */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">项目信息</h3>
                <p className="text-gray-600 mb-6">{currentProject.description}</p>
                
                <h4 className="font-semibold mb-2">学习目标</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                  {currentProject.id === 1 && [
                    '掌握Python基本语法',
                    '理解变量和数据类型',
                    '学会使用条件语句和循环',
                    '能够编写简单的Python程序'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 2 && [
                    '了解Pandas库的基本使用',
                    '学会创建和操作DataFrame',
                    '掌握数据清洗的基本方法',
                    '能够计算基本统计信息'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 3 && [
                    '了解Matplotlib库的基本使用',
                    '学会创建基本图表',
                    '掌握图表的美化方法',
                    '能够可视化数据'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 4 && [
                    '掌握Pandas的基本数据分析功能',
                    '学会计算基本统计指标',
                    '理解累计计算的应用',
                    '能够可视化时间序列数据'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 5 && [
                    '掌握数据聚合和分组操作',
                    '学会使用groupby进行数据分组',
                    '理解多级分组的应用',
                    '能够分析不同维度的数据'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 6 && [
                    '了解关联规则挖掘的基本概念',
                    '学会使用Apriori算法找出频繁项集',
                    '理解关联规则的生成和评估',
                    '能够分析购物篮数据'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 7 && [
                    '了解机器学习的基本概念',
                    '学会使用scikit-learn构建线性回归模型',
                    '掌握模型评估的基本指标',
                    '能够可视化模型结果'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 8 && [
                    '了解Seaborn库的基本使用',
                    '学会创建箱线图、小提琴图等高级图表',
                    '掌握热力图的应用',
                    '能够创建更美观的数据可视化'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 9 && [
                    '了解时间序列分析的基本概念',
                    '学会处理时间序列数据',
                    '掌握移动平均的计算和应用',
                    '能够分析时间序列的趋势和季节性'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                  {currentProject.id === 10 && [
                    '综合运用所学的数据分析知识',
                    '学会使用K-means进行客户分群',
                    '掌握相关性分析和可视化',
                    '能够完成完整的数据分析项目'
                  ].map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
                
                <h4 className="font-semibold mb-2">提示</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    {currentProject.id === 1 && '尝试修改代码，添加更多变量和条件语句，观察输出结果的变化。'}
                    {currentProject.id === 2 && '尝试添加更多数据列，并使用不同的方法处理缺失值。'}
                    {currentProject.id === 3 && '尝试修改图表类型，例如使用散点图或柱状图。'}
                    {currentProject.id === 4 && '尝试修改随机种子，生成不同的销售数据，并分析其趋势。'}
                    {currentProject.id === 5 && '尝试添加更多的产品和地区，或者使用不同的聚合函数进行分析。'}
                    {currentProject.id === 6 && '尝试调整支持度和置信度的阈值，观察关联规则的变化。'}
                    {currentProject.id === 7 && '尝试使用不同的机器学习算法，例如岭回归或LASSO回归。'}
                    {currentProject.id === 8 && '尝试使用不同的Seaborn样式和颜色方案，美化图表。'}
                    {currentProject.id === 9 && '尝试添加不同的季节性模式，例如月季节性或年季节性。'}
                    {currentProject.id === 10 && '尝试使用不同的聚类数量，观察客户分群结果的变化。'}
                  </p>
                </div>
              </div>

              {/* AI陪练 */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">AI陪练</h3>
                <p className="text-gray-600 mb-4">遇到问题？点击下方按钮获取AI教练的帮助。</p>
                <div className="space-y-3">
                  <button 
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const result = await getHint(courseId || '1', code, '我在做这个项目时遇到了困难，需要思路点拨');
                        if (result.success && result.data?.choices[0]?.message?.content) {
                          alert(result.data.choices[0].message.content);
                          // 保存聊天记录
                          const messages = getChatMessages(`project-${courseId || '1'}`);
                          saveChatMessages(`project-${courseId || '1'}`, [
                            ...messages,
                            { role: 'user', content: '我在做这个项目时遇到了困难，需要思路点拨', timestamp: Date.now() },
                            { role: 'assistant', content: result.data.choices[0].message.content, timestamp: Date.now() }
                          ]);
                        }
                      } catch (error) {
                        console.error('获取思路点拨失败:', error);
                        alert('获取思路点拨失败，请稍后重试');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-2 px-4 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    思路点拨
                  </button>
                  <button 
                    onClick={async () => {
                      if (error) {
                        setLoading(true);
                        try {
                          const result = await getCodeCorrection(courseId || '1', code, error);
                          if (result.success && result.data?.choices[0]?.message?.content) {
                            alert(result.data.choices[0].message.content);
                            // 保存聊天记录
                            const messages = getChatMessages(`project-${courseId || '1'}`);
                            saveChatMessages(`project-${courseId || '1'}`, [
                              ...messages,
                              { role: 'user', content: `我的代码报错：${error}\n\n代码：\n${code}`, timestamp: Date.now() },
                              { role: 'assistant', content: result.data.choices[0].message.content, timestamp: Date.now() }
                            ]);
                          }
                        } catch (error) {
                          console.error('获取代码纠错失败:', error);
                          alert('获取代码纠错失败，请稍后重试');
                        } finally {
                          setLoading(false);
                        }
                      } else {
                        alert('请先运行代码，查看是否有错误');
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-2 px-4 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    代码纠错
                  </button>
                  <button 
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const result = await getHint(courseId || '1', code, '请解释这个项目涉及的主要知识点');
                        if (result.success && result.data?.choices[0]?.message?.content) {
                          alert(result.data.choices[0].message.content);
                          // 保存聊天记录
                          const messages = getChatMessages(`project-${courseId || '1'}`);
                          saveChatMessages(`project-${courseId || '1'}`, [
                            ...messages,
                            { role: 'user', content: '请解释这个项目涉及的主要知识点', timestamp: Date.now() },
                            { role: 'assistant', content: result.data.choices[0].message.content, timestamp: Date.now() }
                          ]);
                        }
                      } catch (error) {
                        console.error('获取知识点解释失败:', error);
                        alert('获取知识点解释失败，请稍后重试');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="w-full bg-blue-100 hover:bg-blue-200 text-blue-900 font-medium py-2 px-4 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    知识点解释
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Learn;
