import { Box, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Toast } from 'components/others/Toast';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';
import { toast } from 'react-toastify';
import { postClient, removeClient, updateClient } from 'store/clients/actions';
import { IClient } from 'store/clients/types';
import { useAppThunkDispatch } from 'store/store';

interface ICreateClientModal {
  onClose: () => void;
  open: boolean;
  client: IClient;
}

export const EditClientModal: React.FC<ICreateClientModal> = ({ onClose, open, client }) => {
  const [name, setName] = React.useState(client.name);
  const dispatch = useAppThunkDispatch();
  const confirm = useConfirm();

  const handleDelete = async () => {
    if (!client.id) return;
    try {
      await confirm({
        title: "Are you sure you want to delete this client?",
        description: "This action cannot be undone.",
        confirmationText: 'Yes',
        cancellationText: 'No',
      });
      await dispatch(removeClient(client.id)).unwrap();
      toast.success(<Toast message="Client removed successfully" />)
    } catch (error) {
      toast.error(<Toast message="Something went wrong. Please try again later" />)
    }
  }

  const handleClientCreate = async () => {
    try {
      await dispatch(updateClient({ id: client.id, name })).unwrap();
      toast.success(<Toast message='Client updated!' />)
    } catch (error) {
      toast.error(<Toast message="Something went wrong. Please try again later" />)
    } finally {
      onClose();
    }
  }
  return (
    <DialogWithClose fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit client</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <TextField defaultValue={client.name} onChange={(e) => setName(e.target.value)} placeholder='Client name' />
          <Button onClick={handleDelete} sx={{ maxWidth: '12rem', mt: '0.75rem' }} color="error" variant="contained">Delete client</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClientCreate} disabled={!name.length} variant="contained">Update</Button>
      </DialogActions>
    </DialogWithClose>
  );
};