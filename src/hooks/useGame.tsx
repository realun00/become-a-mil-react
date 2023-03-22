import { useDispatch } from "react-redux";
import { resetGameState } from "../redux/slices/gameReducer";
import { resetPlayerState } from "../redux/slices/playerReducer";

const useGame = () => {
  const dispatch = useDispatch();
  function clearState() {
    dispatch(resetPlayerState());
    dispatch(resetGameState());
  }

  return { clearState };
};

export default useGame;
