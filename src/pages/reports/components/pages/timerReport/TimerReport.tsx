import { Box, Typography } from "@mui/material";
import React from "react";
import { Filters } from "./components/Filters";

export const TimerReport = () => {
  return (
    <Box>
      <Typography fontSize="1.5rem" variant="h3">
        Tracking reports
      </Typography>
      <Filters />
    </Box>
  );
};
