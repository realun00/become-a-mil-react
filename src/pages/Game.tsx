import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useServices from "../hooks/useServices";
import useWindowSize from "../hooks/useWindowsSize";
import { selectData, selectIsLoading, setData, setIsLoading } from "../redux/slices/gameReducer";

const Game = () => {
  //Selectors in which the data will be stored
  const data = useSelector(selectData);
  const isLoading = useSelector(selectIsLoading);

  //Getting the width of the page from a custom hook
  const { width } = useWindowSize();
  //redux dispatch
  const dispatch = useDispatch();

  const { getQuestions } = useServices();

  useEffect(() => {
    //Get data api calls
    const getGameData = async () => {
      dispatch(setIsLoading(true));
      try {
        //Using axios all to make several calls simultaneously
        const all = await axios.all([
          getQuestions({ amount: 5, difficulty: "easy" }),
          getQuestions({ amount: 5, difficulty: "medium" }),
          getQuestions({ amount: 5, difficulty: "hard" }),
        ]);

        //save all the results
        const result = all.flatMap((call) => call?.data?.results);
        if (result && result.length) {
          dispatch(setData(result));
        }
      } catch (err: any) {
        if (!err?.response) {
          console.log("No server Response");
        } else {
          console.log("Unable to fetch data");
        }
      }
      dispatch(setIsLoading(false));
    };

    getGameData();
  }, [dispatch, getQuestions]);
  return <div>Game</div>;
};

export default Game;
