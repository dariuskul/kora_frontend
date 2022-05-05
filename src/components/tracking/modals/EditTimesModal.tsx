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
import React, { useState } from "react";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { updateTimer } from "services/tracking.service";
import { closeEditModal } from "store/modals/modalSlice";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";
import { formatDate, formatDateShort } from "utils/timer";

interface IEditTimesModal {
  data: any;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const EditTimesModal: React.FC<IEditTimesModal> = () => {
  const { timerEditModal } = useAppSelector((s) => s.modalState);
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

  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  const handleChange = async (e: any, item: any) => {
    const timeAndDate = e.target.value.split(":");
    setLoading(true);
    if (regex.test(e.target.value)) {
      const newDate = moment(item.endDate)
        .set("hour", timeAndDate[0])
        .set("minute", timeAndDate[1])
        .format();
      await updateTimer(item.id, { endDate: newDate });
      toast.success(<Toast message="Time entry updated " />);
    } else {
      e.target.value = formatDate(item.endDate);
    }
    setLoading(false);
  };
  return (
    <DialogWithClose open={timerEditModal.open} onClose={handleClose}>
      <DialogTitle>
        <Box flexDirection="column" display="flex">
          <Typography fontSize="1.5rem">
            <strong>{task.description}</strong>
          </Typography>
          {task.project ? <Typography variant="subtitle1">#{task.project.name}</Typography> : null}
        </Box>
      </DialogTitle>
      <DialogContent>
        {formatDateShort(timeEntries[0].startDate)}
        <Typography>Time entries</Typography>
        <Box
          maxHeight="20rem"
          overflow="hidden scroll"
          display="flex"
          flexDirection="column"
          gap="0.25rem"
        >
          {timeEntries.map((item: any) => (
            <Box gap="0.5rem" display="flex" key={item.id}>
              <TextField
                color={item.forced ? "primary" : "warning"}
                value={formatDate(item.startDate)}
                disabled
              ></TextField>{" "}
              -
              <TextField
                disabled={loading}
                sx={{ input: { color: item.forced ? "red" : "black" } }}
                onBlur={(e) => handleChange(e, item)}
                defaultValue={formatDate(item.endDate)}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
    </DialogWithClose>
  );
};
