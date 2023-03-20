import { createSlice } from "@reduxjs/toolkit";

const gameReducer = createSlice({
  name: "game",
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    setData: (state, action): void => {
      state.data = action.payload;
    },
    setIsLoading: (state, action): void => {
      state.isLoading = action.payload;
    },
  },
});

export const { setData, setIsLoading } = gameReducer.actions;

export default gameReducer.reducer;

export const selectData = (state: any) => state?.game?.data;
export const selectIsLoading = (state: any) => state?.game?.isLoading;