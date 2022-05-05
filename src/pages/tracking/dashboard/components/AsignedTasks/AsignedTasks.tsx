import { Box, Paper, Typography } from '@mui/material';
import { TasksList } from 'pages/tracking/dashboard/components/AsignedTasks/components/TasksList';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchUserTasks } from 'services/tracking.service';
import { TApiTaskItem } from 'store/types/Task';

export const AssignedTasks = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Array<TApiTaskItem>>([]);
  useEffect(() => {
    const test = async () => {
      const result = await fetchUserTasks();
      setTasks(result.data);
    }
    test();
  }, [])
  return (
    <Box margin="1rem auto 0" maxWidth="40rem">
      <Paper elevation={5}>
        <Box p="1rem">
          <Typography fontSize="1.5rem" fontWeight="500" align="center" variant="h5">{t('myTasks')}</Typography>
        </Box>
        <TasksList tasks={tasks || []} />
      </Paper>
    </Box>
  )
}
