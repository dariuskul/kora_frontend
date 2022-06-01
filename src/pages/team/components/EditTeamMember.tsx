import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { IUser } from 'store/types/User';
import { EditTimesModal } from 'components/tracking/modals/EditTimesModal';
import { EditTeamMemberModal } from 'pages/team/components/EditTeamMemberModal';

interface IEditTeamMember {
  employee: IUser;
}

export const EditTeamMember: React.FC<IEditTeamMember> = ({ employee }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon color='primary' />
      </IconButton>
      <EditTeamMemberModal open={open} setOpen={setOpen} employee={employee} />
    </>
  )
}