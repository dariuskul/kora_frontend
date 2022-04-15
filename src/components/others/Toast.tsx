import React from "react"

import { Box, Typography } from "@mui/material"

interface IToast {
  message: string;
}

export const Toast: React.FC<IToast> = ({ message }) => {
  return (
    <Box>
      <Typography fontSize="0.875rem">{message}</Typography>
    </Box>
  )
}