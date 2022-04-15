import { Box } from "@mui/material";
import React from "react";

export const LayoutPublic: React.FC = ({ children }) => {
  return (
    <Box bgcolor="#FBFCFF">
      {children}
    </Box>
  )
};
