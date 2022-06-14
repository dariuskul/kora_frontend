import { Tooltip } from "@material-ui/core";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Toast } from "components/others/Toast";
import DialogWithClose from "components/tracking/modals/DialogWithClose";
import { useAdmin } from "hooks/use-admin";
import { useConfirm } from "material-ui-confirm";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { removeTask } from "services/admin.service";
import { updateTask, updateTimer } from "services/tracking.service";
import { closeEditModal } from "store/modals/modalSlice";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";

export const EditTaskModal: React.FC = () => {
  const { editTaskModal } = useAppSelector((s) => s.modalState);
  const { t } = useTranslation();
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
      title: t('areYouSureToDeleteTask'),
      description: t('allTrackingDataAboutTaskWillBeDeleted'),
      confirmationText: t('confirm'),
      cancellationText: t('cancel'),
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
  const isJiraTask = editTaskModal.data.taskLink;
  return (
    <DialogWithClose open={editTaskModal.open} onClose={handleClose}>
      <DialogTitle>
        <Box flexDirection="column" display="flex">
          <Typography variant="h6">{t("editTask")}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Tooltip placement="top" title={!!isJiraTask ? <Typography>{t('jiraTask')}</Typography> : ''}>
          <Box mt="0.5rem">
            <TextField disabled={!!isJiraTask} onChange={handleChange} label="Task name" defaultValue={value || editTaskModal.data.description} />
          </Box>
        </Tooltip>
        <Box display="flex" gap="0.5rem" mt="0.5rem">
          <Button onClick={handleSubmit} disabled={loading || !value?.length || isJiraTask} variant="contained">{t('save')}</Button>
          {isAdmin && <Button onClick={handleDelete} disabled={isJiraTask} variant="contained" color="error">{t('deleteTask')}</Button>}
        </Box>
      </DialogContent>
    </DialogWithClose>
  );
};
