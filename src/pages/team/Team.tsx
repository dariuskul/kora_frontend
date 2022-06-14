import React, { useEffect, useState } from "react";
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";

import { Loader } from "components/others/Loader";
import { getAllUsers } from "services/auth.service";
import { IUser } from "store/types/User";
import { Row } from "react-table";
import { TeamMemberName } from "pages/team/components/TeamMemberName";
import { TeamMemberRole } from "pages/team/components/TeamMemberRole";
import { AddNewEmployeeModal } from "pages/team/components/AddNewEmployee";
import { CustomTable } from "components/others/CustomTable";
import { Dashboard } from "pages/team/components/dashboard/Dashboard";
import { RemoveEmployee } from "pages/team/components/RemoveEmployee";
import { EditTeamMember } from "pages/team/components/EditTeamMember";
import { useAppSelector } from "store/selectors";
import { getTeam } from "store/users/actions";
import { useAppThunkDispatch } from "store/store";
import { useTranslation } from "react-i18next";

export const Team = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const { team } = useAppSelector(s => s.userState);
  const dispatch = useAppThunkDispatch();
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        Header: t('fullName'),
        accessor: "fullName",
        Cell: ({ row }: { row: Row<IUser> }) => (
          <TeamMemberName value={row.original.fullName} />
        ),
      },
      {
        Header: t('emailAddress'),
        accessor: "email",
      },
      {
        Header: t('role'),
        accessor: "role",
        Cell: ({ row }: { row: Row<IUser> }) => (
          <TeamMemberRole value={row.original.role} />
        ),
      },
      {
        id: 'delete',
        accessor: "",
        width: 100,
        Cell: ({ row }: { row: Row<IUser> }) => (
          <RemoveEmployee employee={row.original} />
        ),
      },
      {
        id: 'edit',
        accessor: "",
        width: 100,
        Cell: ({ row }: { row: Row<IUser> }) => (
          <EditTeamMember employee={row.original} />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(getTeam());
  }, []);

  if (loading) {
    return <Loader loading={loading} size="5rem" />;
  }

  if (!loading && !team.length) {
    return null;
  }

  return (
    <Box>
      <Loader loading={loading} size="5rem" />
      <Box mb="1rem" alignItems="center" justifyContent="space-between" display="flex">
        <Typography fontSize="1.5rem" variant="h3">
          Team
        </Typography>
        <Button id="addNewEmployee" onClick={() => setFormOpen(true)} variant="contained">
          <Typography variant="body1">ADD NEW EMPLOYEE</Typography>
        </Button>
      </Box>
      <Paper>
        <Tabs variant="scrollable" allowScrollButtonsMobile scrollButtons="auto" value={value} onChange={(e: React.SyntheticEvent, newValue: number) => setValue(newValue)} aria-label="basic tabs example">
          <Tab label="Members" />
          <Tab label="Timers" />
        </Tabs>
      </Paper>
      {value === 0 && <CustomTable maxWidth="56.25rem" searchLabel="Search team" loading={loading} data={team} columns={columns} />}
      {value === 1 && <Dashboard />}
      <AddNewEmployeeModal open={formOpen} setOpen={setFormOpen} />
    </Box>
  );
};
