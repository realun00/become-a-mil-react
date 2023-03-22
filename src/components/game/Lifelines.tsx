import React from "react";

import { useDispatch, useSelector } from "react-redux";

import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import GroupsIcon from "@mui/icons-material/Groups";

import {
  setHostInteracts,
  setHostText,
  setOpenDialogBox,
  setPlayerInteracts,
  setPlayerText,
} from "../../redux/slices/gameReducer";
import {
  selectCurrentQuestion,
  selectLifelines,
  setCallLifeline,
  setAskLifeline,
} from "../../redux/slices/playerReducer";

interface LifelinesProps {
  closeDrawer: () => void;
}

const Lifelines = (props: LifelinesProps) => {
  const dispatch = useDispatch();
  
  //select the current question and the lifelines
  const currentQuestion = useSelector(selectCurrentQuestion);
  const hasCallLifeline = useSelector(selectLifelines)?.call;
  const hasAskLifeline = useSelector(selectLifelines)?.ask;

  const callLifeline = () => {
    const allAnswers = currentQuestion?.all_answers;
    const randomAnswer = allAnswers[Math.floor(Math.random() * allAnswers.length)];

    props.closeDrawer();
    dispatch(setCallLifeline(false));
    dispatch(setPlayerInteracts(true));
    dispatch(setPlayerText("Let's call a friend"));

    setTimeout(() => {
      dispatch(setPlayerInteracts(false));
      dispatch(setPlayerText(""));
    }, 1500);

    setTimeout(() => {
      dispatch(setHostInteracts(true));
      dispatch(setHostText("Ok, let's call him."));
    }, 2000);

    setTimeout(() => {
      dispatch(setHostText(`Your friend's answer is: ${randomAnswer}`));
    }, 5000);

    setTimeout(() => {
      dispatch(setHostInteracts(false));
      dispatch(setHostText(""));
    }, 7000);
  };

  const askLifeline = () => {
    props.closeDrawer();
    dispatch(setAskLifeline(false));
    dispatch(setPlayerInteracts(true));
    dispatch(setPlayerText("Let's ask the audience"));

    setTimeout(() => {
      dispatch(setPlayerInteracts(false));
      dispatch(setPlayerText(""));
    }, 1500);

    setTimeout(() => {
      dispatch(setHostInteracts(true));
      dispatch(setHostText("Ok, let's ask them."));
    }, 2000);

    setTimeout(() => {
      dispatch(setOpenDialogBox(true));
    }, 5000);

    setTimeout(() => {
      dispatch(setHostInteracts(false));
      dispatch(setHostText(""));
    }, 7000);
  };

  return (
    <div className="py-3 px-3 d-flex align-items-center justify-content-evenly">
      <button className="lifeline-button">50/50</button>
      <button onClick={askLifeline} disabled={!hasAskLifeline} className="lifeline-button">
        <GroupsIcon />
      </button>
      <button onClick={callLifeline} disabled={!hasCallLifeline} className="lifeline-button">
        <PhoneEnabledIcon />
      </button>
    </div>
  );
};

export default Lifelines;
