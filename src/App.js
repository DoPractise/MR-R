import React, { Component } from "react";
import { DatePicker } from "antd";
import * as echarts from "echarts";
import moment from "moment";
import "antd/dist/antd.css";
import "./App.css";

// 限定只能选中今天及以前的日期
var getHourData = function(startDate, endDate, callback) {
  let params = {
    startDate: startDate,
    endDate: endDate
  };
  let requestInstance = new Request(
    "http://localhost:9600/mp/stock/hour/list",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(params)
    }
  );
  fetch(requestInstance)
    .then(res => res.json())
    .then(
      result => {
        // console.log(result)
        callback(result);
      },
      error => {
        // console.log(error)
        callback(error);
      }
    );
};
var getDayData = function(startDate, endDate, callback) {
  let params = {
    startDate: startDate,
    endDate: endDate
  };
  let requestInstance = new Request("http://localhost:9600/mp/stock/day/list", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(params)
  });
  fetch(requestInstance)
    .then(res => res.json())
    .then(
      result => {
        // console.log(result)
        callback(result);
      },
      error => {
        // console.log(error)
        callback(error);
      }
    );
};
var drawHourChart = res => {
  var data = res.data || {};
  var stockNames = [];
  var stockCodes = [];
  var series = [];
  var xAxis = [];
  for (let dateKey in data) {
    for (let hourKey in data[dateKey]) {
      let xAxi = dateKey + " " + hourKey;
      var xAxiIndex = xAxis.indexOf(xAxi);
      if (xAxiIndex === -1) {
        xAxis.push(xAxi);
      }
    }
  }
  xAxis.sort((a, b) => {
    var tsA = new Date(a + ":00:00").getTime();
    var tsB = new Date(b + ":00:00").getTime();
    return tsA - tsB;
  });
  for (let dateKey in data) {
    for (let hourKey in data[dateKey]) {
      let xAxi = dateKey + " " + hourKey;
      let xAxisIndex = xAxis.indexOf(xAxi);
      let list = data[dateKey][hourKey] || [];
      list.sort((a, b) => a - b);
      list = list.slice(0, 11);
      list.map(stock => {
        var stockIndex = stockNames.indexOf(stock.name);
        if (stockIndex === -1) {
          stockNames.push(stock.name);
          stockCodes.push(stock.code);
          series.push({
            name: stock.name,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 4,
            data: []
          });
          series[series.length - 1].data[xAxisIndex] = stock.value;
        } else {
          series[stockIndex].data[xAxisIndex] = stock.value;
        }
        return stock;
      });
    }
  }
  var myChart = echarts.init(document.getElementById("mainHour"));
  var option = {
    color: [
      "#c23531",
      "#2f4554",
      "#61a0a8",
      "#d48265",
      "#91c7ae",
      "#749f83",
      "#ca8622",
      "#bda29a",
      "#6e7074",
      "#546570",
      "#c4ccd3",
      "#00bfff",
      "#f33a11",
      "#cdcd00",
      "#ffc125",
      "#cd950c",
      "#eded07",
      "#f7f72c",
      "#ff0000",
      "#3366ff"
    ],
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
var drawDayChart = res => {
  var data = res.data || {};
  var stockNames = [];
  var stockCodes = [];
  var series = [];
  var xAxis = [];
  for (let dateKey in data) {
    for (let hourKey in data[dateKey]) {
      let xAxi = dateKey + " " + hourKey;
      var xAxiIndex = xAxis.indexOf(xAxi);
      if (xAxiIndex === -1) {
        xAxis.push(xAxi);
      }
    }
  }
  xAxis.sort((a, b) => {
    var tsA = new Date(a + ":00:00").getTime();
    var tsB = new Date(b + ":00:00").getTime();
    return tsA - tsB;
  });
  for (let dateKey in data) {
    for (let hourKey in data[dateKey]) {
      let xAxi = dateKey + " " + hourKey;
      let xAxisIndex = xAxis.indexOf(xAxi);
      let list = data[dateKey][hourKey] || [];
      list.sort((a, b) => a - b);
      list = list.slice(0, 11);
      list.map(stock => {
        var stockIndex = stockNames.indexOf(stock.name);
        if (stockIndex === -1) {
          stockNames.push(stock.name);
          stockCodes.push(stock.code);
          series.push({
            name: stock.name,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 4,
            data: []
          });
          series[series.length - 1].data[xAxisIndex] = stock.value;
        } else {
          series[stockIndex].data[xAxisIndex] = stock.value;
        }
        return stock;
      });
    }
  }
  var myChart = echarts.init(document.getElementById("mainDay"));
  var option = {
    color: [
      "#c23531",
      "#2f4554",
      "#61a0a8",
      "#d48265",
      "#91c7ae",
      "#749f83",
      "#ca8622",
      "#bda29a",
      "#6e7074",
      "#546570",
      "#c4ccd3",
      "#00bfff",
      "#f33a11",
      "#cdcd00",
      "#ffc125",
      "#cd950c",
      "#eded07",
      "#f7f72c",
      "#ff0000",
      "#3366ff"
    ],
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
class App extends Component {
  componentDidMount() {
    var defaultDate = moment().format("YYYY-MM-DD");
    getHourData(defaultDate, defaultDate, drawHourChart);
    getDayData(defaultDate, defaultDate, drawDayChart);
  }
  handleChangePicker(moment, dateStr) {
    getHourData(dateStr, dateStr, drawHourChart);
    getDayData(dateStr, dateStr, drawDayChart);
  }
  render() {
    return (
      <div className="app" id="app">
        <div className="content">
          <div className="top">
            <div className="calendar">
              <DatePicker onChange={this.handleChangePicker} />{" "}
            </div>{" "}
          </div>{" "}
          <div className="bottom">
            <div className="tit"> 1 小时热度统计 </div>{" "}
            <div
              id="mainHour"
              style={{
                width: "100%",
                height: "700px"
              }}
            >
              {" "}
            </div>{" "}
            <div className="tit"> 24 小时热度统计 </div>{" "}
            <div
              id="mainDay"
              style={{
                width: "100%",
                height: "700px"
              }}
            >
              {" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default App;
