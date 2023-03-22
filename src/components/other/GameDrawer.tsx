import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { selectCurrentWinnings } from "../../redux/slices/playerReducer";
import { useSelector } from "react-redux";
import Lifelines from "../game/Lifelines";

const ListWinnings = ({ winnings }: { winnings: Array<string> }) => {
  //get playerCurrentWinnings
  const playerWinnings = useSelector(selectCurrentWinnings);

  return (
    <ul>
      {winnings.map((w, i, v) => {
        return (
          <li
            key={w}
            className={`d-flex justify-content-between align-items-center py-1 px-3 ${
              i === 0 || i === 5 || i === 10 ? "color-white" : "color-orange"
            } ${v.length - 1 - i === playerWinnings ? "color-black background-orange" : ""}`}
          >
            <span>{v.length - i}</span>
            <span>${w}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default function GameDrawer({
  openDrawer,
  setOpenDrawer,
  winnings,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<boolean>;
  winnings: Array<string>;
}) {
  const list = () => (
    <Box role="presentation" className="drawer-container">
      <Box className="d-flex align-items-center justify-content-end">
        <IconButton onClick={() => setOpenDrawer(false)} aria-label="open drawer">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Divider />
      <Lifelines closeDrawer={() => setOpenDrawer(false)}/>
      <ListWinnings winnings={winnings} />
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
