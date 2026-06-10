import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Play, RotateCcw, Loader2, AlertCircle, BarChart2, BookOpen, Target, Users, Clock } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { initPyodide, runPythonCode, generateChart } from '../utils/pyodide';

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: '初级' | '中级' | '高级';
  duration: string;
  scenarios: string[];
  background: string;
  requirements: string[];
  codeTemplate: string;
}

const projectsData: Record<number, Project> = {
  1: {
    id: 1,
    title: '零基础商务数据清洗实战',
    description: '以电商零售订单原始数据集为载体，完成企业级全流程数据清洗',
    difficulty: '初级',
    duration: '2-3小时',
    scenarios: ['数据导入', '脏数据检测', '分层清洗', '数据合规校验', '标准化输出'],
    background: '某电商平台需要对原始订单数据进行清洗处理，为后续分析提供可靠数据源。',
    requirements: [
      '数据导入：读取CSV格式原始订单数据',
      '脏数据检测：批量查找重复订单、空值、异常数据',
      '分层清洗处理：缺失值、重复值、异常值分别处理',
      '数据合规校验：统计数据完整率、有效率',
      '输出标准化干净数据集'
    ],
    codeTemplate: `# 测试Python环境
print("Python环境测试")
print("=" * 30)

# 测试基础Python
print("1. 基础Python测试:")
print(f"   2 + 3 = {2 + 3}")
print(f"   'Hello' + ' World' = {'Hello' + ' World'}")
print()

# 测试numpy
import numpy as np
print("2. NumPy测试:")
arr = np.array([1, 2, 3, 4, 5])
print(f"   创建数组: {arr}")
print(f"   数组求和: {np.sum(arr)}")
print(f"   数组均值: {np.mean(arr)}")
print()

# 测试pandas
import pandas as pd
print("3. Pandas测试:")
data = {'姓名': ['张三', '李四', '王五'], '年龄': [25, 30, 35]}
df = pd.DataFrame(data)
print("   创建DataFrame:")
print(df)
print()

print("测试完成！Python环境正常工作。")`
  },
  2: {
    id: 2,
    title: '电商销售多维分组聚合分析',
    description: '基于清洗后的电商订单数据，开展多维商务分组聚合分析',
    difficulty: '初级',
    duration: '1-2小时',
    scenarios: ['时间维度聚合', '商品维度聚合', '区域维度聚合', '复合维度分析', '透视表汇总'],
    background: '某电商平台需要全面分析销售数据，从时间、商品、区域等多个维度了解销售状况。',
    requirements: [
      '时间维度聚合：按日、周、月分组统计订单量、销售额',
      '商品维度聚合：按商品品类、单品分组统计销量',
      '区域维度聚合：按收货地区分组统计销售贡献',
      '复合维度聚合：多维度交叉分析',
      '通过透视表汇总核心指标'
    ],
    codeTemplate: `import pandas as pd
import numpy as np

# 创建模拟销售数据
data = {
    '日期': ['2024-01-01', '2024-01-01', '2024-01-02', '2024-01-02', '2024-01-03', '2024-01-03'],
    '品类': ['电子产品', '服装', '电子产品', '食品', '服装', '食品'],
    '区域': ['华东', '华南', '华北', '华东', '华南', '华北'],
    '销售额': [1200, 800, 1500, 600, 900, 700],
    '订单数': [3, 2, 4, 3, 2, 3]
}

df = pd.DataFrame(data)
print("原始销售数据:")
print(df)
print()

# 按品类分组聚合
category_group = df.groupby('品类').agg({
    '销售额': ['sum', 'mean'],
    '订单数': 'sum'
})
print("按品类分组统计:")
print(category_group)
print()

# 按区域分组聚合
region_group = df.groupby('区域').agg({
    '销售额': 'sum',
    '订单数': 'sum'
})
print("按区域分组统计:")
print(region_group)
print()

# 复合维度分析：品类+区域
multi_group = df.groupby(['品类', '区域']).sum()
print("品类+区域复合维度分析:")
print(multi_group)
print()

# 透视表汇总
pivot = pd.pivot_table(df, values='销售额', index='品类', columns='区域', aggfunc='sum', fill_value=0)
print("透视表汇总:")
print(pivot)`
  },
  3: {
    id: 3,
    title: '超市商品购物篮关联分析',
    description: '采用超市线下交易数据集，实现经典购物篮分析',
    difficulty: '中级',
    duration: '2-3小时',
    scenarios: ['数据预处理', 'Apriori算法建模', '指标筛选', '业务解读', '运营策略输出'],
    background: '某连锁超市需要分析顾客购物篮中的商品关联关系，找出经常一起购买的商品组合。',
    requirements: [
      '数据预处理：将订单数据转换为事务型购物篮数据',
      'Apriori算法建模：挖掘商品关联组合',
      '指标筛选：通过支持度、置信度、提升度筛选',
      '业务解读：分析高频搭配商品的关联关系',
      '输出运营策略：商品陈列优化、捆绑套餐设计'
    ],
    codeTemplate: `import pandas as pd
from collections import defaultdict

# 模拟购物篮数据（事务型数据）
transactions = [
    {'牛奶', '面包', '鸡蛋'},
    {'面包', '鸡蛋', '可乐'},
    {'牛奶', '面包'},
    {'牛奶', '鸡蛋', '可乐'},
    {'面包', '可乐'},
    {'牛奶', '面包', '鸡蛋', '可乐'}
]

print("购物篮事务数据:")
for i, trans in enumerate(transactions, 1):
    print(f"订单{i}: {', '.join(trans)}")
print()

# 计算单项商品支持度
total_transactions = len(transactions)
item_counts = defaultdict(int)

for trans in transactions:
    for item in trans:
        item_counts[item] += 1

print("单项商品支持度:")
for item, count in item_counts.items():
    support = count / total_transactions
    print(f"{item}: {support:.2f}")
print()

# 生成频繁项集（示例：计算2项集）
min_support = 0.3
two_itemsets = defaultdict(int)

for trans in transactions:
    items = list(trans)
    for i in range(len(items)):
        for j in range(i+1, len(items)):
            pair = tuple(sorted([items[i], items[j]]))
            two_itemsets[pair] += 1

print("二项频繁项集（支持度 >= 0.3）:")
for pair, count in two_itemsets.items():
    support = count / total_transactions
    if support >= min_support:
        print(f"{pair}: 支持度={support:.2f}")`
  },
  4: {
    id: 4,
    title: '零售客户价值聚类分群',
    description: '通过无监督聚类实现精准客户分群，适配私域运营场景',
    difficulty: '中级',
    duration: '2-3小时',
    scenarios: ['RFM特征构建', '数据标准化', 'K-Means聚类', '群体画像', '差异化运营策略'],
    background: '某零售企业需要根据用户消费行为数据对客户进行分群，制定精准化运营策略。',
    requirements: [
      '特征构建：计算RFM三大核心特征',
      '数据标准化：消除量纲影响',
      '模型训练：K-Means聚类分群',
      '群体画像：对每一类客户进行定义',
      '输出差异化运营策略'
    ],
    codeTemplate: `import pandas as pd
import numpy as np

# 模拟客户RFM数据
data = {
    '客户ID': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008'],
    'R_最近购买天数': [5, 30, 5, 10, 45, 2, 60, 15],
    'F_购买频次': [10, 3, 15, 8, 2, 20, 1, 6],
    'M_购买金额': [5000, 1000, 8000, 3000, 500, 12000, 200, 2500]
}

df = pd.DataFrame(data)
print("原始RFM数据:")
print(df)
print()

# 计算RFM评分（1-5分）- 使用rank方法避免qcut的重复值问题
# R越近越好（天数越少评分越高），F和M越大越好

# R评分：最近购买天数，越小越好
df['R_score'] = pd.cut(df['R_最近购买天数'], 
                       bins=[-1, 10, 20, 30, 45, 100], 
                       labels=[5, 4, 3, 2, 1]).astype(int)

# F评分：购买频次，越大越好
df['F_score'] = pd.cut(df['F_购买频次'], 
                       bins=[0, 3, 6, 10, 15, 100], 
                       labels=[1, 2, 3, 4, 5]).astype(int)

# M评分：购买金额，越大越好
df['M_score'] = pd.cut(df['M_购买金额'], 
                       bins=[0, 1000, 3000, 6000, 10000, 100000], 
                       labels=[1, 2, 3, 4, 5]).astype(int)

# 计算RFM总分
df['RFM_total'] = df['R_score'] + df['F_score'] + df['M_score']

print("RFM评分结果:")
print(df[['客户ID', 'R_score', 'F_score', 'M_score', 'RFM_total']])
print()

# 根据RFM总分进行客户分层
def get_customer_level(row):
    if row['RFM_total'] >= 12:
        return '高价值客户'
    elif row['RFM_total'] >= 9:
        return '潜力客户'
    elif row['RFM_total'] >= 6:
        return '一般客户'
    else:
        return '低价值客户'

df['客户层级'] = df.apply(get_customer_level, axis=1)
print("客户分层结果:")
print(df[['客户ID', 'RFM_total', '客户层级']])`
  },
  5: {
    id: 5,
    title: '商务数据可视化大屏分析',
    description: '整合前期销售、客户数据，制作全套商务可视化图表，输出可直接汇报的数据分析报告',
    difficulty: '初级',
    duration: '1-2小时',
    scenarios: ['趋势可视化', '占比可视化', '对比可视化', '分布可视化', '完整分析报告'],
    background: '某企业需要制作一套完整的商务数据可视化大屏，用于管理层决策汇报。',
    requirements: [
      '趋势可视化：销售趋势、用户增长等时间序列展示',
      '占比可视化：各类别占比、市场份额等饼图展示',
      '对比可视化：不同维度数据对比分析',
      '分布可视化：数据分布特征展示',
      '制作完整的数据分析报告'
    ],
    codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 模拟销售数据
months = ['1月', '2月', '3月', '4月', '5月', '6月']
sales = [120, 150, 135, 180, 200, 220]

# 创建折线图 - 销售趋势
plt.figure(figsize=(10, 5))
plt.plot(months, sales, marker='o', color='blue', linewidth=2)
plt.title('月度销售趋势', fontsize=14)
plt.xlabel('月份')
plt.ylabel('销售额（万元）')
plt.grid(True, alpha=0.3)
plt.tight_layout()

# 保存并显示图表
import io
import base64
buffer = io.BytesIO()
plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight', facecolor='white')
buffer.seek(0)
img_str = base64.b64encode(buffer.read()).decode('utf-8')
plt.close()

print("销售趋势图表已生成")
print("图表Base64编码长度:", len(img_str))
print()

# 品类销售占比数据
categories = ['电子产品', '服装', '食品', '家居']
category_sales = [450, 320, 280, 150]

plt.figure(figsize=(8, 8))
plt.pie(category_sales, labels=categories, autopct='%1.1f%%', startangle=90)
plt.title('品类销售占比', fontsize=14)
plt.axis('equal')

buffer2 = io.BytesIO()
plt.savefig(buffer2, format='png', dpi=150, bbox_inches='tight', facecolor='white')
buffer2.seek(0)
img_str2 = base64.b64encode(buffer2.read()).decode('utf-8')
plt.close()

print("品类占比饼图已生成")
print("图表Base64编码长度:", len(img_str2))`
  },
  6: {
    id: 6,
    title: '电商页面改版A/B测试分析',
    description: '基于电商页面改版测试数据，完成完整A/B测试分析，判定改版效果是否有效',
    difficulty: '中级',
    duration: '2-3小时',
    scenarios: ['数据预处理', '指标计算', '统计检验', '结果分析', '决策建议输出'],
    background: '某电商平台进行了首页改版A/B测试，需要分析测试结果，判断改版是否有效。',
    requirements: [
      '数据预处理：清洗测试数据，筛选有效样本',
      '指标计算：计算点击率、转化率、平均停留时间等核心指标',
      '统计检验：进行假设检验，判断差异是否显著',
      '结果分析：分析测试结果，解读业务含义',
      '输出决策建议：给出是否上线新版本的建议'
    ],
    codeTemplate: `import pandas as pd
import numpy as np

# 模拟A/B测试数据
data = {
    '组别': ['A'] * 1000 + ['B'] * 1000,
    '是否转化': [1]*120 + [0]*880 + [1]*150 + [0]*850
}

df = pd.DataFrame(data)
print("A/B测试数据概览:")
print(df.groupby('组别')['是否转化'].count())
print()

# 计算转化率
conversion = df.groupby('组别')['是否转化'].agg(['sum', 'count'])
conversion['转化率'] = conversion['sum'] / conversion['count']
print("转化率统计:")
print(conversion)
print()

# 计算差值和相对提升
a_conv = conversion.loc['A', '转化率']
b_conv = conversion.loc['B', '转化率']
diff = b_conv - a_conv
lift = diff / a_conv

print(f"A组转化率: {a_conv:.2%}")
print(f"B组转化率: {b_conv:.2%}")
print(f"差值: {diff:.2%}")
print(f"相对提升: {lift:.2%}")
print()

# 手动计算卡方检验
def chi_square_test(obs):
    # 计算期望值
    row_totals = [sum(row) for row in obs]
    col_totals = [sum(col) for col in zip(*obs)]
    total = sum(row_totals)
    
    expected = []
    for i in range(len(obs)):
        row = []
        for j in range(len(obs[0])):
            e = (row_totals[i] * col_totals[j]) / total
            row.append(e)
        expected.append(row)
    
    # 计算卡方值
    chi2 = 0
    for i in range(len(obs)):
        for j in range(len(obs[0])):
            if expected[i][j] > 0:
                chi2 += (obs[i][j] - expected[i][j])**2 / expected[i][j]
    
    # 自由度
    dof = (len(obs)-1) * (len(obs[0])-1)
    return chi2, dof

obs = [[conversion.loc['A', 'sum'], conversion.loc['A', 'count'] - conversion.loc['A', 'sum']],
       [conversion.loc['B', 'sum'], conversion.loc['B', 'count'] - conversion.loc['B', 'sum']]]

chi2, dof = chi_square_test(obs)
print(f"卡方值: {chi2:.4f}")
print(f"自由度: {dof}")
print(f"卡方临界值(0.05): 3.841")
print(f"显著性结论: {'显著' if chi2 > 3.841 else '不显著'}")`
  },
  7: {
    id: 7,
    title: '商品销量时间序列预测分析',
    description: '基于3年商品历史销量数据，完成时序分析与未来销量预测，支撑库存备货决策',
    difficulty: '高级',
    duration: '3-4小时',
    scenarios: ['时序数据规整', '时序特征分析', 'Prophet模型训练', '预测与评估', '库存优化建议'],
    background: '某零售企业需要根据历史销售数据预测未来销量，为库存备货提供决策支持。',
    requirements: [
      '数据规整：处理时序数据，确保时间连续性',
      '特征分析：分析趋势、季节性、周期性',
      '模型训练：使用Prophet进行销量预测',
      '模型评估：评估预测精度',
      '输出库存优化建议'
    ],
    codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 生成模拟时序数据（带趋势和季节性）
dates = pd.date_range(start='2024-01-01', periods=12, freq='M')
trend = np.arange(12) * 50
seasonality = 100 * np.sin(np.arange(12) * 2 * np.pi / 12)
noise = np.random.normal(0, 20, 12)
sales = 500 + trend + seasonality + noise

df = pd.DataFrame({'日期': dates, '销量': sales.round().astype(int)})
df['月份'] = df['日期'].dt.month
print("历史销量数据:")
print(df[['日期', '销量']])
print()

# 分析趋势
print("趋势分析:")
print(f"首月销量: {df['销量'].iloc[0]}")
print(f"末月销量: {df['销量'].iloc[-1]}")
print(f"月均增长: {(df['销量'].iloc[-1] - df['销量'].iloc[0])/11:.1f}")
print()

# 移动平均预测
df['MA3'] = df['销量'].rolling(3).mean()
df['预测'] = df['MA3'].shift(-1)
print("移动平均预测结果:")
print(df[['日期', '销量', 'MA3', '预测']])
print()

# 绘制趋势图
plt.figure(figsize=(10, 5))
plt.plot(df['日期'], df['销量'], marker='o', label='实际销量')
plt.plot(df['日期'], df['MA3'], label='3期移动平均', color='red')
plt.title('销量趋势与移动平均', fontsize=14)
plt.xlabel('日期')
plt.ylabel('销量')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()

import io
buffer = io.BytesIO()
plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight', facecolor='white')
buffer.seek(0)
img_str = buffer.read()
plt.close()
print("趋势图表已生成")`
  },
  8: {
    id: 8,
    title: '营销数据高阶特征工程实战',
    description: '基于用户营销行为原始数据，从零构建高质量分析特征，适配建模与深度分析',
    difficulty: '高级',
    duration: '3-4小时',
    scenarios: ['时间特征提取', '统计特征构造', '业务特征构造', '特征预处理', '特征筛选'],
    background: '某营销团队需要构建高质量特征用于用户行为分析和预测建模。',
    requirements: [
      '时间特征：提取小时、星期、节假日等时间相关特征',
      '统计特征：构建均值、方差、百分位数等统计特征',
      '业务特征：基于业务逻辑构造转化率、复购率等指标',
      '特征预处理：缺失值处理、标准化、编码',
      '特征筛选：通过相关性分析筛选有效特征'
    ],
    codeTemplate: `import pandas as pd
import numpy as np

# 模拟用户行为数据
data = {
    '用户ID': ['U001', 'U002', 'U003', 'U004', 'U005'],
    '注册时间': ['2024-01-15 09:30:00', '2024-02-20 14:45:00', '2024-03-10 11:20:00', '2024-01-25 16:00:00', '2024-02-05 08:15:00'],
    '访问次数': [15, 25, 8, 30, 12],
    '页面浏览量': [45, 80, 25, 100, 35],
    '停留时长': [300, 500, 180, 600, 240],
    '是否购买': [1, 1, 0, 1, 0],
    '购买金额': [200, 500, 0, 800, 0]
}

df = pd.DataFrame(data)
df['注册时间'] = pd.to_datetime(df['注册时间'])
print("原始数据:")
print(df)
print()

# 时间特征提取
df['注册小时'] = df['注册时间'].dt.hour
df['注册星期'] = df['注册时间'].dt.dayofweek
df['注册月份'] = df['注册时间'].dt.month
df['是否工作日'] = (df['注册星期'] < 5).astype(int)

print("时间特征:")
print(df[['用户ID', '注册小时', '注册星期', '注册月份', '是否工作日']])
print()

# 统计特征构造
df['平均浏览时长'] = df['停留时长'] / df['页面浏览量']
df['访问频率'] = df['访问次数'] / 30  # 按月计算

print("统计特征:")
print(df[['用户ID', '平均浏览时长', '访问频率']])
print()

# 业务特征构造
df['转化率'] = df['是否购买']
df['客单价'] = df['购买金额'].where(df['是否购买'] == 1, 0)

print("业务特征:")
print(df[['用户ID', '转化率', '客单价']])`
  },
  9: {
    id: 9,
    title: '商务数据异常值检测与风险分析',
    description: '针对电商订单、交易数据开展异常值检测，识别业务风险与数据问题',
    difficulty: '高级',
    duration: '2-3小时',
    scenarios: ['数值异常检测', '行为异常检测', '数据异常处理', '风险归因', '风控优化建议'],
    background: '某电商平台需要对订单交易数据进行异常值检测，识别潜在的业务风险和数据质量问题。',
    requirements: [
      '数值异常：检测金额、数量等字段的异常值',
      '行为异常：识别异常的用户行为模式',
      '数据异常处理：制定异常处理策略',
      '风险归因：分析异常产生的原因',
      '输出风控优化建议'
    ],
    codeTemplate: `import pandas as pd
import numpy as np

# 模拟订单数据（包含异常值）
data = {
    '订单ID': ['ORD001', 'ORD002', 'ORD003', 'ORD004', 'ORD005', 'ORD006', 'ORD007', 'ORD008'],
    '用户ID': ['U001', 'U002', 'U003', 'U004', 'U005', 'U006', 'U007', 'U008'],
    '金额': [100.0, 200.0, 50000.0, 150.0, -50.0, 300.0, 10000.0, 250.0],
    '数量': [1, 2, 100, 1, -1, 3, 50, 2],
    '支付方式': ['支付宝', '微信', '支付宝', '微信', '支付宝', '微信', '支付宝', '微信']
}

df = pd.DataFrame(data)
print("原始订单数据:")
print(df)
print()

# 方法1：Z-score检测异常值
def detect_outliers_zscore(data, threshold=3):
    mean = np.mean(data)
    std = np.std(data)
    z_scores = (data - mean) / std
    return np.abs(z_scores) > threshold

df['金额异常_Zscore'] = detect_outliers_zscore(df['金额'])
df['数量异常_Zscore'] = detect_outliers_zscore(df['数量'])

print("Z-score异常检测结果:")
print(df[['订单ID', '金额', '金额异常_Zscore', '数量', '数量异常_Zscore']])
print()

# 方法2：IQR检测异常值
def detect_outliers_iqr(data):
    q1 = np.percentile(data, 25)
    q3 = np.percentile(data, 75)
    iqr = q3 - q1
    lower_bound = q1 - 1.5 * iqr
    upper_bound = q3 + 1.5 * iqr
    return (data < lower_bound) | (data > upper_bound)

df['金额异常_IQR'] = detect_outliers_iqr(df['金额'])
df['数量异常_IQR'] = detect_outliers_iqr(df['数量'])

print("IQR异常检测结果:")
print(df[['订单ID', '金额', '金额异常_IQR', '数量', '数量异常_IQR']])
print()

# 检测负值异常
df['金额负值异常'] = df['金额'] < 0
df['数量负值异常'] = df['数量'] < 0

print("负值异常检测结果:")
print(df[['订单ID', '金额', '金额负值异常', '数量', '数量负值异常']])`
  },
  10: {
    id: 10,
    title: '多源商务数据集合并与整合分析',
    description: '整合电商多维度独立数据集，搭建完整用户-订单-商品-渠道全维度分析库',
    difficulty: '中级',
    duration: '2-3小时',
    scenarios: ['数据源准备', '纵向拼接', '横向关联', '数据规整', '全链路复盘分析'],
    background: '某电商企业需要整合分散在多个系统中的数据，构建统一的分析数据仓库。',
    requirements: [
      '数据源准备：收集用户、订单、商品、渠道等多源数据',
      '纵向拼接：合并不同时间段的数据',
      '横向关联：通过主键关联各数据表',
      '数据规整：处理不一致、缺失值等问题',
      '全链路分析：从用户到订单到商品的完整分析'
    ],
    codeTemplate: `import pandas as pd
import numpy as np

# 用户数据集
users = pd.DataFrame({
    '用户ID': ['U001', 'U002', 'U003', 'U004'],
    '姓名': ['张三', '李四', '王五', '赵六'],
    '注册时间': ['2024-01-01', '2024-01-05', '2024-01-10', '2024-01-15'],
    '等级': ['VIP', '普通', 'VIP', '普通']
})

# 订单数据集
orders = pd.DataFrame({
    '订单ID': ['ORD001', 'ORD002', 'ORD003', 'ORD004'],
    '用户ID': ['U001', 'U002', 'U001', 'U003'],
    '商品ID': ['P001', 'P002', 'P003', 'P001'],
    '金额': [100, 200, 150, 100],
    '日期': ['2024-02-01', '2024-02-02', '2024-02-03', '2024-02-04']
})

# 商品数据集
products = pd.DataFrame({
    '商品ID': ['P001', 'P002', 'P003'],
    '商品名称': ['手机', '电脑', '平板'],
    '品类': ['电子产品', '电子产品', '电子产品'],
    '价格': [5000, 8000, 3000]
})

print("用户数据:")
print(users)
print()

print("订单数据:")
print(orders)
print()

print("商品数据:")
print(products)
print()

# 横向关联：用户 + 订单
user_orders = pd.merge(users, orders, on='用户ID', how='left')
print("用户+订单关联结果:")
print(user_orders)
print()

# 继续关联商品
full_data = pd.merge(user_orders, products, on='商品ID', how='left')
print("全量整合数据:")
print(full_data)
print()

# 纵向拼接示例（模拟不同时间段数据）
orders2 = pd.DataFrame({
    '订单ID': ['ORD005', 'ORD006'],
    '用户ID': ['U002', 'U004'],
    '商品ID': ['P002', 'P003'],
    '金额': [800, 300],
    '日期': ['2024-03-01', '2024-03-02']
})

all_orders = pd.concat([orders, orders2], ignore_index=True)
print("纵向拼接后的订单数据:")
print(all_orders)`
  }
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '1');
  const project = projectsData[projectId];

  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [chart, setChart] = useState<string | null>(null);
  const [codeLoading, setCodeLoading] = useState(false);
  const [pyodideLoading, setPyodideLoading] = useState(false);
  const [runtimeError, setRuntimeError] = useState<string>('');

  useEffect(() => {
    if (project) {
      setCode(project.codeTemplate);
    }
  }, [project]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPyodideLoading((window as any).__pyodideLoading || false);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleRunCode = async () => {
    setCodeLoading(true);
    setRuntimeError('');
    setOutput('');
    setChart(null);

    try {
      await initPyodide();
      const result = await runPythonCode(code);
      
      if (result.success) {
        if (result.result && result.result.trim()) {
          setOutput(result.result);
        } else {
          setOutput('代码执行成功（无输出）');
        }
        
        const chartResult = await generateChart(code);
        if (chartResult.success && chartResult.chart) {
          setChart(chartResult.chart);
        }
      } else {
        setRuntimeError(result.error || '代码执行失败');
      }
    } catch (err: any) {
      setRuntimeError(err?.message || '执行代码时发生错误');
    } finally {
      setCodeLoading(false);
    }
  };

  const handleResetCode = () => {
    if (project) {
      setCode(project.codeTemplate);
      setOutput('');
      setChart(null);
      setRuntimeError('');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">项目未找到</h2>
          <Link to="/projects" className="text-blue-600 hover:underline">
            返回项目列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <Link to="/projects" className="inline-flex items-center text-blue-200 hover:text-white mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            返回项目列表
          </Link>
          <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
          <p className="text-xl text-blue-100">{project.description}</p>
        </div>
      </section>

      {/* 项目详情 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* 项目信息 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                project.difficulty === '初级' ? 'bg-green-100 text-green-800' :
                project.difficulty === '中级' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {project.difficulty}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {project.duration}
              </div>
            </div>

            {/* 背景 */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">项目背景</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{project.background}</p>
            </div>

            {/* 需求 */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Target className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">项目需求</h2>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {project.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            {/* 涉及场景 */}
            <div>
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">涉及场景</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.scenarios.map((scenario, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {scenario}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 代码编辑器 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center">
                <BarChart2 className="h-6 w-6 text-blue-600 mr-3" />
                在线编程实践
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleResetCode}
                  disabled={codeLoading || pyodideLoading}
                  className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  重置
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={codeLoading || pyodideLoading}
                  className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {codeLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      运行中...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      运行代码
                    </>
                  )}
                </button>
              </div>
            </div>

            {pyodideLoading && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                <Loader2 className="h-5 w-5 text-blue-600 mr-3 animate-spin" />
                <span className="text-blue-800">正在加载Python环境，请稍候...</span>
              </div>
            )}

            {/* Monaco Editor */}
            <div className="h-96 border rounded-lg overflow-hidden mb-6">
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

            {/* 运行结果 */}
            <div className="bg-gray-50 border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">运行结果</h3>

              {runtimeError && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <pre className="whitespace-pre-wrap">{runtimeError}</pre>
                </div>
              )}

              {output && (
                <div className="bg-white border border-gray-200 text-gray-700 p-4 rounded-lg mb-4">
                  <pre className="whitespace-pre-wrap font-mono text-sm">{output}</pre>
                </div>
              )}

              {chart && (
                <div className="mt-4">
                  <img src={chart} alt="图表" className="max-w-full h-auto mx-auto" />
                </div>
              )}

              {!runtimeError && !output && !chart && (
                <div className="text-center text-gray-500 py-8">
                  <BarChart2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>点击"运行代码"开始实践</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
