import React, { useState } from "react";

import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Select } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAppThunkDispatch } from "store/store";
import { logout } from "store/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { useAppSelector } from "store/selectors";
import { changeLanguage } from "store/settings/settingsSlice";
import i18next from "i18next";
import { TokenStorage } from "constants/tokenStorage";

export const Header = () => {
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const language = useAppSelector(s => s.settingsState.language);
  const handleLanguageChange = (e: any) => {
    dispatch(changeLanguage(e.target.value as string));
    i18next.changeLanguage(e.target.value as string);
    TokenStorage.setLanguage(e.target.value as string);
  };
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <Typography
            letterSpacing="0.3rem"
            fontSize="2rem"
            color="black"
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            KORA
          </Typography>
          <Box>
            <IconButton onClick={e => setAnchorEl(e.currentTarget)} size="large">
              <Person fontSize="large" color="primary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => dispatch(logout())}>Log out</MenuItem>
              <MenuItem onClick={() => navigate(ROUTES.PROFILE)}>Profile settings</MenuItem>
            </Menu>
          </Box>
          <Box width="100%" maxWidth="5rem">
            <Select
              fullWidth
              value={language}
              onChange={handleLanguageChange}
            >
              <MenuItem value="LT">LT</MenuItem>
              <MenuItem value="EN">EN</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
    </Box >
  );
};
