import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "services/auth.service";
import { useAppSelector } from "store/selectors";
import { IUser } from "store/types/User";
import { Filters } from "./components/Filters";
import { saveAs } from 'file-saver'
import moment from "moment";

export const TimerReport = () => {
  const { projects } = useAppSelector(s => s.projectsState);
  const [team, setTeam] = useState<Array<IUser>>([]);
  const [file, setFile] = useState<Blob>(null);
  useEffect(() => {
    const getTeam = async () => {
      try {
        const users = await getAllUsers();
        setTeam(users.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTeam();
  }, []);
  const handleDownload = () => {
    saveAs(file, `${moment(new Date()).format('YYYY-MM_DD')}-Report.pdf`);
  }
  return (
    <Box>
      <Typography fontSize="1.5rem" variant="h3">
        Tracking reports
      </Typography>
      <Filters setFile={setFile} projects={projects} users={team} />
      {file && <Box textAlign="center" margin="2.5rem auto 0" maxWidth="30rem">
        <Paper>
          <Typography textAlign="center" fontSize="1.5rem">Report generated!</Typography>
          <Button onClick={handleDownload}>Click here to download</Button>
        </Paper>
      </Box>}
    </Box>
  );
};
