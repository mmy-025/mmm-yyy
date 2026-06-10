# Python商务数据分析极简例题（新手易懂·纯基础库）

全套10道商务数据分析例题，**仅用pandas、numpy、matplotlib基础常用库**，代码极简、逻辑直白、分步注释、无复杂语法，适合新手入门学习、课程作业、实训练习，每段代码均可直接运行。

---

## 例题1：电商订单数据清洗（极简易懂版）

**核心知识点**：缺失值处理、去重、异常数据过滤、时间格式统一

```python
# 导入基础库
import pandas as pd

# 1.读取数据
df = pd.read_csv("dataset_1_raw_orders.csv")
print("原始数据行数：", len(df))

# 2.删除关键信息为空的数据（订单ID、用户ID不能为空）
df = df.dropna(subset=["订单ID", "用户ID"])

# 3.删除重复订单（同一个订单只保留第一条）
df = df.drop_duplicates(subset=["订单ID"])

# 4.统一时间格式，错误时间直接删除
df["下单时间"] = pd.to_datetime(df["下单时间"], errors="coerce")
df = df.dropna(subset=["下单时间"])

# 5.过滤异常数据：金额、数量必须大于0
df = df[df["商品金额"] > 0]
df = df[df["购买数量"] > 0]

# 6.输出结果并保存
print("清洗后数据行数：", len(df))
df.to_csv("干净订单数据.csv", index=False, encoding="utf-8-sig")
print("✅ 数据清洗完成")
```

---

## 例题2：销售多维统计分析（极简易懂版）

**核心知识点**：分组统计、维度分析、数据排序、占比计算

```python
import pandas as pd

# 1.读取数据，处理时间
df = pd.read_csv("dataset_2_sales_orders.csv")
df["下单时间"] = pd.to_datetime(df["下单时间"])
df["月份"] = df["下单时间"].dt.month  # 只保留月份，简单直观

# 2.按月统计销量、销售额（时间维度）
month_sale = df.groupby("月份").agg(
    订单数=("订单ID", "count"),
    总销售额=("商品金额", "sum")
).reset_index()
print("【月度销售统计】")
print(month_sale)

# 3.按商品品类统计（商品维度）
type_sale = df.groupby("商品品类").agg(
    总销量=("购买数量", "sum"),
    总营收=("商品金额", "sum")
).reset_index()
# 按销量从高到低排序
type_sale = type_sale.sort_values("总销量", ascending=False)
print("\n【各品类销售统计】")
print(type_sale)

# 4.按地区统计（区域维度）
area_sale = df.groupby("收货地区")["商品金额"].sum().sort_values(ascending=False)
print("\n【各区域销售额排名】")
print(area_sale)

print("✅ 多维销售分析完成")
```

---

## 例题3：超市购物篮关联分析（极简易懂版）

**核心知识点**：数据格式转换、商品共现统计、简单关联规则

```python
import pandas as pd

# 1.读取数据
df = pd.read_csv("dataset_3_supermarket_transactions.csv")

# 2.转换格式：每个订单对应的所有商品
order_goods = df.groupby("订单ID")["商品名称"].apply(list)
total_order = len(order_goods)

# 3.统计哪些商品经常一起被购买
combine_list = []
for goods in order_goods:
    # 同一个订单里的商品两两组合
    for i in range(len(goods)):
        for j in range(i+1, len(goods)):
            combine_list.append((goods[i], goods[j]))

# 4.统计组合出现次数
combine_count = pd.Series(combine_list).value_counts()

# 5.筛选高频组合（出现次数多的搭配）
print("【高频一起购买的商品组合】")
for (g1, g2), count in combine_count.head(10).items():
    # 简单计算占比，通俗易懂
    rate = round(count / total_order, 3)
    print(f"{g1} + {g2}  共同购买次数：{count}，搭配概率：{rate}")

print("✅ 购物篮关联分析完成")
```

---

## 例题4：用户RFM客户分群（极简易懂版）

**核心知识点**：RFM指标计算、简单分层、用户分类

```python
import pandas as pd

# 1.读取数据
df = pd.read_csv("dataset_4_user_rfm_data.csv")
df["消费时间"] = pd.to_datetime(df["消费时间"])
now_time = pd.to_datetime("2023-12-31")

# 2.计算每个用户的R、F、M三个指标
user_rfm = df.groupby("用户ID").agg(
    最近消费时间=("消费时间", "max"),
    消费次数=("订单ID", "count"),
    消费总金额=("消费金额", "sum")
).reset_index()

# R：距离现在的天数（天数越小，用户越活跃）
user_rfm["最近消费天数"] = (now_time - user_rfm["最近消费时间"]).dt.days

# 3.简单分层打分（新手易懂：直接按数值划分）
def get_user_type(row):
    # 近期消费多、花钱多 = 高价值用户
    if row["最近消费天数"] < 30 and row["消费次数"] > 5 and row["消费总金额"] > 1000:
        return "高价值用户"
    # 近期活跃但消费少 = 潜力用户
    elif row["最近消费天数"] < 30:
        return "潜力用户"
    # 很久不消费但以前消费多 = 沉睡用户
    elif row["消费次数"] > 5:
        return "沉睡用户"
    # 很久不消费、消费少 = 流失用户
    else:
        return "流失用户"

# 4.给所有用户打标签
user_rfm["用户类型"] = user_rfm.apply(get_user_type, axis=1)

# 5.统计各类用户数量
print("【用户分层统计】")
print(user_rfm["用户类型"].value_counts())
user_rfm.to_csv("用户分群结果.csv", index=False, encoding="utf-8-sig")
print("✅ 用户客户分群完成")
```

---

## 例题5：商务数据可视化图表（极简易懂版）

**核心知识点**：折线图、柱状图、饼图、基础绘图

```python
import pandas as pd
import matplotlib.pyplot as plt

# 解决中文乱码
plt.rcParams["font.sans-serif"] = ["SimHei"]
plt.rcParams["axes.unicode_minus"] = False

# 1.读取数据
df = pd.read_csv("dataset_5_visualization_orders.csv")
df["下单时间"] = pd.to_datetime(df["下单时间"])
df["月份"] = df["下单时间"].dt.month

# 2.准备统计数据
month_data = df.groupby("月份")["商品金额"].sum()
type_data = df.groupby("商品品类")["商品金额"].sum()
area_data = df.groupby("收货地区")["购买数量"].sum()

# 3.绘制2*2四张基础图表
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 月度销售额折线图
axes[0,0].plot(month_data.index, month_data.values, marker="o")
axes[0,0].set_title("月度销售额走势")

# 品类占比饼图
axes[0,1].pie(type_data.values, labels=type_data.index, autopct="%.1f%%")
axes[0,1].set_title("各品类销售额占比")

# 区域销量柱状图
axes[1,0].bar(area_data.index, area_data.values)
axes[1,0].set_title("各区域销量对比")
axes[1,0].tick_params(axis="x", rotation=45)

# 空白占位
axes[1,1].set_title("数据可视化展示")

plt.tight_layout()
plt.savefig("简易数据分析图表.png", dpi=300)
plt.show()
print("✅ 可视化图表生成完成")
```

---

## 例题6：A/B测试效果分析（极简易懂版）

**核心知识点**：分组对比、指标计算、效果判断

```python
import pandas as pd

# 1.读取数据
df = pd.read_csv("dataset_6_ab_test_data.csv")

# 2.拆分两组数据
old_page = df[df["页面类型"] == "旧页面"]
new_page = df[df["页面类型"] == "新页面"]

# 3.简单计算转化率（核心指标）
old_rate = old_page["是否转化"].sum() / len(old_page)
new_rate = new_page["是否转化"].sum() / len(new_page)

# 4.对比结果
print("旧页面转化率：", round(old_rate, 3))
print("新页面转化率：", round(new_rate, 3))

# 5.简单判断改版效果
if new_rate > old_rate:
    print("✅ 新页面效果更好，建议上线")
elif new_rate < old_rate:
    print("❌ 新页面效果变差，不建议上线")
else:
    print("⚖️ 新旧页面效果一致")
```

---

## 例题7：销量时间序列预测（极简易懂版）

**核心知识点**：时间排序、移动平均、简单预测

```python
import pandas as pd
import matplotlib.pyplot as plt

plt.rcParams["font.sans-serif"] = ["SimHei"]

# 1.读取并整理时间数据
df = pd.read_csv("dataset_7_sales_timeseries.csv")
df["日期"] = pd.to_datetime(df["日期"])
df = df.sort_values("日期")

# 2.绘制历史销量走势
plt.figure(figsize=(10, 4))
plt.plot(df["日期"], df["销量"])
plt.title("商品历史销量走势")
plt.show()

# 3.7日平均销量（平滑波动，更稳定）
df["七日平均销量"] = df["销量"].rolling(window=7).mean()

# 4.用近期平均值预测未来销量
last_avg = df["七日平均销量"].tail(30).mean()
print("近期平均销量：", round(last_avg))
print("📌 预测未来每日销量约：", round(last_avg))
print("✅ 销量预测完成")
```

---

## 例题8：营销数据特征工程（极简易懂版）

**核心知识点**：特征构造、数据分箱、简单数据处理

```python
import pandas as pd

# 1.读取数据
df = pd.read_csv("dataset_8_marketing_raw_data.csv")
df["访问时间"] = pd.to_datetime(df["访问时间"])

# 2.给每个用户统计基础特征
user_feature = df.groupby("用户ID").agg(
    访问次数=("访问ID", "count"),
    总点击量=("点击次数", "sum"),
    下单次数=("是否下单", "sum")
).reset_index()

# 3.计算用户转化率（新特征）
user_feature["转化率"] = user_feature["下单次数"] / user_feature["访问次数"]

# 4.给用户分层（简单分箱）
def level_tag(rate):
    if rate > 0.5:
        return "高转化用户"
    elif rate > 0.2:
        return "中转化用户"
    else:
        return "低转化用户"

user_feature["用户等级"] = user_feature["转化率"].apply(level_tag)

# 5.输出结果
print("【用户特征数据预览】")
print(user_feature.head())
user_feature.to_csv("用户营销特征数据.csv", index=False, encoding="utf-8-sig")
print("✅ 特征工程处理完成")
```

---

## 例题9：数据异常值风险检测（极简易懂版）

**核心知识点**：异常数据筛选、风险识别、数据清洗

```python
import pandas as pd

# 1.读取数据
df = pd.read_csv("dataset_9_anomaly_detection_orders.csv")

# 2.筛选明显异常数据
# 异常1：金额、数量为负数或0
error_money = df[df["订单金额"] <= 0]
error_num = df[df["购买数量"] <= 0]

# 异常2：单用户单日下单过多（疑似刷单）
df["下单日期"] = pd.to_datetime(df["下单时间"]).dt.date
user_order_count = df.groupby(["用户ID", "下单日期"])["订单ID"].count()
abnormal_user = user_order_count[user_order_count > 5]

# 3.打印异常统计
print("金额异常数据条数：", len(error_money))
print("数量异常数据条数：", len(error_num))
print("高频刷单异常用户数：", len(abnormal_user))

# 4.清洗脏数据
clean_df = df[(df["订单金额"] > 0) & (df["购买数量"] > 0)]
clean_df.to_csv("清洗后无异常数据.csv", index=False, encoding="utf-8-sig")
print("✅ 异常数据检测与清洗完成")
```

---

## 例题10：多源数据合并整合（极简易懂版）

**核心知识点**：多表合并、空值填充、汇总统计

```python
import pandas as pd

# 1.读取多张数据表
df_user = pd.read_csv("dataset_10_users.csv")
df_order = pd.read_csv("dataset_10_orders.csv")
df_goods = pd.read_csv("dataset_10_products.csv")

# 2.逐步合并数据表（核心：关键字段关联）
# 订单表 + 用户表
data1 = pd.merge(df_order, df_user, on="用户ID", how="left")
# 再合并商品表
full_data = pd.merge(data1, df_goods, on="商品ID", how="left")

# 3.简单清洗空值
full_data = full_data.fillna("未知")

# 4.按渠道统计销售效果
channel_stat = full_data.groupby("渠道名称").agg(
    订单总数=("订单ID", "count"),
    销售总额=("订单金额", "sum")
).sort_values("销售总额", ascending=False)

print("【各渠道销售效果】")
print(channel_stat)
full_data.to_csv("整合全量数据.csv", index=False, encoding="utf-8-sig")
print("✅ 多源数据整合分析完成")
```

> （注：文档部分内容可能由 AI 生成）
