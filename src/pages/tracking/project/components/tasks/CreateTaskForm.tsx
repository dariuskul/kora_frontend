import React from "react";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import InputUtil from "components/inputs/InputUtil";
import { Form } from "react-final-form";
import { ILoginValues } from "store/users/types";
import { useAppThunkDispatch } from "store/store";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";
import { getErrorMessage } from "utils/error";
import { ICreateProjectValues } from "store/projects/types";
import { createProject } from "store/projects/actions";
import { TCreateTask } from "store/types/Task";
import { createNewTask } from "store/tasks/actions";

interface ICreateProjectForm {
  onClose?: () => void;
  projectId?: number;
}

export const CreateTaskForm: React.FC<ICreateProjectForm> = ({ onClose, projectId }) => {
  const dispatch = useAppThunkDispatch();

  const validate = (values: TCreateTask) => {
    const errors: TCreateTask = {
      description: "",
    };
    if (!values.description) {
      errors.description = "Required";
    }
    return Object.values(errors).filter(Boolean).length ? errors : {};
  };

  const onSubmit = async (values: TCreateTask) => {
    try {
      await dispatch(createNewTask({ ...values, projectId })).unwrap();
      toast.success(<Toast message="Task created successfully" />)
      onClose?.();
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />)
    }
  };
  return (
    <Box width="100%">
      <Form
        validate={validate}
        validateOnBlur={false}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, values }) => (
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit}
            id="loginForm"
          >
            <Box display="flex" flexDirection="column" gap="1rem">
              <InputUtil
                label="Task name"
                id="project-name"
                name="description"
                type="text"
                disabled={submitting}
              />
              <Box width="100%" maxWidth="10rem">
                <Button
                  fullWidth
                  disabled={submitting}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  <Box alignItems="center" display="flex">
                    <Typography mr="0.5rem">Create</Typography>
                    {submitting && <CircularProgress size="1rem" />}
                  </Box>
                </Button>
              </Box>
            </Box>
          </form>
        )}
      ></Form>
    </Box>
  );
};
