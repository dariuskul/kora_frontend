import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import React, { useEffect } from 'react';
import { editTaskTimer } from 'services/tracking.service';
// make modal form
interface IEditDurationModal {
  open: boolean;
  onClose: () => void;
  currentObject: { date: string, duration: string, taskId: number, userId: number };
}

export const EditDurationModal: React.FC<IEditDurationModal> = ({ open, onClose, currentObject }) => {
  const [duration, setDuration] = React.useState(currentObject.duration);
  useEffect(() => {
    setDuration(currentObject.duration);
  }, [currentObject]);
  // parse '00:00:00' to miliseconds
  const parseDuration = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(':');
    return (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if input is valid duration '00:00:00' format
    setDuration(e.target.value);
  }
  const onSubmit = async () => {
    if (!duration.match(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)) {
      return;
    }
    await editTaskTimer(currentObject.taskId, parseDuration(duration), currentObject.date, currentObject.userId);
    onClose();
  }
  return (
    <DialogWithClose open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Edit duration</Typography>
      </DialogTitle>
      <DialogContent>
        <TextField sx={{ mt: '0.5rem' }} InputLabelProps={{
          shrink: true,
        }}
          label="Duration"
          onChange={onChange}
          value={duration} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Save</Button>
      </DialogActions>
    </DialogWithClose>
  )
}