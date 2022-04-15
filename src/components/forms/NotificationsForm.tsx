import { Box, Button, Typography } from '@mui/material';
import { SelectInput } from 'components/inputs/Select';
import { Toast } from 'components/others/Toast';
import { NOTIFY_TIMES } from 'constants/other';
import React from 'react';
import { Form } from 'react-final-form';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';
import { updateUser } from 'store/users/actions';

interface INotifyValues {
  timerNotify: string;
}

export const NotificationsForm = () => {
  const dispatch = useAppThunkDispatch();
  const { notifyAfter } = useAppSelector(s => s.userState);
  const onSubmit = async (values: INotifyValues) => {
    const notifyTimer = NOTIFY_TIMES.find(item => item.name === values.timerNotify);
    try {
      await dispatch(updateUser({ notifyAfter: notifyTimer.value })).unwrap();
      toast.success(<Toast message="Settings updated successfully" />)
    } catch (error) {

    }
  }
  const defaultNotificationValue = NOTIFY_TIMES.find(item => item.value === notifyAfter)?.name || NOTIFY_TIMES[0].name;
  return (
    <Form
      validateOnBlur={false}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, values }) => (
        <form
          style={{ width: "100%" }}
          onSubmit={handleSubmit}
          id="loginForm"
        >
          <Box display="flex" flexDirection="column" gap="1rem">
            <Box gap="0.5rem" alignItems="center" display="flex">
              <Typography fontSize="0.875rem">
                Stop long-running timers after:
              </Typography>
              <Box maxWidth="10rem">
                <SelectInput
                  type="standard"
                  defaultValue={defaultNotificationValue}
                  color="white"
                  options={NOTIFY_TIMES.map(item => item.name)}
                  id="status"
                  disabled={submitting}
                  name="timerNotify"
                  label=""
                  labelId="status"
                />
              </Box>
            </Box>
            <Box maxWidth="10rem">
              <Button
                disabled={submitting}
                color="primary"
                type="submit"
                variant="contained"
              >
                Save changes
              </Button>
            </Box>
          </Box>
        </form>
      )}
    />
  );
}