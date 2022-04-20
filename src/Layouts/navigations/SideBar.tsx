import React, { useCallback } from "react";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArticleOutlined,
  DashboardOutlined,
  GroupsOutlined,
  TimerOutlined,
} from "@mui/icons-material";
import { useAppSelector } from "store/selectors";
import { ADMIN_ROLES } from "constants/other";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export const drawerWidth = 200;

const SIDE_BAR_LINKS = [
  { name: "DASHBOARD", link: "/", icon: <DashboardOutlined /> },
  { name: "TRACKING", link: "/tracking", icon: <TimerOutlined /> },
  { name: "TASKS", link: "/tasks", icon: <FormatListBulletedIcon /> },
];
const ADMIN_LINKS = [
  { name: "PROJECTS", link: "/projects", icon: <ArticleOutlined /> },
  { name: "TEAM", link: "/team", icon: <GroupsOutlined /> },
  { name: "REPORTS", link: "/reports", icon: <AssessmentIcon /> },
];
export const SideBar = () => {
  const navigate = useNavigate();
  const { role } = useAppSelector((s) => s.userState);

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
    if (!ADMIN_ROLES.includes(role)) return null;

    return (
      <>
        <Divider />
        {ADMIN_LINKS.map((item) => (
          <StyledBox
            key={item.link}
            onClick={() => goToRoute(item.link)}
            position="relative"
            py="1rem"
          >
            <StyledListItem>
              {item?.icon}
              <Typography ml="0.5rem">{item.name}</Typography>
            </StyledListItem>
          </StyledBox>
        ))}
      </>
    );
  }, [goToRoute, role]);

  return (
    <Drawer
      variant="permanent"
      elevation={100}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ margin: "1rem 0 0" }}>
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
                  <Typography ml="0.5rem">{item.name}</Typography>
                </StyledListItem>
              </StyledBox>
            ))}
            {AdminLinks}
          </Box>
        </List>
      </Box>
    </Drawer>
  );
};

const StyledListItem = styled(ListItem)({
  padding: "0 1.5rem",
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
