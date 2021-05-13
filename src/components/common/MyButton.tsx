import React from "react";

import { Button, ButtonProps } from "@material-ui/core";

interface MyButtonProps extends ButtonProps {
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
