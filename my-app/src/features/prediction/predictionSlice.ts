import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState, Status} from '../store';
import axios from 'axios';
import {Station} from "../station/stationSlice.ts";

export interface Prediction {
  id: string;
  timestamp: string;
  quantity: number;
  quality: number;
}

interface PredictionState {
  predictions: Prediction[];
  station: Station | null;
  status: Status;
  error: string | null;
}

const initialState: PredictionState = {
  predictions: [],
  station: null,
  status: 'idle',
  error: null,
};

export const fetchPredictionList = createAsyncThunk(
  'prediction/fetchPredictionList',
  async (stationId: string) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_ORIGIN}/api/stations/${stationId}/predictions/`);
    return response.data;
  }
);

const predictionSlice = createSlice({
  name: 'prediction',
  initialState,
  reducers: {
    setStation: (state, action: { payload: Station }) => {
      state.station = action.payload
    },
    resetPrediction: (state) => {
      state.predictions = []
      state.station = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPredictionList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPredictionList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.predictions = action.payload;
      })
      .addCase(fetchPredictionList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message ?? 'An error occurred';
      });
  },
});

export const selectPredictionList = (state: RootState) => state.prediction.predictions;
export const selectPredictionStation = (state: RootState) => state.prediction.station;
export const selectPredictionStatus = (state: RootState) => state.prediction.status;

export const {setStation, resetPrediction} = predictionSlice.actions;
export default predictionSlice.reducer;
