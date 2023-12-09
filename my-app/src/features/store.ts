import {configureStore} from '@reduxjs/toolkit';
import stationReducer from './station/stationSlice.ts';
import predictionReducer from './prediction/predictionSlice.ts';
import dropdownControlReducer from './dropdownControl/dropdownControlSlice.ts'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    station: stationReducer,
    prediction: predictionReducer,
    dropdownControl: dropdownControlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;