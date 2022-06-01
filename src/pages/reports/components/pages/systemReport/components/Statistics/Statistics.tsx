import { Box, Button, Divider, Divider, Stack, Typography } from '@mui/material';
import { EditDurationModal } from 'pages/reports/components/pages/systemReport/components/Statistics/EditDurationModal';
import { UserItem } from 'pages/reports/components/pages/systemReport/components/UserItem/UserItem';
import React, { useState } from 'react';
import { editTaskTimer } from 'services/tracking.service';
import { TApiProjectItem } from 'store/types/Project';
import { IUser } from 'store/types/User';
interface IResult {
  day: string;
  time: string;
  tasks: Array<{ task: string, taskId: number, time: string, timers: Array<any> }>;
}

interface IStatistics {
  user: IUser;
  totalTimeCalc: string;
  groupedTasksByDay: Array<Array<IResult>>;
}

export const Statistics: React.FC<IStatistics> = ({ groupedTasksByDay, user, totalTimeCalc }) => {
  const [openModal, setOpenModal] = useState(false);
  const [object, setObject] = useState<any>();
  const handleTimeClick = async (duration: string, date: string, taskId: number) => {
    setObject({ duration, date, taskId, userId: user.id });
    setOpenModal(true);
  }
  return (
    <Box>
      <Stack gap="0.5rem" flexWrap="wrap" flexDirection="row" mt="0.5rem" >
        <Typography fontSize="1.5rem">{user.fullName}</Typography>
        <Typography fontWeight="500" fontSize="1.5rem">{totalTimeCalc}h </Typography>
      </Stack>
      <Divider sx={{ marginBottom: '0.5rem' }} />
      <Stack maxWidth="31.25rem">
        {groupedTasksByDay.length && (
          groupedTasksByDay[0].map((item: IResult, index) => (
            <Box borderBottom="1px ">
              <Stack direction='row' justifyContent='space-between'>
                <Typography fontWeight="600" fontSize="1.25rem">{item.day}</Typography>
                <Typography fontWeight="600" fontSize="1.25rem">{item.time}</Typography>
              </Stack>
              {item.tasks.map((task) => (
                <Stack justifyContent="space-between" spacing='0.5rem' direction='row'>
                  <Typography>{task.task}</Typography>
                  <Button onClick={() => handleTimeClick(task.time, item.day, task.taskId)}>
                    <Typography fontWeight="500">{task.time}</Typography>
                  </Button>
                </Stack>
              ))}
            </Box>

          ))
        )}
      </Stack>
      {object && <EditDurationModal currentObject={object} open={openModal} onClose={() => setOpenModal(false)} />}
    </Box>
  )
}