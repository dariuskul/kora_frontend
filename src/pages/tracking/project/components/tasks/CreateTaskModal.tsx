import { Box, DialogContent, Typography } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { CreateTaskForm } from 'pages/tracking/project/components/tasks/CreateTaskForm';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import React from 'react';
import { useAppThunkDispatch } from 'store/store';
import { openEditModal, openImportTaskModal } from 'store/modals/modalSlice';
import { ImportTaskModal } from 'components/tracking/modals/ImportTaskModal';

interface ICreateProjectModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  projectId?: number;
}

export const CreateTaskModal: React.FC<ICreateProjectModal> = ({ open, setOpen, projectId }) => {
  const dispatch = useAppThunkDispatch();
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Typography fontSize="1.5rem">Create task</Typography>
        <DialogContent sx={{ padding: 0 }}>
          <CreateTaskForm onClose={() => setOpen(false)} projectId={projectId} />
        </DialogContent>
        <DialogContent>
          <Typography align="center">Or</Typography>
          <Box onClick={() => dispatch(openImportTaskModal())} sx={{ cursor: 'pointer' }} justifyContent="center" alignItems="center" display="flex">
            <ImportExportIcon color="primary" />
            <Typography color="primary" align="center">Import from file</Typography>
          </Box>
        </DialogContent>
      </DialogContent>
      <ImportTaskModal projectId={projectId} />
    </DialogWithClose>
  )
}