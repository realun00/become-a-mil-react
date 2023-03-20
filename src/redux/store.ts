import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./slices/gameReducer";
import playerReducer from "./slices/playerReducer";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    game: gameReducer,
  },
  devTools: true,
});