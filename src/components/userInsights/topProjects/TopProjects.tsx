import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { convertTimeToHoursAndMinutes } from 'utils/timer';

interface ITopProject {
  id: number;
  name: string;
  time: number;
}
interface ITopProjects {
  topProjects?: Array<ITopProject>;
}

interface ITimeDisplay {
  active: boolean;
  payload: any;
  label: string;
  isMonthly?: boolean;
}


export const TimeDisplay: React.FC<ITimeDisplay> = React.memo(({ active, label, payload, isMonthly }) => {
  if (active && payload && payload.length) {
    const content = convertTimeToHoursAndMinutes(payload[0].value);
    return (
      <Paper>
        <Box borderRadius="0.625rem" p="0.5rem 1rem" ml="auto" bgcolor="white">
          {isMonthly && <Typography fontWeight="700">{label}</Typography>}
          <Box gap="0.5rem" display="flex">
            <Typography>Total time:</Typography>
            <Typography fontWeight="700">{`${content.hours}h ${content.minutes}m`}</Typography>
          </Box>
        </Box>
      </Paper>
    );
  }
  return null;
})

export const TopProjects: React.FC<ITopProjects> = React.memo(({ topProjects }) => {
  return (
    <Box maxWidth="40rem" width="100%">
      <Paper>
        <Box borderRadius="0.25rem" padding="1rem 0" bgcolor="white">
          <Typography fontWeight="500" fontSize="1.5rem" mb="1rem" align="center">Top projects</Typography>
          <Box width="100%" height="15rem">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart
                layout="vertical"
                margin={{ left: 16 }}
                height={300}
                data={topProjects}
              >
                <CartesianGrid strokeDasharray="4 3" />
                <XAxis fontSize="0.875rem" type="number" hide />
                <YAxis fontSize="0.875rem" type="category" dataKey="name" />
                <Tooltip content={({ active, payload, label }) => <TimeDisplay active={active} payload={payload} label={label} />} />
                <Bar stroke="#1976d2" dataKey="time" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
});