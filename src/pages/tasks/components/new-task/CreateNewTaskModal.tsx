import { DialogTitle } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { NewTaskForm } from 'pages/tasks/components/new-task/NewTaskForm';
import React from 'react';

interface ICreateNewTaskModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateNewTaskModal: React.FC<ICreateNewTaskModal> = ({ open, setOpen }) => {
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create new task</DialogTitle>
      <NewTaskForm onClose={() => setOpen(false)} />
    </DialogWithClose>
  )
}