import React from "react";
import { useDispatch } from "react-redux";
import { resetGameState } from "../redux/slices/gameReducer";
import {
  resetPlayerState,
  setAskLifeline,
  setCallLifeline,
  setCurrentQuestion,
  setCurrentWinnings,
  setFiftyFiftyLifeline,
  setName,
} from "../redux/slices/playerReducer";

const useGame = () => {
  const dispatch = useDispatch();
  function clearState() {
    // dispatch(setAskLifeline(true));
    // dispatch(setCallLifeline(true));
    // dispatch(setFiftyFiftyLifeline(true));
    // dispatch(setCurrentQuestion(undefined));
    // dispatch(setCurrentWinnings(100));
    // dispatch(setName(""));
    dispatch(resetPlayerState());
    dispatch(resetGameState());
  }

  return { clearState };
};

export default useGame;
