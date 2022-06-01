import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { Autocomplete, Box, Button, CircularProgress, Paper, styled, TextField, Typography } from "@mui/material";
import { Toast } from "components/others/Toast";
import { useStopWatch } from "hooks/use-stopwatch";
import { StopWatch } from "pages/tracking/timer/StopWatch";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";
import {
  getAllTasks,
  getCurrentTimer,
  getTimeEntries,
  startTask,
  stopTask,
} from "store/tasks/actions";
import { getErrorMessage } from "utils/error";
import { Statistics } from "pages/tracking/timer/Statistics";
import { TApiTaskItem } from "store/types/Task";
import { getRunningTimerTime } from "utils/timer";
import { useTranslation } from "react-i18next";
import { useQuery } from "hooks/useQuery";



export const Timer = React.memo(() => {
  const dispatch = useAppThunkDispatch();
  const { t } = useTranslation();
  const { isTablet } = useQuery();
  const { time, running, setRunning, setTime } = useStopWatch();
  const [loading, setLoading] = useState(false);
  const { currentTimer, tasks, timeEntries } = useAppSelector(
    (s) => s.tasksState
  );
  const [selected, setSelected] = useState<TApiTaskItem>();
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        await dispatch(getTimeEntries()).unwrap();
        await dispatch(getAllTasks()).unwrap();
        await dispatch(getCurrentTimer()).unwrap();
      } catch (error) {
        toast.error(<Toast message={getErrorMessage(error)} />);
      }
    };
    fetchTasks();
  }, [dispatch]);
  useEffect(() => {
    if (currentTimer) {
      setSelected(currentTimer.task);
    }
  }, [currentTimer]);
  useEffect(() => {
    if (!currentTimer) {
      setRunning(false);
      return;
    }
    if (currentTimer) {
      const time = getRunningTimerTime(
        currentTimer.startDate,
        new Date().toString()
      );
      setTime(time);
      setRunning(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimer]);

  const handleStartTimer = async () => {
    setLoading(true);
    if (running) {
      try {
        await dispatch(stopTask()).unwrap();
        setRunning(false);
      } catch (error) {
        toast.error(<Toast message="Something went wrong" />);
      } finally {
        setLoading(false);
      }
    } else {
      if (!selected) {
        return;
      }
      setLoading(true);
      try {
        await dispatch(startTask(selected.id)).unwrap();
        setRunning(true);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const Information = React.useMemo(() => {
    return <Statistics />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeEntries]);


  const filteredTasks = useMemo(() => {
    // sort by project name if there is a project name
    const copyArr = [...tasks];
    const sortedTasks = copyArr.sort((a, b) => {
      if (a?.projectId && b?.projectId && a?.project?.name && b?.project?.name) {
        return a.project.name.localeCompare(b.project.name);
      }
      return 0;
    });
    return sortedTasks;
  }, [tasks]);

  if (!tasks.length) {
    return null;
  }

  return (
    <Box maxWidth="77rem">
      <Paper sx={{ padding: '1rem 0.75rem' }} elevation={1}>
        <Box alignItems="center" gap="2rem" width="100%" display="flex">
          <Autocomplete
            fullWidth
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                {option.description}
                <StyledStrong>{option.project?.name || 'No project'}</StyledStrong>
              </li>
            )}
            disabled={running}
            sx={{ ":disabled": { color: 'black' } }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            freeSolo
            disablePortal
            groupBy={option => option?.project?.name || 'No project'}
            value={currentTimer?.task}
            onChange={(e, value) => setSelected(value as TApiTaskItem)}
            options={filteredTasks}
            getOptionLabel={(option) => option.description || option}
            renderInput={(params) => (
              <   TextField {...params} label={t('selectTask')} />
            )}
          />
          {!isTablet && (
            <>
              <StopWatch time={time} />
              <Button
                color={currentTimer ? "error" : "primary"}
                onClick={() => handleStartTimer()}
                disabled={!selected && !running}
                sx={{ minHeight: '36px', minWidth: '6rem' }}
                variant="contained"
              >
                <Box gap="1rem" alignItems="center" display="flex">
                  {!loading && <Typography margin="0 0.25rem">{currentTimer ? t('stopTimer') : t('startTimer')}</Typography>}
                  {loading && <StyledLoader />}
                </Box>
              </Button>
            </>
          )}
        </Box>
        {isTablet && (
          <Box mt="0.5rem" justifyContent="space-between" display="flex">
            <StopWatch time={time} />
            <Button
              color={currentTimer ? "error" : "primary"}
              onClick={() => handleStartTimer()}
              disabled={!selected && !running}
              sx={{ minHeight: '36px', minWidth: '6rem' }}
              variant="contained"
            >
              <Box gap="1rem" alignItems="center" display="flex">
                {!loading && <Typography margin="0 0.25rem">{currentTimer ? t('stopTimer') : t('startTimer')}</Typography>}
                {loading && <StyledLoader />}
              </Box>
            </Button>
          </Box>
        )}
      </Paper>
      {Information}
    </Box>
  );
});

const StyledLoader = styled(CircularProgress)({
  width: '1.25rem !important',
  height: '1.25rem !important',
  color: 'white',
})

const StyledStrong = styled('strong')({
  marginLeft: '0.5rem',
})

