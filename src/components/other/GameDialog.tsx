import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, DialogActions, DialogContent, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  body: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

function GameDialog(props: DialogProps) {
  const { onClose, open, title, body } = props;

  const handleClose = (event: Event, reason: string) => {
    if (reason && reason === "backdropClick") return;
    onClose();
  };

  return (
    <Dialog className="lifeline-dialog" TransitionComponent={Transition} keepMounted open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default GameDialog;
