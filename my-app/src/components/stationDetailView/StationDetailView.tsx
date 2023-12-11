import React from "react";
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
import PredictionChart from "../common/chart/PredictionChart.tsx";


const StationDetailView: React.FC = () => {
  const dispatch = useAppDispatch();
  const predictionData: Prediction[] = useAppSelector(selectPredictionList);
  const station: Station | null = useAppSelector(selectPredictionStation)

  const handleClickCloseButton = () => {
    dispatch(resetPrediction());
  }
  const timestamps = predictionData.map(prediction => prediction.timestamp);
  const quantities = predictionData.map(prediction => prediction.quantity);
  const qualities = predictionData.map(prediction => prediction.quality);

  const chartData = [
    ['Timestamp', '수량', '수질'],
    ...timestamps.map((timestamp, index) => [timestamp, quantities[index], qualities[index]])
  ];

  const chartOptions = {
    title: '수량/수질 예측 그래프 (10년)',
    hAxis: {title: ''},
    vAxes: {
      0: {title: '수량'},
      1: {title: '수질'},
    },
    series: {
      0: {targetAxisIndex: 0},
      1: {targetAxisIndex: 1},
    },
    legend: {position: 'bottom'},
    curveType: 'function',
    // chartArea: {
    //   top: 30,
    //   bottom: 30,
    //   left: 50,
    //   right: 50,
    //   width: '40%',
    //   height: '80%',
    // },
  };

  return (
    <div className="container col station-detail s-4">
      <div className="header">
        <div className="header__title">{station?.name}</div>
        <Button name={"닫기"} onClick={handleClickCloseButton}/>
      </div>
      <div className="container">
        <PredictionChart data={chartData} options={chartOptions}/>
      </div>
    </div>
  );
};
export default StationDetailView;