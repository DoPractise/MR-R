import * as echarts from "echarts";

export const drawHourChart = data => {
  if (!data || data.length < 1) return;
  var stockNames = data[0].name;
  var series = {
    name: data[0].name,
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 4,
    data: []
  };
  var xAxis = [];
  data.map(d => {
    let xAxi = d.createTimeStr;
    var xAxiIndex = xAxis.indexOf(xAxi);
    if (xAxiIndex === -1) {
      xAxis.push(xAxi);
      series.data.push(d.value);
    }
  });
  var myChart = echarts.init(document.getElementById("mainHour"));
  var option = {
    tooltip: {
      trigger: "axis",
      formatter: (params, ticket, callback) => {
        var list = [];
        params.map(item => {
          if (item.value >= 0) {
            list.push(item);
          }
          return item;
        });
        list.sort((a, b) => b.value - a.value);
        var str = "";
        list.map(d => {
          str =
            str +
            '<span style="display: inline-block; width: 8px; height: 8px; margin-top: -2px; margin-right: 5px; border-radius: 4px; background-color: ' +
            d.color +
            ';"></span><span style="color: ' +
            d.color +
            ';">' +
            d.seriesName +
            ": </span>" +
            d.value +
            "</br>";
          return d;
        });
        if (list.length > 0) {
          let axisValue = list[0].axisValue || "";
          return axisValue + "<br/>" + str;
        } else {
          return "<br/>" + str;
        }
      },
      padding: 10
    },
    legend: {
      data: stockNames
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "5%",
      bottom: "5%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis
    },
    yAxis: {
      type: "value",
      scale: true
    },
    series: series
  };
  myChart.setOption(option);
};

export const drawDayChart = data => {
  if (!data || data.length < 1) return;
  var series = [];
  var xAxis = [];
  var stockNames = data[0].name;
  var series = {
    name: data[0].name,
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 4,
    data: []
  };
  var xAxis = [];
  data.map(d => {
    let xAxi = d.createTimeStr;
    var xAxiIndex = xAxis.indexOf(xAxi);
    if (xAxiIndex === -1) {
      xAxis.push(xAxi);
      series.data.push(d.value);
    }
  });
  var myChart = echarts.init(document.getElementById("mainDay"));
  var option = {
    tooltip: {
      trigger: "axis",
      formatter: (params, ticket, callback) => {
        var list = [];
        params.map(item => {
          if (item.value >= 0) {
            list.push(item);
          }
          return item;
        });
        list.sort((a, b) => b.value - a.value);
        var str = "";
        list.map(d => {
          str =
            str +
            '<span style="display: inline-block; width: 8px; height: 8px; margin-top: -2px; margin-right: 5px; border-radius: 4px; background-color: ' +
            d.color +
            ';"></span><span style="color: ' +
            d.color +
            ';">' +
            d.seriesName +
            ": </span>" +
            d.value +
            "</br>";
          return d;
        });
        if (list.length > 0) {
          let axisValue = list[0].axisValue || "";
          return axisValue + "<br/>" + str;
        } else {
          return "<br/>" + str;
        }
      },
      padding: 10
    },
    legend: {
      data: stockNames
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "5%",
      bottom: "5%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis
    },
    yAxis: {
      type: "value",
      scale: true
    },
    series: series
  };
  myChart.setOption(option);
};
