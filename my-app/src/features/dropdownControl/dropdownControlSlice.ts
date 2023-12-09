import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store.ts';

interface DropdownState {
  dropdownYear: number;
  targetYear: number | null;
}

const initialState: DropdownState = {
  dropdownYear: 2024,
  targetYear: null
};

export const dropdownControlSlice = createSlice({
  name: 'dropdownControl',
  initialState,
  reducers: {
    setDropdownYear: (state, action: PayloadAction<number>) => {
      state.dropdownYear = action.payload;
    },
    setTargetYear: (state, action: PayloadAction<number>) => {
      state.targetYear = action.payload
    },
    resetTargetYear: (state) => {
      state.targetYear = null
    },
  },
});

export const {setDropdownYear, setTargetYear, resetTargetYear} = dropdownControlSlice.actions;

export const selectDropdownYear = (state: RootState) => state.dropdownControl.dropdownYear;
export const selectTargetYear = (state: RootState) => state.dropdownControl.targetYear;

export default dropdownControlSlice.reducer;
