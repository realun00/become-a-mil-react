import React from "react";

import GameDrawer from "../other/GameDrawer";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import IconButton from "@mui/material/IconButton/IconButton";

const DrawerContainer = () => {
  const [open, setOpen] = React.useState(false);

  const winnings = [
    "1 Million",
    "500,000",
    "250,000",
    "125,000",
    "64,000",
    "32,000",
    "16,000",
    "8,000",
    "4,000",
    "2,000",
    "1,000",
    "500",
    "300",
    "200",
    "100",
  ];
  return (
    <React.Fragment>
      <GameDrawer openDrawer={open} setOpenDrawer={setOpen} winnings={winnings} />
      {!open ? (
        <div onClick={() => setOpen(true)} className="drawer-opener">
          <IconButton aria-label="open drawer">
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default DrawerContainer;
