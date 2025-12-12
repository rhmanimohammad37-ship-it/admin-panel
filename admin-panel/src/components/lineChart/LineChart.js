import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import './linchart.css'

export default function LineChartComponent(props) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-header-show-chart">
          <LineChart
            series={[
              {
                data: props.data,
                color: props.color,
                label: props.label,
              },
            ]}
            xAxis={[
              {
                data: props.xAxis,
              },
            ]}
            yAxis={[
              {
                tickNumber: 8,
              },
            ]}
            width={undefined}
            height={undefined}
            className="line-chart"
            sx={{width: '100%'}}
          ></LineChart>
        </div>
        <div className="chart-header-show-info">
            <h4>{props.label}</h4>
        </div>
      </div>
      <div className="chart-card-footer">
        <p className="footer-text">بروزرسانی:<span>{props.update}</span></p>
      </div>
      
    </div>
  );
}
