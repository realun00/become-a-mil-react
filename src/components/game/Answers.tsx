import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCurrentQuestion,
  selectCurrentWinnings,
  setCurrentWinnings,
  setCurrentQuestion,
  //selectLifelines,
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
import useGame from "../../hooks/useGame";

const Answers = () => {
  //const [randomIncorrect, setRandomIncorrect] = React.useState("");
  //Get all questions
  const allQuestions = useSelector(selectData);
  //Get all answers
  const allAnswers = useSelector(selectCurrentQuestion)?.all_answers;
  //Get the correct answers
  const correctAnswer = useSelector(selectCurrentQuestion)?.correct_answer;
  //Get all incorrect answers
  //const incorrectAnswers = useSelector(selectCurrentQuestion)?.incorrect_answers;
  //Get current winnings
  const currentWinnings = useSelector(selectCurrentWinnings);

  //Check if the host/player interacts
  const hostInteracts = useSelector(selectHostInteracts);
  const playerInteracts = useSelector(selectPlayerInteracts);

  //Check if the user used the 50/50 lifeline
  //const hasFiftyLifeline = useSelector(selectLifelines)?.fiftyFifty;

  //clear state from custom hook
  const { clearState } = useGame();

  const dispatch = useDispatch();

  //Handle click event for the answer
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLInputElement;
    //set players interaction to true and set the value from the answer to the player's bubble text
    dispatch(setPlayerInteracts(true));
    dispatch(setPlayerText(target.value));

    if (correctAnswer === target.value) {
      //add correct-answer class to the classlist and start interaction as a host
      setTimeout(() => {
        dispatch(setHostInteracts(true));
        dispatch(setHostText("That's correct!"));
        target.classList.add("correct-answer");
      }, 1000);

      //if currentWinnings is fewer than 14 continue the game
      //if it's equal - finish the game and congratulate the player
      //clear the state at the end
      setTimeout(() => {
        if (currentWinnings < 14) {
          dispatch(setCurrentWinnings(currentWinnings + 1));
          dispatch(setCurrentQuestion(allQuestions[currentWinnings + 1]));
        } else {
          dispatch(setWonGame(true));
          dispatch(setHostText("Congratulations, you've become a millionaire!"));
          clearState();
        }
      }, 2000);
    } else {
      //Show the incorrect bubble and add wrong-answer to the classlist
      setTimeout(() => {
        dispatch(setHostInteracts(true));
        dispatch(setHostText(`Incorrect answer, the correct one is ${correctAnswer}`));
        target.classList.add("wrong-answer");
      }, 1000);

      //clear the state
      setTimeout(() => {
        clearState();
        target.classList.remove("wrong-answer");
        target.blur();
      }, 2000);
    }

    //Clear the interactions and texts
    setTimeout(() => {
      dispatch(setPlayerText(""));
      dispatch(setHostText(""));
      dispatch(setHostInteracts(false));
      dispatch(setPlayerInteracts(false));
    }, 2000);
  };

  // React.useEffect(() => {
  //   if (incorrectAnswers?.length) {
  //     setRandomIncorrect(incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)]);
  //   }
  // }, [incorrectAnswers]);

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
            if (answer === "deleted-50") {
              return (
                <div key={i} className="col-6 mb-2">
                  <button className="answer-button" />
                </div>
              );
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
