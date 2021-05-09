import React from "react";
import Typography from "@material-ui/core/Typography";

const HomeSection = () => {
  return (
    <div
      style={{
        minHeight: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" color="textPrimary">
        Hello World
      </Typography>
    </div>
  );
};

export default HomeSection;
