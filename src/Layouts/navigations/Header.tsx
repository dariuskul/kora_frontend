import React, { useCallback, useState } from "react";

import { Box, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Select, Drawer, ListItem, styled, Divider } from "@mui/material";
import { Person } from "@mui/icons-material";
import { useAppThunkDispatch } from "store/store";
import { logout } from "store/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";
import { useAppSelector } from "store/selectors";
import { changeLanguage } from "store/settings/settingsSlice";
import i18next from "i18next";
import { TokenStorage } from "constants/tokenStorage";
import { useQuery } from "hooks/useQuery";
import MenuIcon from '@mui/icons-material/Menu';
import { ADMIN_LINKS, MODERATOR_LINKS, SIDE_BAR_LINKS } from "Layouts/navigations/SideBar";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { isTablet } = useQuery();
  const { role } = useAppSelector((s) => s.userState);
  const { t } = useTranslation();
  const dispatch = useAppThunkDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const language = useAppSelector(s => s.settingsState.language);
  const handleLanguageChange = (e: any) => {
    dispatch(changeLanguage(e.target.value as string));
    i18next.changeLanguage(e.target.value as string);
    TokenStorage.setLanguage(e.target.value as string);
  };

  const goToRoute = useCallback(
    (route: string) => {
      if (!route) {
        return;
      }
      navigate(route);
    },
    [navigate]
  );

  const AdminLinks = React.useMemo(() => {
    const links = role === 'moderator' ? MODERATOR_LINKS : role === 'admin' ? ADMIN_LINKS : null;
    if (!links) {
      return null;
    }
    return (
      <>
        <Divider />
        {links.map((item) => (
          <StyledBox
            key={item.link}
            onClick={() => goToRoute(item.link)}
            position="relative"
            py="1rem"
          >
            <StyledListItem>
              {item?.icon}
              <Typography ml="0.5rem">{t(item.name)}</Typography>
            </StyledListItem>
          </StyledBox>
        ))}
      </>
    );
  }, [goToRoute, role, t]);
  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ padding: isTablet ? '0 1rem !important' : '0 1.5rem !important' }}>
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
          {isTablet && <IconButton onClick={() => setOpenDrawer(prev => !prev)}>
            <MenuIcon />
          </IconButton>}
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          >
            <Box mt="5rem">
              <Box display="flex" flexDirection="column">
                {SIDE_BAR_LINKS.map((item) => (
                  <StyledBox
                    key={item.link}
                    onClick={() => goToRoute(item.link)}
                    position="relative"
                    py="1rem"
                  >
                    <StyledListItem>
                      {item?.icon}
                      <Typography ml="0.5rem">{t(item.name)}</Typography>
                    </StyledListItem>
                  </StyledBox>
                ))}
                {AdminLinks}
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </AppBar>
    </Box >
  );
};

const StyledListItem = styled(ListItem)({
  padding: "0 1rem",
});

const StyledBox = styled(Box)({
  cursor: "pointer",
  ":before": {
    position: "absolute",
    content: '""',
    top: 0,
    left: 0,
    width: 0,
    height: 56,
    background: "#e4eaee",
    transition: "width .3s ease",
  },
  "&:hover": {
    ":before": {
      width: "100%",
    },
  },
});


