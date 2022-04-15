import { Box, IconButton } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'store/selectors';
import { IProjectEntry, TApiTaskItem } from 'store/types/Task';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAppThunkDispatch } from 'store/store';
import { startTask, stopTask } from 'store/tasks/actions';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils/error';
import { Toast } from 'components/others/Toast';

interface ITaskTimer {
  timer: TApiTaskItem;
}

export const TaskTimer: React.FC<ITaskTimer> = ({ timer }) => {
  const { currentTimer } = useAppSelector(s => s.tasksState);
  const dispatch = useAppThunkDispatch();

  const handleStart = async (e: any) => {
    e.stopPropagation();
    try {
      await dispatch(startTask(timer.id)).unwrap();
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />);
    }
  };

  const handleStop = async (e: any) => {
    e.stopPropagation();
    try {
      await dispatch(stopTask()).unwrap();
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />);
    }
  };


  if (!timer) {
    return null;
  }

  if (timer.id === currentTimer?.task?.id) {
    return (
      <Box sx={{ zIndex: '99999 !important' }}>
        <IconButton onClick={(e) => handleStop(e)}>
          <StopCircleIcon width="1rem" sx={{ color: 'red' }} />
        </IconButton>
      </Box>
    )
  }

  return (
    <Box>
      <IconButton onClick={(e) => handleStart(e)}>
        <PlayCircleOutlineIcon width="1rem" sx={{ color: 'green' }} />
      </IconButton>
    </Box>
  )
}