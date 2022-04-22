import { Box, Paper, styled, Typography } from "@mui/material";
import React from "react";

interface IProjectWidget {
  averageTimeSpent: string;
  totalTimeSpent: string;
  averageTimeEachUser: Array<any>;
  longestTasks: Array<any>;
  completedTasks: Array<any>;
  inProgressTasks: Array<any>;
}

export const ProjectWidget: React.FC<IProjectWidget> = ({
  averageTimeEachUser,
  averageTimeSpent,
  longestTasks,
  totalTimeSpent,
  completedTasks,
  inProgressTasks,
}) => {
  return (
    <Box mt="2rem" maxWidth="40rem">
      <Box alignItems="baseline" gap="0.5rem" display="flex">
        <Paper>
          <Box display="flex" flexDirection="column" padding="1rem">
            <Box pb="0.5rem" borderBottom="1px solid rgba(224, 224, 224, 1)">
              <Typography fontWeight="500">
                Total time spent on project: {totalTimeSpent}h
              </Typography>
            </Box>
            <Box
              pb="0.5rem"
              pt="0.5rem"
              borderBottom="1px solid rgba(224, 224, 224, 1)"
            >
              <Typography>
                Average time spent on tasks:{" "}
                <Typography fontSize="1rem" variant="caption">
                  {averageTimeSpent}h
                </Typography>
              </Typography>
            </Box>
            <Box pt="0.5rem">
              <Typography>
                Completed tasks:{" "}
                <Typography fontSize="1rem" variant="caption" fontWeight="700">
                  {completedTasks.length}/{inProgressTasks.length}
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper>
          <Box padding="1rem">
            <Typography fontSize="1.25rem" fontWeight="700">
              Longest tasks
            </Typography>
            <Box display="flex" flexDirection="column" gap="0.5rem">
            {longestTasks.map((item, idx) => (
              <Box gap="0.5rem" justifyContent="space-between" display="flex" pb="0.25rem" borderBottom={idx < longestTasks.length - 1 && "1px solid rgba(224, 224, 224, 1)"}  key={item.name}>
                <Typography sx={{ cursor: 'pointer' }} fontWeight="500">{item.name}</Typography>
                <Typography sx={{ cursor: 'pointer' }} fontWeight="500">{item.time}h</Typography>
              </Box>
            ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
