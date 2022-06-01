import React, { memo, useCallback } from "react";

import {
  Box,
  Button,
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
import { useTranslation } from "react-i18next";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { getProjects, synchronize } from "store/projects/actions";
import { toast } from "react-toastify";
import { useAppThunkDispatch } from "store/store";
import { getErrorMessage } from "utils/error";

export const drawerWidth = 200;

export const SIDE_BAR_LINKS = [
  { name: "DASHBOARD", link: "/", icon: <DashboardOutlined /> },
  { name: "TRACKING", link: "/tracking", icon: <TimerOutlined /> },
  { name: "TASKS", link: "/tasks", icon: <FormatListBulletedIcon /> },
];

export const MODERATOR_LINKS = [
  { name: "PROJECTS", link: "/projects", icon: <ArticleOutlined /> },
  { name: "TEAM", link: "/team", icon: <GroupsOutlined /> },
];

export const ADMIN_LINKS = [
  { name: "PROJECTS", link: "/projects", icon: <ArticleOutlined /> },
  { name: "TEAM", link: "/team", icon: <GroupsOutlined /> },
  { name: "REPORTS", link: "/reports", icon: <AssessmentIcon /> },
  { name: "CLIENTS", link: "/clients", icon: <ContactMailIcon /> },
];
export const SideBar = memo(() => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppThunkDispatch();
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

  const handleSync = async () => {
    setLoading(true);
    try {
      await dispatch(synchronize()).unwrap();
      await dispatch(getProjects()).unwrap();

    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

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
                  <Typography ml="0.5rem">{t(item.name)}</Typography>
                </StyledListItem>
              </StyledBox>
            ))}
            {AdminLinks}
          </Box>
        </List>
      </Box>
      <Box mt="auto">
        <Button disabled={loading} onClick={handleSync} fullWidth>{t('synchronizeData')}</Button>
      </Box>
    </Drawer>
  );
});

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
