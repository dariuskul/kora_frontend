import { Box, Typography } from '@mui/material';
import React from 'react';
import { formatTimer } from 'utils/timer';

interface IStopWatch {
  time: number;
}

export const StopWatch: React.FC<IStopWatch> = ({ time }) => {
  const { hours, minutes, seconds } = formatTimer(time);
  return (
    <Box>
      <Typography fontWeight="600" fontSize="2rem" component="span">
        {hours}:
      </Typography>
      <Typography fontWeight="600" fontSize="2rem" component="span">
        {minutes}:
      </Typography>
      <Typography fontWeight="600" fontSize="2rem" component="span">
        {seconds}
      </Typography>
    </Box>
  )
}