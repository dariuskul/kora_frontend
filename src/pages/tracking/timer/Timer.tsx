import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Autocomplete, Box, Button, Paper, TextField } from "@mui/material";
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



export const Timer = () => {
  const dispatch = useAppThunkDispatch();
  const { time, running, setRunning, setTime } = useStopWatch();
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
    if (running) {
      try {
        await dispatch(stopTask()).unwrap();
        setRunning(false);
      } catch (error) {
        toast.error(<Toast message="Something went wrong" />);
      }
    } else {
      if (!selected) {
        return;
      }
      try {
        await dispatch(startTask(selected.id)).unwrap();
        setRunning(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const Information = React.useMemo(() => {
    return <Statistics />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeEntries]);

  if (!tasks.length) {
    return null;
  }

  const filteredTasks = tasks.filter(item => item.project !== null);
  return (
    <Box maxWidth="77rem">
      <Paper sx={{ padding: '1rem 0.75rem' }} elevation={1}>
        <Box alignItems="center" gap="2rem" width="100%" display="flex">
          <Autocomplete
            fullWidth
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                {option.description}
                {option.project.name}
              </li>
            )}
            disabled={running}
            sx={{ ":disabled": { color: 'black' } }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.description}
            freeSolo
            disablePortal
            groupBy={option => option.project.name}
            value={currentTimer?.task}
            onChange={(e, value) => setSelected(value as TApiTaskItem)}
            options={filteredTasks}
            renderInput={(params) => (
              <   TextField {...params} label="Select task" />
            )}
          />
          <StopWatch time={time} />
          <Button
            color={currentTimer ? "error" : "primary"}
            onClick={() => handleStartTimer()}
            variant="contained"
          >
            {currentTimer ? "STOP" : "START"}
          </Button>
        </Box>
      </Paper>
      {Information}
    </Box>
  );
};
