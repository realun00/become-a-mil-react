import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Answers from "../components/game/Answers";
import Question from "../components/game/Question";

import useServices from "../hooks/useServices";
//import useWindowSize from "../hooks/useWindowsSize";

import {
  selectHostInteracts,
  selectIsLoading,
  selectOpenDialogBox,
  selectPlayerInteracts,
  selectWonGame,
  setData,
  setIsLoading,
} from "../redux/slices/gameReducer";
import { selectCurrentQuestion, setCurrentQuestion } from "../redux/slices/playerReducer";

import Dialogs from "../components/game/Dialogs";
import DrawerContainer from "../components/game/DrawerContainer";
import { shuffleAnswers } from "../models/configuration";
import InGameDialog from "../components/game/InGameDialog";
import ConfettiExplosion from "react-confetti-explosion";

const Game = () => {
  //Selectors in which the data will be stored
  const isLoading = useSelector(selectIsLoading);
  const isDialogOpened = useSelector(selectOpenDialogBox);
  const isGameWon = useSelector(selectWonGame);

  //check if the host/player interacts
  const hostInteracts = useSelector(selectHostInteracts);
  const playerInteracts = useSelector(selectPlayerInteracts);

  //redux dispatch
  const dispatch = useDispatch();

  //get the fetch function for questions
  const { getQuestions } = useServices();

  useEffect(() => {
    //Get data api calls
    const getGameData = async () => {
      dispatch(setIsLoading(true));
      try {
        //Using axios all to make several calls simultaneously
        const all = await axios.all([
          getQuestions({ difficulty: "easy" }),
          getQuestions({ difficulty: "medium" }),
          getQuestions({ difficulty: "hard" }),
        ]);

        //flat, map and save all the results
        //dispatch them to redux store
        const result = all.flatMap((call) => call?.data?.results);
        if (result && result.length) {
          const formattedData = result.map((e) => {
            return {
              ...e,
              all_answers: shuffleAnswers([e.correct_answer, ...e.incorrect_answers]),
            };
          });
          dispatch(setData(formattedData));
          dispatch(setCurrentQuestion(formattedData[0]));
        }
      } catch (err: any) {
        console.log(err);
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

  if (isLoading && !selectCurrentQuestion) {
    return <></>;
  } else {
    return (
      <React.Fragment>
        {!hostInteracts && !playerInteracts ? <DrawerContainer /> : ""}
        {isDialogOpened ? <InGameDialog /> : ""}
        {isGameWon && <ConfettiExplosion duration={3000} force={0.8} width={1600} particleCount={250} />}
        <Dialogs />
        <div className="bottom-container">
          <div className="container-xxl">
            <Question />
            <Answers />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default Game;
