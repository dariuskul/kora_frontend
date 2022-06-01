import { Box, Paper, Typography } from '@mui/material';
import { TimeDisplay } from 'components/userInsights/topProjects/TopProjects';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface IStatistic {
  month: string;
  time: number;
}

interface IWorkingStatistics {
  statistics: Array<IStatistic>;
}

const normaliseData = (value: number) => {
  // convert miliseconds to hours
  const hours = Math.floor(value / 3600000);
  return `${hours}h`
}

export const WorkingStatistics: React.FC<IWorkingStatistics> = React.memo(({ statistics }) => {
  const { t } = useTranslation();
  if (!statistics) {
    return null;
  }

  const localiseMonth = (value: any) => {
    return `${t(`months.${value}`)}`;
  }
  return (
    <Box maxWidth="40rem" width="100%">
      <Paper>
        <Box borderRadius="0.25rem" padding="1rem 0" bgcolor="white">
          <Typography fontWeight="500" fontSize="1.5rem" mb="1rem" align="center">{t('monthlySummary')}</Typography>
          <Box width="100%" height="15rem">
            <ResponsiveContainer width="99%" height="100%">
              <LineChart
                margin={{ left: 16 }}
                height={300}
                data={statistics}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis tickFormatter={(value) => localiseMonth(value)} padding={{ left: 30, right: 30 }} fontSize="0.875rem" dataKey="month" />
                <YAxis tickFormatter={(value) => normaliseData(value)} fontSize="0.875rem" />
                <Tooltip content={({ active, payload, label }) => <TimeDisplay active={!!active} payload={payload} label={label} isMonthly />} />
                <Legend />
                <Line name={t('timeSpent')} stroke="#1976d2" dataKey="time" fill="#1976d2" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
})