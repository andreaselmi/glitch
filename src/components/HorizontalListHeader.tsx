import React from "react";
import { Container, Typography } from "@material-ui/core";
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
    <div style={{ margin: "20px 0" }}>
      {error ? (
        <div>
          <Typography variant="h5" color="textPrimary">
            Error in retrieving data
          </Typography>
          <MyButton onClick={retryAction} name="Retry" />
        </div>
      ) : (
        <Container maxWidth="xl">
          <Typography variant="h5" color="textSecondary">
            {title} ({numberOfItems})
          </Typography>
        </Container>
      )}
    </div>
  );
};

export default HorizontalListHeader;
