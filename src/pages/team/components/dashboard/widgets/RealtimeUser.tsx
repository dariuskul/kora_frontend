import { Box, IconButton, Typography } from "@mui/material";
import { useStopWatch } from "hooks/use-stopwatch";
import { StopWatch } from "pages/tracking/timer/StopWatch";
import React, { useEffect } from "react";
import { getRunningTimerTime } from "utils/timer";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { useAppThunkDispatch } from "store/store";
import { stopTimer } from "services/tracking.service";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";

interface IRealtimeUser {
  data: any;
}

export const RealtimeUser: React.FC<IRealtimeUser> = ({ data }) => {
  const { time, running, setRunning, setTime } = useStopWatch();
  const dispatch = useAppThunkDispatch();
  useEffect(() => {
    if (data) {
      const time = getRunningTimerTime(data.startDate, new Date().toString());
      setTime(time);
    }
  }, [data]);

  const handleStopTimer = async () => {
    try {
     await stopTimer(data.user.id);
     toast.success(<Toast message="Timer stopped" />)
    } catch (error) {
      toast.error(<Toast message="Unexpected error occured" />)
    }
  }
  return (
    <Box borderBottom="1px solid" p="0.5rem 1rem 0.5rem">
      <Typography textTransform="uppercase" fontWeight="700" fontSize="1.25rem">
        {data?.user?.fullName}
      </Typography>
      <Box alignItems="center" display="flex">
        <Box flex="1">
          <Typography fontWeight="600" color="black" flex="1">
            {data.task.description}
          </Typography>
          <Typography color="grey" fontSize="0.875rem" flex="1">
            #{data.task.project.name}
          </Typography>
        </Box>
        <Box alignItems="center" display="flex">
          <StopWatch time={time} />
          <IconButton onClick={handleStopTimer} size="large">
            <StopCircleOutlinedIcon color="error"/>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
