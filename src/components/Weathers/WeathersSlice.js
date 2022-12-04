import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  title: "Ташкент",
  weather: [],
  city: [],
  tempRange: undefined,
  error: false
}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    searchCity: (state, actions) => {
      state.title = actions.payload;
      state.error = false
    },
    weatherFetched: (state, actions) => {
      state.weather = actions.payload;
      state.error = false
    },
    cityFetched: (state, actions) => {
      state.city = actions.payload;
      state.error = false
    },
    tempFetched: (state, actions) => {
      state.tempRange = {...actions.payload};
      state.error = false
    },
    errorHandler: (state, actions) => {
      state.error = actions.payload
    }
  }
})

const {actions, reducer} = weatherSlice;

export default reducer;
export const {
  searchCity,
  weatherFetched,
  cityFetched,
  tempFetched,
  errorHandler
} = actions