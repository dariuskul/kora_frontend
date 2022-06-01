import React, { useEffect, useState } from "react";

import { Box, Button, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";
import { getErrorMessage } from "utils/error";
import { TApiProjectItem } from "store/types/Project";
import { updateProject } from "services/tracking.service";
import { getAllUsers } from "services/auth.service";
import { IUser } from "store/types/User";

interface IAddUsersToProjectForm {
  project: TApiProjectItem;
  onClose?: () => void;
}

export const AddUsersToProjectForm: React.FC<IAddUsersToProjectForm> = ({ project, onClose }) => {
  const [team, setTeam] = useState<Array<IUser>>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Array<IUser>>([]);
  // filter out the users that are already in the project
  const filteredUsers = team.filter(u => !project.users.some(p => p.id === u.id));
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
    }
    getTeam();
  }, []);

  const onSubmit = async () => {
    try {
      await updateProject(project.id, { users: selected })
      toast.success(<Toast message="Project created successfully" />)
      onClose?.();
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />)
    }
  };


  const onChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setSelected(value);
  }

  return (
    <Box width="100%">
      <Form
        validateOnBlur={false}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, values }) => (
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit}
            id="loginForm"
          >
            <Box display="flex" flexDirection="column" gap="1rem">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Members</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip-label"
                  multiple
                  value={selected}
                  label="Members"
                  onChange={(e) => onChange(e)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value: IUser) => (
                        <Chip key={value.id} label={value.fullName} />
                      ))}
                    </Box>
                  )}
                >
                  {filteredUsers.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name as any}
                    >
                      {name.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box width="100%" maxWidth="10rem">
                <Button
                  fullWidth
                  disabled={submitting}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  <Box alignItems="center" display="flex">
                    <Typography mr="0.5rem">Save</Typography>
                    {submitting && <CircularProgress size="1rem" />}
                  </Box>
                </Button>
              </Box>
            </Box>
          </form>
        )}
      ></Form>
    </Box>
  );
};
