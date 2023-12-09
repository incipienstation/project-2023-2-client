import React from "react";
import {Myeongdang, selectMyeongdangList} from "../../features/station/stationSlice.ts";
import {useAppSelector} from "../../features/store.ts";
import {selectTargetYear} from "../../features/dropdownControl/dropdownControlSlice.ts";


const Appeal: React.FC = () => {
  const myeongdangList: Myeongdang[] = useAppSelector(selectMyeongdangList)
  const targetYear = useAppSelector(selectTargetYear)

  return (
    <div className="container column children-center">
      <div>{`${targetYear!}년 명당`}</div>
      {myeongdangList.length === 0 ? "명당 없음" : myeongdangList.map((myeongdang, index) => (
        <div key={index.toString()}>
          {`${myeongdang.name}: { 수질 평균: ${myeongdang.avg_quality}등급, 수량 평균: ${myeongdang.avg_quantity}cm }`}
        </div>
      ))}
    </div>
  )
}

export default Appeal