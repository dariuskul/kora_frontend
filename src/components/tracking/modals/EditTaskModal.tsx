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
import { useAdmin } from "hooks/use-admin";
import { useConfirm } from "material-ui-confirm";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { toast } from "react-toastify";
import { removeTask } from "services/admin.service";
import { updateTask, updateTimer } from "services/tracking.service";
import { closeEditModal } from "store/modals/modalSlice";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";
import { formatDate, formatDateShort } from "utils/timer";

export const EditTaskModal: React.FC = () => {
  const { editTaskModal } = useAppSelector((s) => s.modalState);
  const confirm = useConfirm();
  const isAdmin = useAdmin();
  const [value, setValue] = useState(editTaskModal.data?.description);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppThunkDispatch();
  const handleClose = () => {
    dispatch(closeEditModal());
  };


  useEffect(() => {
    setValue(editTaskModal.data?.description);
  }, [editTaskModal.data])
  if (!editTaskModal.data) {
    return null;
  }

  const handleChange = async (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateTask(editTaskModal.data.id, { description: value });
      toast.success(<Toast message="Task updated" />);
    } catch (error) {
      toast.error(<Toast message={error.message} />);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async () => {
    setLoading(true);
    await confirm({
      title: "Are you sure you want to delete this task?",
      description: "All tracking data about this task will be lost and you will not be able to restore it!",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
    });
    try {
      await removeTask(editTaskModal.data.id);
      toast.success(<Toast message="Task deleted" />);
    } catch (error) {
      toast.error(<Toast message={error?.message} />);
    } finally {
      setLoading(false);
    }
  }
  return (
    <DialogWithClose open={editTaskModal.open} onClose={handleClose}>
      <DialogTitle>
        <Box flexDirection="column" display="flex">
          Edit task
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mt="0.5rem">
          <TextField onChange={handleChange} label="Task name" defaultValue={value || editTaskModal.data.description} />
        </Box>
        <Box display="flex" gap="0.5rem" mt="0.5rem">
          <Button onClick={handleSubmit} disabled={loading || !value?.length} variant="contained">Save</Button>
          {isAdmin && <Button onClick={handleDelete} variant="contained" color="error">Delete task</Button>}
        </Box>
      </DialogContent>
    </DialogWithClose>
  );
};
