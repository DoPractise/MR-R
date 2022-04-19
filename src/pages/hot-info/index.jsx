import React, { useEffect, useRef, useCallback, useState } from "react";
import moment from "moment";
import { DatePicker, Input, Row, Col, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getHourData, getDayData } from "../../api/kanban";
import { drawHourChart, drawDayChart } from "./helpers";
import "./index.scss";

export default props => {
  const chartRef = useRef(null);
  const initTime = moment().format("YYYY-MM-DD");
  const [startTime, setStartTime] = useState(initTime);
  const [endTime, setEndTime] = useState(initTime);
  const [name, setName] = useState("");

  const getChartData = useCallback(
    params => {
      // 1小时
      getHourData(params).then(({ data }) => {
        drawHourChart(data);
      });
      // 24小时
      getDayData(params).then(({ data }) => {
        drawDayChart(data);
      });
    },
    [startTime, endTime, name]
  );

  const handleChangePicker = useCallback((moment, dateStr) => {
    setStartTime(dateStr);
    setEndTime(dateStr);
  }, []);

  const handleNameChange = useCallback(val => {
    setName(val);
  }, []);

  const search = useCallback(() => {
    getChartData();
  }, []);

  // 初始化
  useEffect(() => {
    getChartData();
  }, []);

  return (
    <>
      <div className="app" id="app">
        <div className="content">
          <div className="top">
            <Row>
              <Col span="6">
                <div className="calendar">
                  <DatePicker placeholder="选择日期" onChange={handleChangePicker} style={{ width: "100%" }} />
                </div>
              </Col>
              <Col span="12">
                <div style={{ padding: "10px", verticalAlign: "top" }}>
                  <Input placeholder="输入名称" onChange={e => handleNameChange(e.target.value)} />
                </div>
              </Col>
              <Col>
                <div style={{ padding: "10px" }}>
                  <Button type="primary" icon={<SearchOutlined />} onClick={search}>
                    Search
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="bottom">
            <div className="tit"> 1 小时热度统计 </div>
            <div
              id="mainHour"
              style={{
                width: "100%",
                height: "700px"
              }}
            ></div>
            <div className="tit"> 24 小时热度统计 </div>
            <div
              id="mainDay"
              style={{
                width: "100%",
                height: "700px"
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};
