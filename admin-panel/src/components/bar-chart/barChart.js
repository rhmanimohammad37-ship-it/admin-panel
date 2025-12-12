import React from "react";
import {BarChart } from "@mui/x-charts/BarChart";
import './bar-chart.css'

export default function BarChartComponent(props) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div className="chart-header-show-chart">
          <BarChart
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
          ></BarChart>
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
