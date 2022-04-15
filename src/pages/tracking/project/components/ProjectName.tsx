import { Box, styled, Typography } from '@mui/material';
import { jiraImage } from 'pages/tracking/timer/components/DayEntry';
import React from 'react';
import { Row } from 'react-table';
import { TApiProjectItem } from 'store/types/Project';

interface IProjectName {
  value: Row<TApiProjectItem>;
}

export const ProjectName: React.FC<IProjectName> = ({ value }) => {
  return (
    <Box gap="0.5rem" alignItems="center" display="flex">
      {value.original.isJiraProject ? <ProjectIcon src={jiraImage} /> : <Typography fontWeight="700">KR</Typography>}
      <Typography sx={{ textDecoration: value.original.isArchived ? 'line-through' : '' }} fontWeight="600">{value.original.name}</Typography>
    </Box>
  )
}

const ProjectIcon = styled('img')({
  width: '1rem',
  height: '1rem',
});