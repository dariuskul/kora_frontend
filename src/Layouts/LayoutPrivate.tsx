import React from "react";
import { Box, Paper, Toolbar } from "@mui/material";

import { Header } from "Layouts/navigations/Header";
import { SideBar } from "Layouts/navigations/SideBar";
import { useQuery } from "hooks/useQuery";

export const LayoutPrivate: React.FC = ({ children }) => {
  const { isTablet } = useQuery();
  return (
    <Box minHeight="100vh" display="flex" bgcolor="#FBFCFF">
      <Header />
      {!isTablet && <SideBar />}
      <Box sx={{ flexGrow: 1, p: isTablet ? '1.5rem 0' : 3 }} component="main">
        <Toolbar />
        <Paper sx={{ padding: '1rem' }}>{children}</Paper>
      </Box>
    </Box>
  )
}