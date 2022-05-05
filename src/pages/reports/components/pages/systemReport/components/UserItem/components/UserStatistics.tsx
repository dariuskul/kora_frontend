import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { WorkingStatistics } from "components/userInsights/lastMonths/WorkingStatistics";
import { TopProjects } from "components/userInsights/topProjects/TopProjects";
import React from "react";

interface IUserStatistics {
  totalTracked: string;
  topProjects: Array<any>;
  last6Months: Array<any>;
}

export const UserStatistics: React.FC<IUserStatistics> = ({ totalTracked, topProjects, last6Months }) => {
  return (
    <Box>
      <Typography>
        Tracked total:
        <Typography ml="0.5rem" fontSize="1rem" variant="caption" fontWeight="500">
          {totalTracked}h
        </Typography>
        <TopProjects topProjects={topProjects} />
        <WorkingStatistics statistics={last6Months} />
      </Typography>
    </Box>
  );
};
