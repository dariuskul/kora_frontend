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

export const Team = () => {
  const [team, setTeam] = useState<Array<IUser>>([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "fullName",
        Cell: ({ row }: { row: Row<IUser> }) => (
          <TeamMemberName value={row.original.fullName} />
        ),
      },
      {
        Header: "Email address",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({ row }: { row: Row<IUser> }) => (
          <TeamMemberRole value={row.original.role} />
        ),
      },
      {
        Header: " ",
        width: 100,
        accessor: "",
        Cell: ({ row }: { row: Row<IUser> }) => (
          <RemoveEmployee employee={row.original} />
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const getTeam = async () => {
      setLoading(true);
      try {
        const users = await getAllUsers();
        setTeam(users.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTeam();
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
        <Button onClick={() => setFormOpen(true)} variant="contained">
          <Typography variant="body1">ADD NEW EMPLOYEE</Typography>
        </Button>
      </Box>
      <Paper>
        <Tabs variant="scrollable" allowScrollButtonsMobile scrollButtons="auto" value={value} onChange={(e: React.SyntheticEvent, newValue: number) => setValue(newValue)} aria-label="basic tabs example">
          <Tab label="Members" />
          <Tab label="Info" />
        </Tabs>
      </Paper>
      {value === 0 && <CustomTable searchLabel="Search team" loading={loading} data={team} columns={columns} />}
      {value === 1 && <Dashboard />}
      <AddNewEmployeeModal open={formOpen} setOpen={setFormOpen} />
    </Box>
  );
};
