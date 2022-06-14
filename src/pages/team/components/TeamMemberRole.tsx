import { Box, Typography } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next";


const ROLES = {
  admin: 'Adminstrator',
  user: 'Employee'
}

interface ITeamMemberRole {
  value: string;
}

export const TeamMemberRole: React.FC<ITeamMemberRole> = ({ value }) => {
  const { t } = useTranslation();
  return (

    <Box borderRadius="0.25rem" padding="0.5rem" maxWidth="10rem" bgcolor="#1976d2">
      <Typography textAlign="center" color="white">{t(ROLES[value as keyof typeof ROLES])}</Typography>
    </Box>
  )
}