import { Box, Typography } from '@mui/material';
import React from 'react';
import { ITimeEntry } from 'store/types/Task';
import { calculateTotalTaskTime, formatTimer } from 'utils/timer';

interface ITaskTime {
  timeSheets: Array<any>;
}

export const TaskTime: React.FC<ITaskTime> = React.memo(({ timeSheets }) => {

  const time = calculateTotalTaskTime(timeSheets);
  const { hours, minutes } = formatTimer(time);

  return (
    <Box>
      <Typography>{hours}h {minutes}m</Typography>
    </Box>
  )
})