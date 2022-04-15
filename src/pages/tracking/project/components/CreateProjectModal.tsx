import { DialogContent, Typography } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { CreateProjectForm } from 'pages/tracking/project/components/CreateProjectForm';
import React from 'react';

interface ICreateProjectModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateProjectModal: React.FC<ICreateProjectModal> = ({ open, setOpen }) => {
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Typography fontSize="1.5rem">Create new project</Typography>
        <DialogContent sx={{ padding: 0 }}>
          <CreateProjectForm onClose={() => setOpen(false)} />
        </DialogContent>
      </DialogContent>
    </DialogWithClose>
  )
}