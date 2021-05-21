/*
Simple material ui button
*/

import React from "react";

import { Button, ButtonProps } from "@material-ui/core";

export interface MyButtonProps extends ButtonProps {
  name: string;
}

const MyButton = ({ name, ...restProps }: MyButtonProps) => {
  return (
    <Button color="primary" variant="contained" {...restProps}>
      {name}
    </Button>
  );
};

export default MyButton;
