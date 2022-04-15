import { Box, Button, DialogContent, DialogTitle, Typography } from '@mui/material';
import DialogWithClose from 'components/tracking/modals/DialogWithClose';
import React, { useState } from 'react';
import { closeImportTaskModal } from 'store/modals/modalSlice';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';
import Dropzone from 'react-dropzone-uploader'
import { checkCsv, createTask } from 'services/tracking.service';

import 'react-dropzone-uploader/dist/styles.css'
import { toast } from 'react-toastify';
import { Toast } from 'components/others/Toast';


interface IImportTaskModal {
  projectId?: number;
}

export const ImportTaskModal: React.FC<IImportTaskModal> = ({ projectId }) => {
  const { importTaskModal } = useAppSelector(s => s.modalState);
  const [parsedTasks, setParsedTasks] = useState([]);
  const dispatch = useAppThunkDispatch();
  const testCsv = async (file: any) => {
    const formData = new FormData();
    formData.append('test', file);
    try {
      const tasks = await checkCsv(formData);
      setParsedTasks(tasks.data.parsedTasks);
    } catch (error) {
      toast.error(<Toast message='Bad file format' />);
    }
  }

  const handleClose = () => {
    dispatch(closeImportTaskModal());
  }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = async (files) => {
    testCsv(files[0].file);
  }

  const handleCancel = () => {
    setParsedTasks([]);
  }

  const addAllTasks = async () => {
    if (!parsedTasks.length) return;
    try {
      // async foreach
      for (const task of parsedTasks) {
        await createTask(task, projectId)
      }
    } catch (error) {

    }
  }

  return (
    <DialogWithClose open={importTaskModal.open} onClose={handleClose}>
      <DialogTitle>
        <Typography fontSize="1.5rem">Import from file</Typography>
      </DialogTitle>
      <DialogContent>
        {!parsedTasks.length && (
          <Box border="2px #eeeeee dashed" p="1.25rem">
            <Dropzone
              onChangeStatus={handleChangeStatus}
              onSubmit={handleSubmit}
              inputContent="Drop csv file"
              maxFiles={1}
              multiple={false}
              styles={{
                dropzone: { width: 400, height: 200, overflow: 'auto' },
                dropzoneActive: { borderColor: 'green' },
              }}
            />
          </Box>
        )}
        {parsedTasks.length ? <Box>
          <Typography fontWeight="600" fontSize="1.25rem">Parsed tasks:</Typography>
          {parsedTasks.map((task, index) => (
            <Box key={index}>
              <Typography mb="0.5rem">{task}</Typography>
            </Box>
          ))}
          <Box display="flex" gap="0.5rem">
            <Button onClick={addAllTasks} sx={{ marginTop: '0.5rem' }} variant="contained">Save tasks</Button>
            <Button onClick={handleCancel} sx={{ marginTop: '0.5rem' }} color="error" variant="contained">Cancel</Button>
          </Box>
        </Box> : null}
      </DialogContent>
    </DialogWithClose>
  )
}