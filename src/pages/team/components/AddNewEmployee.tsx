import { DialogContent, Typography } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { AddNewEmployeeForm } from 'pages/team/components/AddNewEmployeeForm';
import { CreateProjectForm } from 'pages/tracking/project/components/CreateProjectForm';
import React from 'react';

interface IAddNewEmployeeModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AddNewEmployeeModal: React.FC<IAddNewEmployeeModal> = ({ open, setOpen }) => {
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Typography fontSize="1.5rem">Add employee by email address</Typography>
        <DialogContent sx={{ padding: 0 }}>
          <AddNewEmployeeForm onClose={() => setOpen(false)} />
        </DialogContent>
      </DialogContent>
    </DialogWithClose>
  )
}