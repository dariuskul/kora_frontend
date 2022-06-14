import { Box, Paper, styled, Typography } from "@mui/material";
import React from "react";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ISelectReport {
  title: string;
  link: string;
}

export const SelectReport: React.FC<ISelectReport> = ({ title, link }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <StyledReportWrapper onClick={() => navigate(link)}>
      <Paper>
        <Box display="flex" alignItems="center" p={2}>
          <Typography fontSize="1.25rem">{t(title)}</Typography>
          <NavigateNextIcon color="primary" />
        </Box>
      </Paper>
    </StyledReportWrapper>
  );
};

const StyledReportWrapper = styled(Box)({
  cursor: 'pointer',
  background: 'white',
  transition: 'all 0.2s ease-in-out',
  '& :hover': {
    backgroundColor: '#f2f2f2',
  }
})
