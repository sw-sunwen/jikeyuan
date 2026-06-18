import * as echarts from "echarts";
import {useEffect, useRef} from "react";

const Barchart = ({title, legends}) => {

  const chartRef = useRef(null);
  const chartInstance = useRef(null);  // 保存图表实例引用

  useEffect(() => {// 保证dom可用，才渲染图表
    // 初始化或获取图表实例
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }
    // 指定图表的配置项和数据
    const option = {
      title: {
        text: title  // 图表标题
      },
      tooltip: {}, // 提示框组件，鼠标悬浮时显示数据详情
      legend: {
        data: [legends] // 图例组件，显示数据系列名称
      },
      xAxis: {
        data: ['vue', 'react', 'angular'] // x轴数据
      },
      yAxis: {}, // y轴配置项，默认显示数值轴
      series: [ // 数据系列配置项（图标内容）
        {
          name: legends, // 数据系列名称
          type: 'bar', // 图表类型，柱状图
          data: [36, 10, 15] // 数据系列数据
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    option && chartInstance.current.setOption(option); //chartInstance.current.setOption()	将配置项设置到图表实例
     // 清理函数
    return () => {
      chartInstance.current?.dispose();  // 销毁图表实例
      chartInstance.current = null;
    };
    
  }, []);

  return (
      <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
  )
}

export default Barchart
