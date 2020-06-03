import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

export default class Bar extends Component {
  // 专门用于提供一个配置项
  getOption = () => {
    return {
      //图标的标题
      title: {
        text: "服装销售", //标题的文字
        textStyle: {
          color: "red", //标题的样式
        },
      },
      tooltip: {}, //鼠标滑动提示
      //工具箱
      toolbox: {
        feature: {
          saveAsImage: {}, //保存为图片
        },
      },
      legend: {
        //图例
        data: ["销量", "库存"],
      },
      // x轴的配置
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      // y轴的配置
      yAxis: {},
      // 图标类型+数据
      series: [
        {
          name: "销量",
          type: "bar",
          // type: "line",
          data: [5, 20, 36, 10, 10, 20],
        },
        {
          name: "库存",
          type: "bar",
          data: [5, 2, 1, 4, 5, 6],
        },
      ],
    };
  };

  render() {
    return <ReactEcharts option={this.getOption()} />;
  }
}
