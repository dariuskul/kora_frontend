import { Box, Button, Checkbox, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';
import { updateUser } from 'store/users/actions';

interface INotifyValues {
  timerNotify: string;
}

export const EmailSendForm = () => {
  const { dailySummaries } = useAppSelector(s => s.userState);
  const dispatch = useAppThunkDispatch();
  const onDailyChange = async () => {
    await dispatch(updateUser({ dailySummaries: !dailySummaries })).unwrap();
  }
  return (
    <Box>
      <Box alignItems="center" display="flex">
        <Typography>Send daily summary</Typography>
        <Checkbox onChange={onDailyChange} checked={dailySummaries} />
      </Box>
    </Box>
  );
}
