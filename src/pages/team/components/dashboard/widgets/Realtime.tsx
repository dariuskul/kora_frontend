import { Box, Paper, Typography } from '@mui/material';
import { RealtimeUser } from 'pages/team/components/dashboard/widgets/RealtimeUser';
import React from 'react';

interface IRealTime {
  timers: Array<any>;
}

export const Realtime: React.FC<IRealTime> = ({ timers }) => {
  return (
    <Paper sx={{ marginTop: '2.5rem' }}>
      <Box p="1.5rem 1rem">
        Currently working employees
      </Box>
      <Box>
        {timers.map(item => (
          <RealtimeUser data={item} />
        ))}
      </Box>
    </Paper>
  );
}