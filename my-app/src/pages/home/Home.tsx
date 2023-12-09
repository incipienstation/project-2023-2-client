import './Home.scss';
import Map from "../../components/map/Map.tsx";
import StationDetailView from "../../components/stationDetailView/StationDetailView.tsx";
import {selectPredictionStatus} from "../../features/prediction/predictionSlice.ts";
import {Status, useAppDispatch, useAppSelector} from "../../features/store.ts";
import React, {useEffect} from "react";
import {fetchStationList, selectMyeongdangStatus} from "../../features/station/stationSlice.ts";
import Appeal from "../../components/appeal/Appeal.tsx";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const predictionStatus: Status = useAppSelector(selectPredictionStatus);
  const myeongdangStatus: Status = useAppSelector(selectMyeongdangStatus)

  useEffect(() => {
    dispatch(fetchStationList());
  }, []);

  return (
    <div className="container column home">
      <div className="container column page__first">
        <div className="title">자유전공학부 풍수지리연구소</div>
        <div className="splitter"></div>
        <div className="container row">
          <Map/>
          {predictionStatus === 'succeeded' && <StationDetailView/>}
        </div>
      </div>
      {myeongdangStatus === 'succeeded' && (
        <div className="container page__second">
          <Appeal/>
        </div>
      )}
    </div>
  );
};

export default Home;
