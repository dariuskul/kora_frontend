import React, { useEffect, useState } from 'react';

import { Box, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography } from '@mui/material';
import { TApiProjectItem } from 'store/types/Project';
import { updateProject } from 'services/tracking.service';
import { toast } from 'react-toastify';
import { Toast } from 'components/others/Toast';
import { InvitedUsersTable } from 'pages/tracking/project/components/InvitedUsersTable';
import { AddUsersToProjectModal } from 'pages/tracking/project/components/AddUsersToProjectModal';
import { useAppSelector } from 'store/selectors';
import { addClientToProject } from 'services/admin.service';

interface IProjectAccess {
  project: TApiProjectItem;
}

export const ProjectAccess: React.FC<IProjectAccess> = ({ project }) => {
  const [value, setValue] = useState(project.isPublic ? 0 : 1);
  const { clients } = useAppSelector(s => s.clientsState);
  const [addUsersFormOpen, setAddUsersFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(project.client);
  const { isPublic, id } = project;

  const columns = React.useMemo(() => [
    {
      Header: 'NAME',
      accessor: 'fullName',
      maxWidth: 500,
      minWidth: 300,
    },
    {
      Header: 'Role',
      accessor: 'role',
      width: '15%',
    },
  ], []);
  useEffect(() => {
    const updateVisibility = async () => {
      const test = isPublic ? 0 : 1;
      if (test === value) {
        return;
      }
      try {
        await updateProject(id, { isPublic: value === 0 ? true : false })
        toast.success(<Toast message="Visibility updated!" />)
      } catch (error) {
      }
    }
    updateVisibility();
  }, [value]);

  useEffect(() => {
    setSelectedClient(project?.client || clients[0]);
  }, [project])


  const handleClientChange = async (event: any) => {
    const findClient = clients.find(c => c.id === event.target.value);
    if (findClient) {
      setSelectedClient(findClient);
      await addClientToProject(project.id, findClient.id);
    }
  };

  return (
    <Box padding="1rem">
      <Typography fontWeight="600" fontSize="1.25rem">Client</Typography>
      <Box mt="0.5rem" mb="0.5rem">
        <Box>
          <div>
            <FormControl variant="outlined" sx={{ minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={selectedClient?.id}
                onChange={handleClientChange}
              >
                {clients.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Box>
      </Box>
      <Typography fontWeight="600" fontSize="1.25rem">Visibility</Typography>
      <Box my="1.5rem">
        <FormControl>
          <Typography>{value === 0 ? 'Everyone can track time on public projects.' : 'Only people you add to the project can track time on it.'}</Typography>
          <RadioGroup
            sx={{ flexDirection: 'row' }}
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          >
            <FormControlLabel value={0} control={<Radio />} label="Public" />
            <FormControlLabel value={1} control={<Radio />} label="Private" />
          </RadioGroup>
        </FormControl>
      </Box>
      <InvitedUsersTable setOpen={setAddUsersFormOpen} columns={columns} data={project.users} />
      <AddUsersToProjectModal open={addUsersFormOpen} setOpen={setAddUsersFormOpen} project={project} />
    </Box>
  )
}