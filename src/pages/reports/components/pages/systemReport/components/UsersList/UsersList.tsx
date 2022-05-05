import { Accordion } from '@material-ui/core';
import { Box } from '@mui/material';
import { UserItem } from 'pages/reports/components/pages/systemReport/components/UserItem/UserItem';
import React from 'react';

interface IUsersList {
  users: any;
}

export const UsersList: React.FC<IUsersList> = ({ users }) => {
  return (
    <Box>
      {users.map(user => (
        <UserItem key={user.id} {...user} />
      ))}
    </Box>
  );
};