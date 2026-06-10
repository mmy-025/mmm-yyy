import { loadPyodide } from 'pyodide';

// 全局Pyodide实例
let pyodide: any = null;
// 加载状态
let isLoading: boolean = false;

// 获取加载状态
export function getLoadingStatus() {
  return isLoading;
}

// 初始化Pyodide，预装所需库
export async function initPyodide() {
  if (pyodide) return pyodide;

  isLoading = true;
  try {
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/'
    });
    // 预装核心库 - numpy、pandas、matplotlib是Pyodide支持的核心数据分析库
    await pyodide.loadPackage([
      'numpy', 'pandas', 'matplotlib'
    ]);
    
    // 配置matplotlib，使用AGG后端支持前端渲染，全局预设中文渲染字体
    pyodide.runPython(`
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# 全局中文渲染配置
plt.rcParams['font.sans-serif'] = ['WenQuanYi Zen Hei', 'DejaVu Sans', 'SimHei', 'Microsoft YaHei', 'Arial Unicode MS']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['figure.dpi'] = 150
plt.ioff()
    `);
    
    // 配置pandas DataFrame显示选项
    pyodide.runPython(`
import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 100)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', 50)
pd.set_option('display.unicode.east_asian_width', True)
    `);
    
    return pyodide;
  } finally {
    isLoading = false;
  }
}

// 运行Python代码 - 捕获完整输出
export async function runPythonCode(code: string) {
  try {
    const py = await initPyodide();
    
    // 清除之前的输出和图表
    py.runPython(`
import sys
from io import StringIO

# 捕获stdout和stderr
_stdout_backup = sys.stdout
_stderr_backup = sys.stderr
sys.stdout = StringIO()
sys.stderr = StringIO()
    `);
    
    // 运行代码
    await py.runPythonAsync(code);
    
    // 获取输出
    const result = py.runPython(`
import sys
_output = sys.stdout.getvalue()
_error = sys.stderr.getvalue()
sys.stdout = _stdout_backup
sys.stderr = _stderr_backup
{'output': _output, 'error': _error}
    `);
    
    // 处理结果
    const output = result.toJs ? result.toJs() : result;
    const stdout = output.output || '';
    const stderr = output.error || '';
    
    if (stderr) {
      return { success: false, error: stderr };
    }
    
    return { success: true, result: stdout };
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    console.error('Python执行错误:', errorMsg);
    return { success: false, error: errorMsg };
  }
}

// 生成图表 - 确保清除缓存，高分辨率
export async function generateChart(code: string) {
  const py = await initPyodide();
  try {
    // 先清除之前的图表
    py.runPython(`
import matplotlib.pyplot as plt
plt.close("all")
    `);
    
    // 运行用户代码
    await py.runPythonAsync(code);
    
    // 生成图表
    const chartData = py.runPython(`
import io
import base64
import matplotlib.pyplot as plt

buffer = io.BytesIO()
plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight', facecolor='white')
buffer.seek(0)
img_str = base64.b64encode(buffer.read()).decode('utf-8')
plt.close("all")
img_str
    `);
    
    return { success: true, chart: `data:image/png;base64,${chartData}` };
  } catch (error: any) {
    return { success: false, error: error.message || String(error) };
  }
}
