import { IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeUserFromProject } from 'services/tracking.service';

export const RemoveUser = ({ row, project }: any) => {
  const id = row?.id;
  const handleRemove = async () => {
    try {
      await removeUserFromProject(project, id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <IconButton color="error" onClick={handleRemove} >
      <DeleteIcon />
    </IconButton>
  )
}