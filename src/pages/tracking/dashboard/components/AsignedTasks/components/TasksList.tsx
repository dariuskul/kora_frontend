import { Box, styled, Typography } from '@mui/material';
import { TaskTimer } from 'components/timer/TaskTimer';
import { useQuery } from 'hooks/useQuery';
import React from 'react';
import { TApiTaskItem } from 'store/types/Task';

interface ITasksList {
  tasks: Array<TApiTaskItem>;
}

export const TasksList: React.FC<ITasksList> = ({ tasks }) => {
  const { isTablet } = useQuery();
  return (
    <Box maxHeight="30rem" overflow=" hidden scroll" padding="0 0.875rem">
      {tasks.map((task) => (
        <StyledBox minHeight="4.25rem" alignItems="center" sx={{ cursor: 'pointer' }} p="0.75rem 0" justifyContent={isTablet ? 'space-between' : 'flex-start'} borderBottom="1px dashed #e8e8e8" gap="0.5rem" display="flex">
          <Typography fontSize={isTablet ? '0.875rem' : '1rem'} fontWeight="500">{task.description}</Typography>
          <Box alignItems="center" display="flex" flexDirection="row">
            {task.project && <ProjectName textAlign={isTablet ? 'right' : 'left'} sx={{ cursor: 'pointer' }} fontSize="0.875rem" color="grey">#{task.project.name}</ProjectName>}
            {isTablet && <TaskTimer timer={task} />}
          </Box>
          {!isTablet && <StyledBox display="none" id="timer">
            <TaskTimer timer={task} />
          </StyledBox>}
        </StyledBox>
      ))}
    </Box>
  )
}

const StyledBox = styled(Box)({
  '&:hover': {
    '& #timer': {
      display: 'block',
    },
  },
});


const ProjectName = styled(Typography)({
  transition: 'opacity 0.2s ease-in-out',
  '&:hover': {
    opacity: 0.5,
  }
})