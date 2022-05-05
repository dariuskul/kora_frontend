import { Box, Typography } from "@mui/material";
import { UsersList } from "pages/reports/components/pages/systemReport/components/UsersList/UsersList";
import React, { useEffect, useState } from "react";
import { getUsersPerformance } from "services/admin.service";

export const SystemReport = () => {
  const [usersReport, setUsersReport] = useState([]);
  useEffect(() => {
    const performance = async () => {
      const result = await getUsersPerformance();
      setUsersReport(result.data)
    }
    performance();
  }, [])
  return (
    <Box>
      <Typography fontSize="1.5rem" variant="h3">
        Employee performance report
      </Typography>
      <Box mt="2rem">
        {usersReport.length ? <UsersList users={usersReport} /> : null}
      </Box>
    </Box>
  );
};
