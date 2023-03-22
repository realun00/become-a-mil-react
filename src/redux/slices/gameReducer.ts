import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  data: [],
  isLoading: false,
  openDialogBox: false,
  playerInteracts: false,
  hostInteracts: false,
  playerText: "",
  hostText: "",
  wonGame: false,
};

const gameReducer = createSlice({
  name: "game",
  initialState: intialState,
  reducers: {
    setData: (state, action): void => {
      state.data = action.payload;
    },
    setIsLoading: (state, action): void => {
      state.isLoading = action.payload;
    },
    setOpenDialogBox: (state, action): void => {
      state.openDialogBox = action.payload;
    },
    setPlayerInteracts: (state, action): void => {
      state.playerInteracts = action.payload;
    },
    setHostInteracts: (state, action): void => {
      state.hostInteracts = action.payload;
    },
    setPlayerText: (state, action): void => {
      state.playerText = action.payload;
    },
    setHostText: (state, action): void => {
      state.hostText = action.payload;
    },
    setWonGame: (state, action): void => {
      state.wonGame = action.payload;
    },
    resetGameState: () => intialState,
  },
});

export const {
  setData,
  setIsLoading,
  setOpenDialogBox,
  setPlayerInteracts,
  setHostInteracts,
  setPlayerText,
  setHostText,
  setWonGame,
  resetGameState,
} = gameReducer.actions;

export default gameReducer.reducer;

export const selectData = (state: any) => state?.game?.data;
export const selectIsLoading = (state: any) => state?.game?.isLoading;
export const selectOpenDialogBox = (state: any) => state?.game?.openDialogBox;
export const selectPlayerInteracts = (state: any) => state?.game?.playerInteracts;
export const selectHostInteracts = (state: any) => state?.game?.hostInteracts;
export const selectPlayerText = (state: any) => state?.game?.playerText;
export const selectHostText = (state: any) => state?.game?.hostText;
export const selectWonGame = (state: any) => state?.game?.wonGame;
