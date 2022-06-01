import { Box, Typography } from '@mui/material';
import { useQuery } from 'hooks/useQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/selectors';

export const BasicInfo = () => {
  const { fullName, role } = useAppSelector(s => s.userState);
  const { t } = useTranslation();
  const { isTablet } = useQuery();
  return (
    <Box display="flex" alignItems="center" flexDirection={isTablet ? 'column' : 'row'} gap={isTablet ? '0.5rem' : '1rem'}>
      <Typography textAlign={isTablet ? 'center' : 'left'} fontSize={isTablet ? '1.5rem' : '2rem'}>{fullName.toUpperCase()}</Typography>
      <Box p="0.1875rem 0.5rem" border="1px solid" borderColor="#1976d2" borderRadius="0.6875rem">
        <Typography fontSize="0.875rem">{t(role.toUpperCase())}</Typography>
      </Box>
    </Box>
  )
}