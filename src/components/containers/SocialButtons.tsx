import React from "react";
import MyButton, { MyButtonProps } from "../common/MyButton";
import { makeStyles } from "@material-ui/core";

interface SocialButtonsProps {
  handleGoogle: () => void;
  handleFacebook: () => void;
}

const SocialButtons = ({
  handleGoogle,
  handleFacebook,
}: SocialButtonsProps) => {
  const useStyle = makeStyles({
    googleButton: {
      color: "#DB4437",
      borderColor: "#DB4437",
    },
    facebookButton: {
      marginTop: 10,
      color: "#4267B2",
      borderColor: "#4267B2",
    },
    socialContainer: {
      display: "flex",
      flexDirection: "column",
    },
  });

  const classes = useStyle();

  return (
    <div className={classes.socialContainer}>
      <MyButton
        startIcon={<i className="fab fa-google"></i>}
        name="Sign Up With Google"
        variant="outlined"
        className={classes.googleButton}
        onClick={handleGoogle}
      />
      <MyButton
        startIcon={<i className="fab fa-facebook"></i>}
        name="Sign In With Facebook"
        variant="outlined"
        className={classes.facebookButton}
        onClick={handleFacebook}
      />
    </div>
  );
};

export default SocialButtons;
