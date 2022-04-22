import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getProjectStatistics } from "services/tracking.service";
import { ProjectWidget } from "./components/ProjectWidget";
import { UsersPieChart } from "./components/UsersPieChart";

interface IProjectStatistics {
  projectId: number;
}

export const ProjectStatistics: React.FC<IProjectStatistics> = ({
  projectId,
}) => {
  const [statistics, setStatistics] = useState();
  useEffect(() => {
    const projectStatistics = async () => {
      const response = await getProjectStatistics(projectId);
      setStatistics(response.data);
    };
    projectStatistics();
  }, []);
  if (!statistics) {
    return null;
  }
  return (
    <Box alignItems="center" justifyContent="center"  gap="0.5rem" display="flex" flexDirection="column">
      <ProjectWidget {...statistics} />
      <UsersPieChart {...statistics} />
    </Box>
  );
};
