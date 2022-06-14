import { DialogTitle } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { NewTaskForm } from 'pages/tasks/components/new-task/NewTaskForm';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface ICreateNewTaskModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateNewTaskModal: React.FC<ICreateNewTaskModal> = ({ open, setOpen }) => {
  const { t } = useTranslation();
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ paddingBottom: '0.5rem' }}>{t('createNewTask')}</DialogTitle>
      <NewTaskForm onClose={() => setOpen(false)} />
    </DialogWithClose>
  )
}