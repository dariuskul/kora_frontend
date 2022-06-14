import { IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeUserFromProject } from 'services/tracking.service';
import { toast } from 'react-toastify';
import { Toast } from 'components/others/Toast';

export const RemoveUser = ({ row, project }: any) => {
  const id = row?.id;
  const handleRemove = async () => {
    try {
      await removeUserFromProject(project, id);
    } catch (error) {
      toast.error(<Toast message="Error removing user" />);
    }
  }
  return (
    <IconButton color="error" onClick={handleRemove} >
      <DeleteIcon />
    </IconButton>
  )
}