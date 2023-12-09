import React, {useEffect, useRef} from "react";
import './StationDetailView.scss'
import {useAppDispatch, useAppSelector} from "../../features/store.ts";
import {
  Prediction,
  resetPrediction,
  selectPredictionList,
  selectPredictionStation
} from "../../features/prediction/predictionSlice.ts";
import {Station} from "../../features/station/stationSlice.ts";
import Button from "../common/button/Button.tsx";
import {Line} from "react-chartjs-2";
import * as Chart from "chart.js";


const StationDetailView: React.FC = () => {
  const chartRef = useRef<Chart | null>(null);
  const dispatch = useAppDispatch();
  const predictionData: Prediction[] = useAppSelector(selectPredictionList);
  const station: Station | null = useAppSelector(selectPredictionStation)

  const handleClickCloseButton = () => {
    dispatch(resetPrediction());
  }
  const timestamps = predictionData.map(prediction => prediction.timestamp);
  const quantities = predictionData.map(prediction => prediction.quantity);
  const qualities = predictionData.map(prediction => prediction.quality);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Quantity',
        data: quantities,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Quality',
        data: qualities,
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "향후 10년 예측치 그래프",
      },
    },
  };


  useEffect(() => {
    // Destroy the existing chart before rendering a new one

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance
    chartRef.current = new Chart("chart", {
      type: "line",
      data: data,
      options: options,
    });

    // Ensure the chart is properly destroyed on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, options]);


  return (
    <div className="container column station-detail">
      <div className="header">
        <div>{station?.name}</div>
        <Button name={"닫기"} onClick={handleClickCloseButton}/>
      </div>
      <div className="container">
        <Line data={data} options={options}/>
      </div>
    </div>
  );
};
export default StationDetailView;