import { Box, Button } from '@mui/material';
import InputUtil from 'components/inputs/InputUtil';
import { SelectInput } from 'components/inputs/Select';
import { Toast } from 'components/others/Toast';
import React from 'react';
import { Form } from 'react-final-form';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';
import { IUser } from 'store/types/User';
import { updateEmployee, updateUser } from 'store/users/actions';

interface ITeamMemberForm {
  user: IUser;
}

export const TeamMemberForm: React.FC<ITeamMemberForm> = ({ user }) => {
  const { role, id } = useAppSelector(s => s.userState);
  const dispatch = useAppThunkDispatch();
  const availableRoles = role === 'admin' ? ['admin', 'moderator', 'user'] : ['moderator', 'user'];
  const handleSumbit = async (values: any) => {
    try {
      await dispatch(updateEmployee({ ...values, id: user.id, role: values.role.toLocaleLowerCase() || user.role })).unwrap();
      toast.success(<Toast message='User updated' />);
    } catch (error) {

    }
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
            {user.id !== id && <SelectInput id="role-seelection" label="Role" defaultValue={user.role.toUpperCase()} color="black" disabled={submitting} labelId="role" name='role' options={availableRoles.map(item => item.toUpperCase())} />}
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