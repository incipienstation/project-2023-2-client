import React from 'react';
import './Dropdown.scss'
import {useAppDispatch, useAppSelector} from '../../../features/store';
import {selectDropdownYear, setDropdownYear} from "../../../features/dropdownControl/dropdownControlSlice.ts";

const Dropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedYear = useAppSelector(selectDropdownYear);
  const years = Array.from({length: 10}, (_, index) => 2024 + index);

  const handleYearChange = (year: number) => {
    dispatch(setDropdownYear(year));
  };

  return (
    <div className="container children-start dropdown">
      <label htmlFor="year">연도 선택</label>
      <select
        id="year"
        onChange={(e) => handleYearChange(Number(e.target.value))}
        value={selectedYear}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
