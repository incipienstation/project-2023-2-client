import React, {useEffect} from 'react';
import './Map.scss'
import {Status, useAppDispatch, useAppSelector} from "../../features/store.ts";
import {fetchPredictionList, setStation} from "../../features/prediction/predictionSlice.ts";
import {
  fetchMyeongdangList,
  Myeongdang,
  resetMyeongdang,
  selectMyeongdangList,
  selectMyeongdangStatus,
  selectStationList,
  Station
} from "../../features/station/stationSlice.ts";
import Button from "../common/button/Button.tsx";
import Dropdown from "../common/dropdown/Dropdown.tsx";
import {
  resetTargetYear,
  selectDropdownYear,
  setTargetYear
} from "../../features/dropdownControl/dropdownControlSlice.ts";

declare global {
  interface Window {
    kakao: any;
  }
}


const Map: React.FC = () => {
  const dispatch = useAppDispatch();
  const stationList: Station[] = useAppSelector(selectStationList)
  const myeongdangList: Myeongdang[] = useAppSelector(selectMyeongdangList)
  const myeongdangStatus: Status = useAppSelector(selectMyeongdangStatus)
  const selectedYear = useAppSelector(selectDropdownYear)

  const handleClickMarker = async (station: Station) => {
    dispatch(setStation(station))
    await dispatch(fetchPredictionList(station.id));
  };

  const handleClickComputeButton = async (year: number) => {
    await dispatch(fetchMyeongdangList(year))
    dispatch(setTargetYear(year))
  }
  const handleClickResetButton = () => {
    dispatch(resetMyeongdang())
    dispatch(resetTargetYear())
  }

  const buildMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(35.999380553850724, 127.8777986059045),
      level: 13, // Zoom level
    };
    const map = new window.kakao.maps.Map(container, options);

    const stations: Station[] = myeongdangStatus === 'succeeded' ? myeongdangList : stationList
    // Add station markers
    stations.forEach((station, index) => {
      const markerImage = myeongdangStatus === 'succeeded'
        ? new window.kakao.maps.MarkerImage(`/assets/marker_images/marker${index}.jpg`, new window.kakao.maps.Size(25, 33))
        : null
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(station.latitude, station.longitude),
        image: markerImage
      });

      // Add a click event listener to each marker
      window.kakao.maps.event.addListener(marker, 'click', () => {
        handleClickMarker(station);
      });

      // Set the marker on the map
      marker.setMap(map);
    });
  };

  useEffect(() => {
    buildMap()
  }, [stationList, myeongdangList]);

  return (
    <div className="container col map s-4">
      <div className="header">
        <Dropdown/>
        <Button name={"명당 찾기"} onClick={() => {
          handleClickComputeButton(selectedYear)
        }}/>
        <Button name={"초기화"} onClick={handleClickResetButton}/>
      </div>
      <div id="map"/>
    </div>
  );
};

export default Map;
