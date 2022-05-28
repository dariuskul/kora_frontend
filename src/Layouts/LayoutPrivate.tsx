import React from "react";
import { Box, Paper, Toolbar } from "@mui/material";

import { Header } from "Layouts/navigations/Header";
import { SideBar } from "Layouts/navigations/SideBar";

export const LayoutPrivate: React.FC = ({ children }) => {
  return (
    <Box minHeight="100vh" display="flex" bgcolor="#FBFCFF">
      <Header />
      <SideBar />
      <Box sx={{ flexGrow: 1, p: 3 }} component="main">
        <Toolbar />
        <Paper sx={{ padding: '1rem' }}>{children}</Paper>
      </Box>
    </Box>
  )
}