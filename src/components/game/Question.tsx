import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentQuestion } from "../../redux/slices/playerReducer";
import { setHostInteracts } from "../../redux/slices/gameReducer";

const Question = () => {
  const textState = React.useMemo(() => ["istyping", "isnottyping"], []);

  const [typing, setTyping] = React.useState(textState[0]);
  const [typedQuestion, setTypedQuestion] = React.useState("");

  //Select the current question
  const question = useSelector(selectCurrentQuestion)?.question;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (question) {
      const timeout = setTimeout(() => {
        if (typing === "istyping" && typedQuestion !== question) {
          setTypedQuestion(question.slice(0, typedQuestion.length + 1));
        } else if (typedQuestion === question && typing === "istyping") {
          setTyping(textState[1]);
        } else if ((typedQuestion === question && typing === "isnottyping") || typing === "isnottyping") {
          setTypedQuestion("");
          setTyping(textState[0]);
        }
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      setTypedQuestion("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, typedQuestion, textState]);

  //Check if the host interacts at the moment
  React.useEffect(() => {
    if (typedQuestion === question && typing !== "istyping") {
      dispatch(setHostInteracts(false));
    }
  }, [dispatch, question, typedQuestion, typing]);

  React.useEffect(() => {
    if (typing === "istyping") {
      dispatch(setHostInteracts(true));
    }
  }, [dispatch, typing]);

  return <div dangerouslySetInnerHTML={{ __html: typedQuestion }} className="question-container my-3" />;
};

export default Question;
