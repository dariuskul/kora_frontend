import { Box, Typography } from "@mui/material";
import { Filters } from "pages/reports/components/pages/systemReport/components/Filters/Filters";
import { Statistics } from "pages/reports/components/pages/systemReport/components/Statistics/Statistics";
import { UsersList } from "pages/reports/components/pages/systemReport/components/UsersList/UsersList";
import React, { useEffect, useState } from "react";
import { getUsersPerformance } from "services/admin.service";

export const SystemReport = () => {
  const [usersReport, setUsersReport] = useState([]);
  const [filterResults, setFiltersResults] = useState<any>();
  return (
    <Box>
      <Typography fontSize="1.5rem" variant="h3">
        Employee performance report
      </Typography>
      <Filters setFilterResults={setFiltersResults} />
      {filterResults && (
        <Statistics {...filterResults} />
      )}
      {/* <Box mt="2rem">
        {usersReport.length ? <UsersList users={usersReport} /> : null}
      </Box> */}
    </Box>
  );
};
