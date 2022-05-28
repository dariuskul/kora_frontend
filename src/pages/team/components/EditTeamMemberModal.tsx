import React from 'react';
import { DialogContent, DialogTitle, Typography } from '@mui/material';
import { ProfileForm } from 'components/forms/ProfileForm';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import { IUser } from 'store/types/User';
import { TeamMemberForm } from 'pages/team/components/TeamMemberForm';


interface IEditTeamMemberModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: IUser;
}

export const EditTeamMemberModal: React.FC<IEditTeamMemberModal> = ({ open, setOpen, employee }) => {
  return (
    <DialogWithClose fullWidth maxWidth="xs" open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        <Typography fontSize="1.5rem">Edit profile</Typography>
      </DialogTitle>
      <DialogContent sx={{ maxWidth: '30rem' }}>
        <TeamMemberForm user={employee} />
      </DialogContent>
    </DialogWithClose>
  )
}