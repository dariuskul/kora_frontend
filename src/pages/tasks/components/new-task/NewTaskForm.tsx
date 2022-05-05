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
import { createNewTask } from "store/tasks/actions";
import { SelectInput } from "components/inputs/Select";
import { useAppSelector } from "store/selectors";
import { useConfirm } from "material-ui-confirm";

export type TCreateTask = {
  description: string;
  project?: string;
}


export const NewTaskForm: React.FC<any> = ({ onClose }) => {
  const dispatch = useAppThunkDispatch();
  const confirm = useConfirm();
  const { availableTasks } = useAppSelector((s) => s.tasksState);
  const { projects } = useAppSelector((s) => s.projectsState);

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
    const findId = projects.find((p) => p.name === values.project);
    const findSimiliar = availableTasks.find((t) => t.description.includes(values.description) && t.project.id === findId?.id);
    if (findSimiliar) {
      await confirm({
        title: "Similar task found",
        description: `Task with similar description and project found. Do you still want to create new task?`,
        confirmationText: "Confirm",
        cancellationText: "Cancel",
      });
    }
    const projectId = findId ? findId.id : "";
    if (projectId) {
      try {
        await dispatch(createNewTask({ description: values.description, projectId })).unwrap();
        onClose();
      }
      catch (error) {
        toast.error(<Toast message={getErrorMessage(error)} />)
      }
    } else {
      try {
        await dispatch(createNewTask({ description: values.description })).unwrap();
        onClose();
      }
      catch (error) {
        toast.error(<Toast message={getErrorMessage(error)} />)
      }
    }
  };

  const options = ['None', ...projects.map((p) => p.name)];
  return (
    <Box p="1.5rem" width="100%">
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
              <SelectInput
                id="project-select"
                label="Select project"
                color="primary"
                labelId="project"
                name="project"
                disabled={submitting}
                defaultValue={options[0]}
                options={options}
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
