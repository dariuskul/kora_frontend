import { Box, Button, Typography } from '@mui/material';
import { CustomTable } from 'components/others/CustomTable';
import { CreateClientModal } from 'pages/clients/components/CreateClientModal';
import { DeleteClient } from 'pages/clients/components/DeleteClient';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-table';
import { getClients } from 'services/admin.service';
import { fetchClients } from 'store/clients/actions';
import { IClient } from 'store/clients/types';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';

export const Clients = () => {
  const { clients } = useAppSelector(s => s.clientsState);
  const dispatch = useAppThunkDispatch();
  const [openCreateModal, setCreateModal] = useState(false);

  useEffect(() => {
    const clientsFetch = async () => {
      try {
        await dispatch(fetchClients()).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
    clientsFetch();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Client",
        accessor: 'name'
      },
      {
        id: 'edit',
        width: 20,
        accessor: (row: IClient) => <DeleteClient id={row} />,
      }
    ],
    [clients]
  );
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mt="1rem">
        <Typography fontSize="1.5rem" variant="h3">
          Clients
        </Typography>
        <Button onClick={() => setCreateModal(true)} variant="contained">Create new client</Button>
      </Box>
      {clients && <CustomTable searchLabel='Search clients' columns={columns} data={clients} />}
      <CreateClientModal onClose={() => setCreateModal(false)} open={openCreateModal} />
    </Box>
  );
};