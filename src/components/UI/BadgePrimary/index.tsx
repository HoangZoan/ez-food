import { Badge, Typography } from "@mui/material";
import React from "react";

interface Props {
  count: number;
  children: React.ReactNode;
}

const BadgePrimary = ({ count, children }: Props) => {
  return (
    <Badge
      badgeContent={
        <Typography color="white" fontWeight={700} variant="subtitle2">
          {count}
        </Typography>
      }
      color="primary"
      invisible={count === 0}
    >
      {children}
    </Badge>
  );
};

export default BadgePrimary;
