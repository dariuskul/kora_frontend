import { Typography, Box, styled, Tooltip } from '@mui/material';
import { TaskTimer } from 'components/timer/TaskTimer';
import { ROUTES } from 'constants/routes';
import moment from 'moment';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { openEditModal } from 'store/modals/modalSlice';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';
import { IProjectEntry } from 'store/types/Task';
import { formatTime, groupTimersByTask } from 'utils/timer';

interface IDayEntry {
  day: string;
  times: Array<IProjectEntry>;
}

export const jiraImage = `data:image/svg+xml;charset=utf-8,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='91.867%25' y1='40.328%25' x2='28.264%25' y2='81.66%25' id='a'%3E%3Cstop stop-color='%230052CC' offset='18%25'/%3E%3Cstop stop-color='%232684FF' offset='100%25'/%3E%3C/linearGradient%3E%3ClinearGradient x1='3878%25' y1='2561.069%25' x2='5439%25' y2='1905.368%25' id='b'%3E%3Cstop stop-color='%230052CC' offset='18%25'/%3E%3Cstop stop-color='%232684FF' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M15.452 7.528L8.59.665 7.923 0 2.757 5.166.395 7.528a.633.633 0 000 .893l4.72 4.72 2.81 2.81 5.165-5.167.08-.08 2.282-2.282a.631.631 0 000-.892zm-7.528 2.805L5.566 7.975l2.358-2.358 2.358 2.358-2.358 2.358z' fill='%232684FF'/%3E%3Cpath d='M7.714 5.617A3.969 3.969 0 017.697.02l-5.16 5.157 2.808 2.808 2.37-2.368z' fill='url(%23a)' transform='translate(.21)'/%3E%3Cpath d='M10.078 7.968l-2.364 2.365a3.972 3.972 0 010 5.618l5.172-5.173-2.808-2.81z' fill='url(%23b)' transform='translate(.21)'/%3E%3C/g%3E%3C/svg%3E`;

export const DayEntry: React.FC<IDayEntry> = ({ day, times }) => {
  const navigate = useNavigate();
  const dispatch = useAppThunkDispatch();
  const { currentTimer } = useAppSelector(s => s.tasksState)
  const grouped = useMemo(() => {
    return groupTimersByTask(times);
  }, [times]);
  if (!grouped.length) {
    return null;
  }

  const handleClick = (item: any) => {
    dispatch(openEditModal({ item }));
  }

  const handleProjectClick = (e: any, projectId: number) => {
    e.stopPropagation();
    navigate(`${ROUTES.PROJECTS}/${projectId}`);
  }

  if (!grouped) return null;
  return (
    <Box>
      <Box marginTop="1.5rem" display="flex" alignItems="center" gap="0.5rem" pb="0.5rem" borderBottom="2px solid #e8e8e8 " mb="0.5rem">
        <Typography>{moment(new Date(day)).format('dddd')}</Typography>
        <Typography fontSize="0.875rem">{moment(new Date(day)).format('MMM DD')}</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        {grouped?.map(item => (
          <Tooltip key={`${item.task.description}_item_time`} placement='top-end' title={item.forced ? <Typography fontSize="1rem">Timer was automatically stopped</Typography> : ''}>
            <DayEntryWrapper onClick={() => handleClick(item)} sx={{ cursor: 'pointer' }} color={item.forced ? 'red' : 'black'} padding="1rem 0.5rem" display="flex" alignItems="center" borderBottom="1px dashed #e8e8e8">

              <Typography fontWeight="500">{formatTime(item.time.hours, item.time.minutes)}</Typography>
              <Typography ml="1rem">{item.task.description}</Typography>
              <Box display={currentTimer?.task?.id === item.task.id ? 'block' : 'none'} id="timer">
                <TaskTimer timer={item.task} />
              </Box>
              {item.task.project && <ProjectBox gap="0.5rem" alignItems="center" display="flex" onClick={(e) => handleProjectClick(e, item.task.project.id)} sx={{ cursor: 'pointer' }} mr="1rem" ml="auto">
                {item.task.project.isJiraProject ? <ProjectIcon src={jiraImage} /> : <Typography fontWeight="700">KR</Typography>}
                <ProjectName width="10rem" textAlign="left">{item.task.project.name}</ProjectName>
              </ProjectBox>}
            </DayEntryWrapper>
          </Tooltip>
        ))}
      </Box>
    </Box >
  )
}

const ProjectBox = styled(Box)`
  ':hover': {
      background: 'red';
    }
      `;

const ProjectIcon = styled('img')({
  width: '1rem',
  height: '1rem',
});

const ProjectName = styled(Typography)({
  ":hover": {
    fontWeight: 500,
  }
});

const DayEntryWrapper = styled(Box)({
  maxHeight: '3.5rem',
  "&:hover": {
    background: "#F1EFEF",
    "#timer": {
      display: 'block',
    }
  }

})
