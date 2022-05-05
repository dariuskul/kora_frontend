import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Toast } from 'components/others/Toast';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import React from 'react';
import { toast } from 'react-toastify';
import { postClient } from 'store/clients/actions';
import { useAppThunkDispatch } from 'store/store';

interface ICreateClientModal {
  onClose: () => void;
  open: boolean;
}

export const CreateClientModal: React.FC<ICreateClientModal> = ({ onClose, open }) => {
  const [name, setName] = React.useState('');
  const dispatch = useAppThunkDispatch();

  const handleClientCreate = async () => {
    try {
      await dispatch(postClient(name)).unwrap();
      toast.success(<Toast message='Client created successfully' />)
    } catch (error) {

    } finally {
      onClose();
    }
  }
  return (
    <DialogWithClose open={open} onClose={onClose}>
      <DialogTitle>Create new client</DialogTitle>
      <DialogContent>
        <TextField onChange={(e) => setName(e.target.value)} placeholder='Client name' />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClientCreate} disabled={!name.length} variant="contained">Submit</Button>
      </DialogActions>
    </DialogWithClose>
  );
};