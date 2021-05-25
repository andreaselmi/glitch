import React from "react";
//material ui
import { Typography } from "@material-ui/core";
//components
import MyButton from "./common/MyButton";

interface DisplayErrorProps extends React.HTMLProps<HTMLDivElement> {
  showRetryButton: boolean;
  retryButtonText?: string;
  text: string;
  onClick?: () => void;
}

const DisplayError = ({
  retryButtonText = "Retry",
  showRetryButton,
  onClick,
  text,
  ...restProps
}: DisplayErrorProps) => {
  return (
    <div style={{ textAlign: "center", margin: "30px 0" }} {...restProps}>
      <Typography
        style={{ marginBottom: ".5em" }}
        variant="h5"
        color="textSecondary"
      >
        {text}
      </Typography>

      {showRetryButton && <MyButton name={retryButtonText} onClick={onClick} />}
    </div>
  );
};

export default DisplayError;
