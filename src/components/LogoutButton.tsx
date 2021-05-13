import React from "react";

import Button from "@material-ui/core/Button";

interface LogoutButtonProps {
  onClick: () => void;
  className?: string;
}

const LogoutButton = ({
  onClick,
  className,
  ...restProps
}: LogoutButtonProps) => {
  return (
    <Button
      className={className}
      color="primary"
      onClick={onClick}
      style={{
        height: 35,
      }}
      variant="contained"
      {...restProps}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
