import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Toast } from "components/others/Toast";
import DialogWithClose from "components/tracking/modals/DialogWithClose";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { editTaskTimer, updateTimer } from "services/tracking.service";
import { closeEditModal } from "store/modals/modalSlice";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";
import { getTimeEntries } from "store/tasks/actions";
import { formatDate, formatDateShort } from "utils/timer";

interface IEditTimesModal {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EditTimesModal: React.FC<IEditTimesModal> = () => {
  const { timerEditModal } = useAppSelector((s) => s.modalState);
  const { id } = useAppSelector((s) => s.userState);
  const [input, setInput] = useState<any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    const timeEntries = timerEditModal?.data?.item?.allData;
    if (timeEntries) {
      const duration = timeEntries.reduce((acc: any, curr: any) => {
        const startDate = moment(curr.startDate);
        const endDate = moment(curr.endDate);
        const durations = moment.duration(endDate.diff(startDate));
        return acc + durations.asMilliseconds()
      }, 0);
      const durationFormatted = moment.utc(duration).format("HH:mm:ss");
      setInput(durationFormatted);
    }

  }, [timerEditModal]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppThunkDispatch();
  const handleClose = () => {
    dispatch(closeEditModal());
  };

  if (!timerEditModal.data) {
    return null;
  }

  const task = timerEditModal.data.item.task;
  const timeEntries = timerEditModal.data.item.allData;

  // calculate duration from timeEntries (startDate and endDate) using moment

  const handleChange = (e: any) => {
    // if wrote like "1h" or "1h 30m" make it "01:30:00" with 2 digits
    const regex = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    setInput(e.target.value);
    if (regex.test(e.target.value)) {
      setError(undefined);
    }
  };
  const formatInput = () => {
    // check if input is "HH:mm:ss" format where numbers can go up to 99
    // if not, set error
    const regex = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!regex.test(input)) {
      setError("Format should be: 00:00:00");
      return;
    }
  };

  const onSubmit = async () => {
    const regex = /([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!regex.test(input)) {
      setError("Format should be: 00:00:00");
      return;
    }
    setLoading(true);
    const startDate = timeEntries[0].startDate;
    const taskId = timeEntries[0].task.id;
    if (!taskId) {
      return;
    }
    // convert "HH:mm:ss" to milliseconds
    const duration = moment.duration(input).asMilliseconds();
    setLoading(true);
    try {
      await editTaskTimer(taskId, duration, moment(startDate).format('YYYY-MM-DD'), id);
      await dispatch(getTimeEntries());
    } catch (error) {

    } finally {
      setLoading(false);
    }
  }
  return (
    <DialogWithClose open={timerEditModal.open} onClose={handleClose}>
      <DialogTitle>
        <Box flexDirection="column" display="flex">
          <Typography fontSize="1.5rem">
            <strong>{task.description}</strong>
          </Typography>
          {task.project ? <Typography variant="subtitle1">#{task.project.name}</Typography> : null}
          <Typography fontWeight="700">{formatDateShort(timeEntries[0].startDate)}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField error={!!error} helperText={error ?? ''} sx={{ marginTop: '0.5rem' }} onBlur={formatInput} label="Duration" onChange={handleChange} value={input} />
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
        <Button disabled={loading} onClick={onSubmit}>Save</Button>
      </DialogActions>
    </DialogWithClose>
  );
};
