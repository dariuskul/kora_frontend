import React, { useEffect } from 'react';

import { Box } from '@mui/material';
import { PageContainer } from 'components/containers/PageContainer';
import { LoginForm } from 'components/forms/LoginForm';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/store';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { authenticated } = useSelector((s: IAppState) => s.userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/');
    }
  }, [authenticated, navigate])

  return (
    <PageContainer >
      <Box minHeight="inherit" width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <LoginForm />
      </Box>
    </PageContainer>
  )
}