import { Typography } from "@material-ui/core";
import React from "react";
import MyButton from "./common/MyButton";

interface DisplayErrorProps extends React.HTMLProps<HTMLDivElement> {
  error: boolean;
  retryButtonText?: string;
  text: string;
  onClick?: () => void;
}

const DisplayError = ({
  retryButtonText = "Retry",
  error,
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

      {error && <MyButton name={retryButtonText} onClick={onClick} />}
    </div>
  );
};

export default DisplayError;
