import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { SelectReport } from "./components/SelectReport";

const REPORT_TYPES = [{ title: 'Tracking reports', link: '/reports/tracking' }, { title: 'Employee reports', link: '/reports/system' }]

export const Reports = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography fontSize="1.5rem" variant="h3">
        {t('reports')}
      </Typography>
      <Typography fontSize="1.25rem" mt="0.5rem">{t('chooseReports')}</Typography>
      <Box mt="0.5rem" display="flex" gap="0.5rem">
        {REPORT_TYPES.map((item, idx) => (
          <SelectReport key={idx} {...item} />
        ))}
      </Box>
    </Box>
  );
};
