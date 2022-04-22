import { Box, Typography } from "@mui/material";
import React from "react";
import { SelectReport } from "./components/SelectReport";

const REPORT_TYPES = [ { title: 'Tracking reports', link: '/reports/tracking' }]

export const Reports = () => {
  return (
    <Box>
      <Typography fontSize="1.5rem" variant="h3">
        Reports
      </Typography>
      <Typography fontSize="1.25rem" mt="0.5rem">Choose one of the reports</Typography>
      <Box mt="0.5rem" display="flex" gap="0.5rem">
      {REPORT_TYPES.map((item, idx) => (
        <SelectReport key={idx} {...item} />
      ))}
      </Box>
    </Box>
  );
};
