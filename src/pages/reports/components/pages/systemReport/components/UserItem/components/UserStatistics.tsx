import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { WorkingStatistics } from "components/userInsights/lastMonths/WorkingStatistics";
import { TopProjects } from "components/userInsights/topProjects/TopProjects";
import React, { useMemo } from "react";
import { groupTimersByTask } from "utils/timer";

interface IUserStatistics {
  weeklyEntries: any;
}

export const UserStatistics: React.FC<IUserStatistics> = ({ weeklyEntries }) => {
  const grouped = useMemo(() => {
    return groupTimersByTask(weeklyEntries);
  }, [weeklyEntries]);
  return (
    <Box>
      <div>test</div>
    </Box>
  );
};
