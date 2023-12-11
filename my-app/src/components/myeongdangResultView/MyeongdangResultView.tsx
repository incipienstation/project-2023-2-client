import React from 'react';
import './MyeongdangResultView.scss';

import {useAppSelector} from '../../features/store';
import {selectMyeongdangList} from '../../features/station/stationSlice';
import {selectTargetYear} from "../../features/dropdownControl/dropdownControlSlice.ts";

const myeongdangIndexList = [<>&#30002;</>, <>&#20057;</>, <>&#19993;</>, <>&#19969;</>, <>&#25098;</>, <>&#24049;</>, <>&#24218;</>, <>&#36763;</>, <>&#22764;</>, <>&#30328;</>]
const MyeongdangResultView: React.FC = () => {
  const myeongdangList = useAppSelector(selectMyeongdangList);
  const targetYear = useAppSelector(selectTargetYear)

  const cellClass = "cell children-center cell--border"
  const indexCellClass = cellClass + " cell--index bold"
  const nameCellClass = cellClass + " cell--name"
  const luckCellClass = cellClass + " cell--luck"


  if (!myeongdangList.length) {
    return <div className="container children-center header__title">{`${targetYear}년은 명당이 없습니다`}</div>; // Handle the case when there's no data
  }

  const rowBuilder = myeongdangList.map((myeongdang, index) => (
    <div className="container row row--grid h-5" key={myeongdang.id}>
      <div className={indexCellClass}>{myeongdangIndexList[index]}</div>
      <div className={nameCellClass}>{myeongdang.name}</div>
      <div className={cellClass}>{myeongdang.avg_quality}</div>
      <div className={cellClass}>{myeongdang.avg_quantity}</div>
      <div className={luckCellClass}>{myeongdang.luck}</div>
    </div>
  ))

  return (
    <div className="container col children-center myeongdang-result">
      <div className="header">
        <div className="header__title">{`${targetYear}년 명당 순위`}</div>
      </div>
      <div className="myeongdang-result__table s-4">
        <div className="container col col--grid">
          <div className="container row row--grid h-5 bold">
            <div className={indexCellClass}>#</div>
            <div className={nameCellClass}>위치</div>
            <div className={cellClass}>수질(평균)</div>
            <div className={cellClass}>수량(평균)</div>
            <div className={luckCellClass}>운세</div>
          </div>
          {rowBuilder}
        </div>
      </div>
      <div className="h-5"></div>
    </div>
  );
};

export default MyeongdangResultView;
