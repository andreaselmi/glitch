import React from "react";
import { Typography } from "@material-ui/core";
import MyButton from "./common/MyButton";

interface HorizontalListHeaderProps {
  error: string | null;
  title: string;
  retryAction: () => void;
  numberOfItems: number;
}

const HorizontalListHeader = ({
  error,
  title,
  retryAction,
  numberOfItems = 0,
}: HorizontalListHeaderProps) => {
  return (
    <>
      {error ? (
        <div>
          <Typography variant="h5" color="textPrimary">
            Error in retrieving data
          </Typography>
          <MyButton onClick={retryAction} name="Retry" />
        </div>
      ) : (
        <Typography variant="h5" color="textSecondary">
          {title} ({numberOfItems})
        </Typography>
      )}
    </>
  );
};

export default HorizontalListHeader;
