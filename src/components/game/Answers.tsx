import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentQuestion,
  selectCurrentWinnings,
  setCurrentWinnings,
  setCurrentQuestion,
} from "../../redux/slices/playerReducer";

import {
  selectData,
  selectHostInteracts,
  selectPlayerInteracts,
  setHostInteracts,
  setHostText,
  setPlayerInteracts,
  setPlayerText,
  setWonGame,
} from "../../redux/slices/gameReducer";

const Answers = () => {
  //Select the correct answers
  const correctAnswer = useSelector(selectCurrentQuestion)?.correct_answer;
  //Select all answers
  const allAnswers = useSelector(selectCurrentQuestion)?.all_answers;
  //Select current winnings
  const currentWinnings = useSelector(selectCurrentWinnings);

  //check if the host/player interacts
  const hostInteracts = useSelector(selectHostInteracts);
  const playerInteracts = useSelector(selectPlayerInteracts);

  //Get the data
  const allQuestions = useSelector(selectData);

  const dispatch = useDispatch();

  //Handle click event for the answer
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    dispatch(setPlayerInteracts(true));
    dispatch(setPlayerText(target.value));

    if (correctAnswer === target.value) {
      setTimeout(() => {
        dispatch(setHostInteracts(true));
        dispatch(setHostText("That's correct!"));
        target.classList.add("correct-answer");
      }, 1000);

      setTimeout(() => {
        if (currentWinnings < 14) {
          dispatch(setCurrentWinnings(currentWinnings + 1));
          dispatch(setCurrentQuestion(allQuestions[currentWinnings + 1]));
        } else {
          dispatch(setWonGame(true));
          dispatch(setHostText("Congratulations, you've become a millionaire!"));
          dispatch(setCurrentWinnings(0));
          dispatch(setCurrentQuestion(allQuestions[0]));
        }
      }, 2000);
    } else {
      setTimeout(() => {
        dispatch(setHostInteracts(true));
        dispatch(setHostText(`Incorrect answer, the correct one is ${correctAnswer}`));
        target.classList.add("wrong-answer");
      }, 1000);

      setTimeout(() => {
        dispatch(setCurrentWinnings(0));
        dispatch(setCurrentQuestion(allQuestions[0]));
        target.classList.remove("wrong-answer");
        target.blur();
      }, 2000);
    }

    setTimeout(() => {
      dispatch(setPlayerText(""));
      dispatch(setHostText(""));
      dispatch(setHostInteracts(false));
      dispatch(setPlayerInteracts(false));
    }, 2000);
  };

  return (
    <div>
      <div className="row">
        {allAnswers &&
          allAnswers.map((answer: any, i: number) => {
            let label = "";
            if (i === 0) {
              label = "A)";
            } else if (i === 1) {
              label = "B)";
            } else if (i === 2) {
              label = "C)";
            } else {
              label = "D)";
            }
            return (
              <div key={answer} className="col-6 mb-2">
                <button
                  value={answer}
                  onClick={handleClick}
                  disabled={hostInteracts || playerInteracts}
                  className="answer-button"
                >
                  <span className={answer ? "answer-button-text" : ""}>
                    {label} {answer}
                  </span>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Answers;
