import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState, Status} from '../store';
import axios from 'axios';


export interface Station {
  id: string;
  name: string;
  area: string;
  latitude: number;
  longitude: number;
}

export interface Myeongdang extends Station {
  avg_quantity: number;
  avg_quality: number;
  luck: '대흉' | '흉' | '평' | '길' | '대길';
}

interface StationState {
  stations: Station[];
  myeongdangs: Myeongdang[];
  stationStatus: Status;
  myeongdangStatus: Status;
  error: string | null;
}

const initialState: StationState = {
  stations: [],
  myeongdangs: [],
  stationStatus: 'idle',
  myeongdangStatus: 'idle',
  error: null,
};

export const fetchStationList = createAsyncThunk(
  'station/fetchStationList',
  async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_ORIGIN}/api/stations/`, {
      withCredentials: true,
    });
    console.log(response.data)
    return response.data;
  }
);

export const fetchMyeongdangList = createAsyncThunk(
  'station/fetchMyeongdangList',
  async (year: number) => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_ORIGIN}/api/stations/`, {
      params: {
        year: year
      },
      withCredentials: true,
    });
    console.log(response.data)
    return response.data;
  }
);

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    resetMyeongdang: (state) => {
      state.myeongdangs = []
      state.myeongdangStatus = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStationList.pending, (state) => {
        state.stationStatus = 'loading'
      })
      .addCase(fetchStationList.fulfilled, (state, action) => {
        state.stationStatus = 'succeeded'
        state.stations = action.payload
      })
      .addCase(fetchStationList.rejected, (state, action) => {
        state.stationStatus = 'failed'
        state.error = action.error?.message ?? 'An error occurred fetching station list'
      });
    builder
      .addCase(fetchMyeongdangList.pending, (state) => {
        state.myeongdangStatus = 'loading'
      })
      .addCase(fetchMyeongdangList.fulfilled, (state, action) => {
        state.myeongdangStatus = 'succeeded'
        state.myeongdangs = action.payload
      })
      .addCase(fetchMyeongdangList.rejected, (state, action) => {
        state.myeongdangStatus = 'failed'
        state.error = action.error?.message ?? 'An error occurred fetching myeongdang list'
      })
  },
});

export const selectStationList = (state: RootState) => state.station.stations
export const selectMyeongdangList = (state: RootState) => state.station.myeongdangs
export const selectMyeongdangStatus = (state: RootState) => state.station.myeongdangStatus
export const {resetMyeongdang} = stationSlice.actions

export default stationSlice.reducer;

