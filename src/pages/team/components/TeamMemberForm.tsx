import { Box, Button } from '@mui/material';
import InputUtil from 'components/inputs/InputUtil';
import { SelectInput } from 'components/inputs/Select';
import React from 'react';
import { Form } from 'react-final-form';
import { useAppSelector, useAppThunkDispatch } from 'store/selectors';
import { IUser } from 'store/types/User';

interface ITeamMemberForm {
  user: IUser;
}

export const TeamMemberForm: React.FC<ITeamMemberForm> = ({ user }) => {
  const { role } = useAppSelector(s => s.userState);
  const dispatch = useAppThunkDispatch();
  const availableRoles = role === 'admin' ? ['admin', 'moderator', 'user'] : ['moderator', 'user'];
  const handleSumbit = (values: any) => {
    dispatch(updateUser(values)).unwrap();
  }
  return (
    <Form
      validateOnBlur={false}
      onSubmit={handleSumbit}
      render={({ handleSubmit, submitting, values }) => (
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit}
          id="loginForm"
        >
          <Box display="flex" flexDirection="column" gap="1rem">
            <InputUtil

              id="fullName-input"
              disabled={submitting}
              label="Full name"
              initialValue={user.fullName}
              name="fullName"
              type="text"
            />
            <InputUtil
              label="New password"
              id="password-input"
              name="password"
              type="password"
              disabled={submitting}
            />
            <InputUtil
              id="fullName-input"
              disabled={submitting}
              label="E-mail"
              initialValue={user.email}
              name="email"
              type="email"
            />
            <SelectInput id="role-seelection" label="Role" defaultValue={user.role.toUpperCase()} color="black" disabled={submitting} labelId="role" name='role' options={availableRoles.map(item => item.toUpperCase())} />
            <Button
              disabled={submitting}
              color="primary"
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    ></Form>
  )
}