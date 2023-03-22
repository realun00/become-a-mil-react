import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOpenDialogBox, setOpenDialogBox } from "../../redux/slices/gameReducer";
import { selectCurrentQuestion } from "../../redux/slices/playerReducer";
import GameDialog from "../other/GameDialog";

interface CurrentQuestionInterface {
  all_answers: Array<string>;
  category: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
  difficulty: string;
}

interface DialogBodyInterface {
  currentQuestion: CurrentQuestionInterface;
}

function DialogBody<T extends DialogBodyInterface>(properties: T) {
  const { currentQuestion } = properties;

  //save the values
  const allAnswers = currentQuestion?.all_answers;
  const correctAnswer = currentQuestion?.correct_answer;
  const correctAnswerIndex = allAnswers.indexOf(correctAnswer);

  //map through the answers
  return (
    <React.Fragment>
      {allAnswers.map((e, i) => {
        //create an object for every answer
        const answer = {
          name: e,
          option: "",
          percent: 0,
        };

        //set the option
        if (i === 0) {
          answer.option = "A";
        } else if (i === 1) {
          answer.option = "B";
        } else if (i === 2) {
          answer.option = "C";
        } else {
          answer.option = "D";
        }

        //set the percent
        if (i === correctAnswerIndex) {
          answer.percent = 70;
        } else {
          answer.percent = Math.floor(Math.random() * 30);
        }

        if (answer.name === "deleted-50") {
          return <div key={answer.option} style={{ display: "none" }} />;
        }
        return (
          <div key={answer.option} className="d-flex flex-column align-items-center">
            <div className="growing-bar-container">
              <span style={{ position: "absolute", bottom: `${answer.percent + 2}%` }}>{answer.percent}%</span> <br />
              <div className="growing-bar" style={{ height: `${answer.percent}%` }} />
            </div>
            <br />
            <span>{answer.option}</span>
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default function InGameDialog() {
  const openDialog = useSelector(selectOpenDialogBox);
  const currentQuestion = useSelector(selectCurrentQuestion);
  const dispatch = useDispatch();

  return (
    <div>
      {currentQuestion ? (
        <GameDialog
          open={openDialog}
          onClose={() => dispatch(setOpenDialogBox(false))}
          title="Ask audience lifeline"
          body={<DialogBody currentQuestion={currentQuestion} />}
        />
      ) : (
        ""
      )}
    </div>
  );
}
