import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { Statistics } from './components/Statistics';
import { getDashBoard } from 'services/tracking.service';
import { TopProjects } from 'components/userInsights/topProjects/TopProjects';
import { WorkingStatistics } from 'components/userInsights/lastMonths/WorkingStatistics';
import { AssignedTasks } from 'pages/tracking/dashboard/components/AsignedTasks/AsignedTasks';
import { useTranslation } from 'react-i18next';

export const DashBoard = () => {
  const [info, setInfo] = useState<any>();
  const { t } = useTranslation();
  useEffect(() => {
    const getDashBoardInfo = async () => {
      const info = await getDashBoard();
      setInfo(info.data);
    }
    getDashBoardInfo();
  }, []);

  const localliseTopProjectsDate = (topProjects: any) => {
    const newTopProjects = topProjects.map((project: any) => {
      const newProject = { ...project };
      newProject.startDate = new Date(project.startDate).toLocaleDateString();
      newProject.endDate = new Date(project.endDate).toLocaleDateString();
      return newProject;
    });
    return newTopProjects;
  }

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