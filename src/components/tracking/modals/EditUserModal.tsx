import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { ProfileForm } from 'components/forms/ProfileForm';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { ImportTaskModal } from 'components/tracking/modals/ImportTaskModal';
import React from 'react';

interface IEditUserModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EditUserModal: React.FC<IEditUserModal> = ({ open, setOpen }) => {
  return (
    <DialogWithClose fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Typography fontSize="1.5rem">Edit profile</Typography>
      </DialogTitle>
      <DialogContent sx={{ maxWidth: '30rem' }}>
        <ProfileForm />
      </DialogContent>
    </DialogWithClose>
  )
}
