import React from 'react';
import './Dropdown.scss'
import {useAppDispatch, useAppSelector} from '../../../features/store';
import {selectDropdownYear, setDropdownYear} from "../../../features/dropdownControl/dropdownControlSlice.ts";

const Dropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedYear = useAppSelector(selectDropdownYear);
  const years = Array.from({length: 10}, (_, index) => 2024 + index);

  const handleChangeYear = (year: number) => {
    dispatch(setDropdownYear(year));
  };

  const optionBuilder = years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ))

  return (
    <div className="container children-start dropdown">
      <label className="header__title" htmlFor="year">연도 선택</label>
      <select
        id="year"
        onChange={(e) => handleChangeYear(Number(e.target.value))}
        value={selectedYear}
      >
        {optionBuilder}
      </select>
    </div>
  );
};

export default Dropdown;
