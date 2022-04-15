import { Box, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'store/selectors';

export const BasicInfo = () => {
  const { fullName, role } = useAppSelector(s => s.userState);
  return (
    <Box display="flex" alignItems="center" gap="1rem">
      <Typography fontSize="2rem">{fullName.toUpperCase()}</Typography>
      <Box p="0.1875rem 0.5rem" border="1px solid" borderColor="#1976d2" borderRadius="0.6875rem">
        <Typography fontSize="0.875rem">{role.toUpperCase()}</Typography>
      </Box>
    </Box>
  )
}