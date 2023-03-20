import { createSlice } from "@reduxjs/toolkit";

const playerReducer = createSlice({
  name: "player",
  initialState: {
    data: [],
    isLoading: false,
  },
  reducers: {
    setData: (state, action): void => {
      state.data = action.payload;
    },
  },
});

export const { setData } = playerReducer.actions;

export default playerReducer.reducer;

export const selectData = (state: any) => state?.player?.data;