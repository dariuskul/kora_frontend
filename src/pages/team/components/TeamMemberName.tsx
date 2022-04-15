import { Typography } from '@mui/material';
import React from 'react';

interface ITeamMemberName {
  value?: string;
}

export const TeamMemberName: React.FC<ITeamMemberName> = ({ value }) => {
  return (
    <Typography fontSize="1rem" fontWeight="400">{value || 'Not joined yet'}</Typography>
  )
}