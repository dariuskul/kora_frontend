import { Box, Tab, Tabs } from '@mui/material';
import { ProjectAccess } from 'pages/tracking/project/components/ProjectAccess';
import { ProjecttSettings } from 'pages/tracking/project/components/ProjectSettings';
import { Tasks } from 'pages/tracking/project/components/tasks/Tasks';
import React, { useState } from 'react';
import { useAppSelector } from 'store/selectors';
import { TApiProjectItem } from 'store/types/Project';
import { TApiTaskItem } from 'store/types/Task';
import { ProjectStatistics } from './statistics/ProjectStatistics';

interface IProjectTabs {
  tasks: Array<TApiTaskItem>;
  project: TApiProjectItem;
}


export const ProjectTabs: React.FC<IProjectTabs> = ({ project, tasks }) => {
  const [value, setValue] = useState(0);

  return (
    <Box bgcolor="white" sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs variant="scrollable" allowScrollButtonsMobile scrollButtons="auto" value={value} onChange={(e: React.SyntheticEvent, newValue: number) => setValue(newValue)} aria-label="basic tabs example">
        <Tab label="Tasks" />
        <Tab label="Access" />
        <Tab label="Statistics" />
      </Tabs>

      {value === 0 && <Tasks isJira={project.isJiraProject} projectId={project.id} tasks={tasks} />}
      {value === 1 && <ProjectAccess project={project} />}
      {value === 2 && <ProjectStatistics projectId={project.id} />}
    </Box>
  )
}
