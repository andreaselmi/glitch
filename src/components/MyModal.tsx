import React from "react";
import Modal from "@material-ui/core/Modal";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { makeStyles, useTheme } from "@material-ui/core/styles";

interface MyModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MyModal = ({ open, onClose, children }: MyModalProps) => {
  const useStyles = makeStyles((theme) => ({
    container: {
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
