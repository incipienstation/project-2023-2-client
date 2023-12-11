import './Home.scss';
import Map from "../../components/map/Map.tsx";
import StationDetailView from "../../components/stationDetailView/StationDetailView.tsx";
import {selectPredictionStatus} from "../../features/prediction/predictionSlice.ts";
import {Status, useAppDispatch, useAppSelector} from "../../features/store.ts";
import React, {useEffect} from "react";
import {fetchStationList, selectMyeongdangStatus} from "../../features/station/stationSlice.ts";
import MyeongdangResultView from "../../components/myeongdangResultView/MyeongdangResultView.tsx";

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const predictionStatus: Status = useAppSelector(selectPredictionStatus);
  const myeongdangStatus: Status = useAppSelector(selectMyeongdangStatus)

  useEffect(() => {
    dispatch(fetchStationList());
  }, []);

  return (
    <div className="container col home">
      <div className="container col children-center home__first">
        <div className="home__title s-4">자유전공학부 풍수지리연구소</div>
        <div className="container row">
          <Map/>
          {predictionStatus === 'succeeded' && (
            <div className="container row">
              <StationDetailView/>
            </div>
          )}
        </div>
      </div>
      {myeongdangStatus === 'succeeded' && (
        <div className="container col children-center home__second">
          <MyeongdangResultView/>
        </div>
      )}
    </div>
  );
};

export default Home;
