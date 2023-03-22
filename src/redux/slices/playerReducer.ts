import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  name: "",
  currentWinnings: 0,
  currentQuestion: undefined,
  lifelines: {
    call: true,
    ask: true,
    fiftyFifty: true,
  },
};

const playerReducer = createSlice({
  name: "player",
  initialState: intialState,
  reducers: {
    setName: (state, action): void => {
      state.name = action.payload;
    },
    setCurrentWinnings: (state, action): void => {
      state.currentWinnings = action.payload;
    },
    setCurrentQuestion: (state, action): void => {
      state.currentQuestion = action.payload;
    },
    setCallLifeline: (state, action): void => {
      state.lifelines.call = action.payload;
    },
    setAskLifeline: (state, action): void => {
      state.lifelines.ask = action.payload;
    },
    setFiftyFiftyLifeline: (state, action): void => {
      state.lifelines.fiftyFifty = action.payload;
    },
    resetPlayerState: () => intialState,
  },
});

export const {
  setName,
  setCurrentWinnings,
  setCurrentQuestion,
  setCallLifeline,
  setAskLifeline,
  setFiftyFiftyLifeline,
  resetPlayerState,
} = playerReducer.actions;

export default playerReducer.reducer;

export const selectName = (state: any) => state?.player?.name;
export const selectCurrentWinnings = (state: any) => state?.player?.currentWinnings;
export const selectCurrentQuestion = (state: any) => state?.player?.currentQuestion;
export const selectLifelines = (state: any) => state?.player?.lifelines;
