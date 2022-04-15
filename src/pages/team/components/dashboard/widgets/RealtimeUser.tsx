import { Box, Typography } from '@mui/material';
import { useStopWatch } from 'hooks/use-stopwatch';
import { StopWatch } from 'pages/tracking/timer/StopWatch';
import React, { useEffect } from 'react';
import { getRunningTimerTime } from 'utils/timer';

interface IRealtimeUser {
  data: any;
}

export const RealtimeUser: React.FC<IRealtimeUser> = ({ data }) => {
  const { time, running, setRunning, setTime } = useStopWatch();
  useEffect(() => {

    if (data) {
      const time = getRunningTimerTime(
        data.startDate,
        new Date().toString()
      );
      setTime(time);
    }

  }, [data])
  return (
    <Box borderBottom="1px solid" p="0.5rem 1rem 0">
      <Typography textTransform="uppercase" fontWeight="700" fontSize="1.25rem">{data?.user?.fullName}</Typography>
      <Box alignItems="center" display="flex">
        <Box flex="1">
          <Typography fontWeight="600" color="black" flex="1">{data.task.description}</Typography>
          <Typography color="grey" fontSize="0.875rem" flex="1">#{data.task.project.name}</Typography>
        </Box>
        <StopWatch time={time} />
      </Box>
    </Box>
  );
};