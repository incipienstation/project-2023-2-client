import React from "react";
import {Chart} from "react-google-charts";

interface PredictionChartProps {
  data: any[][];
  options: {};
}

const PredictionChart: React.FC<PredictionChartProps> = ({data, options}) => {
  return (
    <Chart
      chartType="LineChart"
      width={"100%"}
      height={"400px"}
      data={data}
      options={options}
      loader={<div>차트 로딩중...</div>}
    />
  );
};

export default PredictionChart;
