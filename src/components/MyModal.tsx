import React from "react";

//material ui
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

interface MyModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  container: {
    outline: "none",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const MyModal = ({ open, onClose, children }: MyModalProps) => {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.container}>{children}</div>
    </Modal>
  );
};

export default MyModal;
