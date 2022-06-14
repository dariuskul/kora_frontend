import { DialogContent, Typography } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { CreateProjectForm } from 'pages/tracking/project/components/CreateProjectForm';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ICreateProjectModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateProjectModal: React.FC<ICreateProjectModal> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Typography fontSize="1.5rem">{t('createNewProject')}</Typography>
        <DialogContent sx={{ padding: 0 }}>
          <CreateProjectForm onClose={() => setOpen(false)} />
        </DialogContent>
      </DialogContent>
    </DialogWithClose>
  )
}