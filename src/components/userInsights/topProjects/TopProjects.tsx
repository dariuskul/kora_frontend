import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
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
  const { t } = useTranslation();
  if (active && payload && payload.length) {
    const content = convertTimeToHoursAndMinutes(payload[0].value);
    return (
      <Paper>
        <Box borderRadius="0.625rem" p="0.5rem 1rem" ml="auto" bgcolor="white">
          {isMonthly && <Typography fontWeight="700">{t(`months.${label}`)}</Typography>}
          <Box gap="0.5rem" display="flex">
            <Typography>{t('totalTime')}</Typography>
            <Typography fontWeight="700">{`${content.hours}h ${content.minutes}m`}</Typography>
          </Box>
        </Box>
      </Paper>
    );
  }
  return null;
})

export const TopProjects: React.FC<ITopProjects> = React.memo(({ topProjects }) => {
  const { t } = useTranslation();
  // show max 5 projects
  const topProjectsToDisplay = topProjects?.slice(0, 5);
  return (
    <Box maxWidth="40rem" width="100%">
      <Paper>
        <Box borderRadius="0.25rem" padding="1rem 0" bgcolor="white">
          <Typography fontWeight="500" fontSize="1.5rem" mb="1rem" align="center">{t('topProjects')}</Typography>
          <Box width="100%" height="15rem">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart
                layout="vertical"
                margin={{ left: 30 }}
                height={300}
                data={topProjectsToDisplay}
              >
                <CartesianGrid strokeDasharray="4 3" />
                <XAxis fontSize="0.875rem" type="number" hide />
                <YAxis fontSize="0.875rem" type="category" dataKey="name" />
                <Tooltip content={({ active, payload, label }) => <TimeDisplay active={!!active} payload={payload} label={t(label)} />} />
                <Bar stroke="#1976d2" dataKey="time" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
});