import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Statistics } from './components/Statistics';
import { getDashBoard } from 'services/tracking.service';
import { TopProjects } from 'components/userInsights/topProjects/TopProjects';
import { WorkingStatistics } from 'components/userInsights/lastMonths/WorkingStatistics';
import { AssignedTasks } from 'pages/tracking/dashboard/components/AsignedTasks/AsignedTasks';

export const DashBoard = () => {
  const [info, setInfo] = useState<any>();
  useEffect(() => {
    const getDashBoardInfo = async () => {
      const info = await getDashBoard();
      setInfo(info.data);
    }
    getDashBoardInfo();
  }, []);
  return (
    <Box>
      <Statistics />
      <Box margin="1.5rem auto 0" alignItems="center" width="100%" display="flex" gap="2rem" flexWrap="wrap">
        <TopProjects topProjects={info?.topProjects || []} />
        <WorkingStatistics statistics={info?.last6Months || []} />
      </Box>
      <AssignedTasks />
    </Box>
  )
}