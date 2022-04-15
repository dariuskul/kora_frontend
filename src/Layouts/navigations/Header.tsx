import React, { useState } from "react";

import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAppThunkDispatch } from "store/store";
import { logout } from "store/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

export const Header = () => {
  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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
        </Toolbar>
      </AppBar>
    </Box >
  );
};
