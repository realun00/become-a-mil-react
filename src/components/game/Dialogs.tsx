import React from "react";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import {
  selectHostInteracts,
  selectHostText,
  selectPlayerInteracts,
  selectPlayerText,
} from "../../redux/slices/gameReducer";
import { useSelector } from "react-redux";

const Dialogs = () => {
  const hostInteracts = useSelector(selectHostInteracts);
  const playerInteracts = useSelector(selectPlayerInteracts);
  const hostText = useSelector(selectHostText);
  const playerText = useSelector(selectPlayerText);

  if (hostInteracts || playerInteracts) {
    return (
      <div className={`dialogs-container ${hostInteracts && !playerInteracts ? "justify-content-end" : ""}`}>
        {playerInteracts ? (
          <div className="bubble bubble-bottom-left">{playerText ?? <MoreHorizIcon className="animate-flicker" />}</div>
        ) : (
          ""
        )}
        {hostInteracts ? (
          <div className="bubble bubble-bottom-right">{hostText ? hostText : <MoreHorizIcon className="animate-flicker" />}</div>
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default Dialogs;
