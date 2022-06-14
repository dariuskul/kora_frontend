import React from 'react';
import { Box, Typography } from "@mui/material";
import { PageContainer } from "components/containers/PageContainer";
import { RemindPasswordForm } from "./components/RemindPasswordForm";

export const RemindPassword: React.FC = () => {
  return (
    <PageContainer >
      <Box minHeight="inherit" width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
        <RemindPasswordForm />
      </Box>
    </PageContainer>
  );
};
