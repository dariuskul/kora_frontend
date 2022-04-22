import { Box, Button, Paper } from "@mui/material";
import { SelectInput } from "components/inputs/Select";
import React from "react";
import { useState } from "react";
import { Form } from "react-final-form";
import { getProjects } from "store/projects/actions";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";
import { getAvailableTasks } from "store/tasks/actions";

enum EStatus {
  All = "All",
  Archived = "Archived",
  Active = "Active",
}

enum EAccess {
  All = "All",
  Me = "Me",
  None = "None",
}

const EStatusArr = [EStatus.Active, EStatus.All, EStatus.Archived];
const EAccessArr = [EAccess.All, EAccess.Me, EAccess.None];

const STATUS = ['All', 'Active', 'Done']



export const Filters = () => {

  const dispatch = useAppThunkDispatch();
  const { projects } = useAppSelector(s => s.projectsState);
  const { id } = useAppSelector(s => s.userState);
  const [filters, setFilters] = useState({
    status: EStatus.Active,
    access: EAccess.All,
  });

  const projectArr = ['All', ...projects.map(p => p.name)];

  const onSubmit = async (values: any) => {
    const assignee = values.assignee === 'Me' ? id: values.assignee;
    const projectId = values.project === 'All' ? undefined : projects.find(p => p.name === values.project).id;
    await dispatch(getAvailableTasks({ assigneeId: assignee, projectId, status: values.status }));
  };


  return (
    <Paper elevation={2}>
      <Box width="100%" padding="0.75rem 1rem" bgcolor="white">
        <Form
          validateOnBlur={false}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Box display="flex" gap="0.5rem" alignItems="center">
                <SelectInput
                  defaultValue={projectArr[0]}
                  color="white"
                  options={projectArr}
                  id="status"
                  disabled={submitting}
                  name="project"
                  label="Project"
                  labelId="status"
                />
                <SelectInput
                  defaultValue={EAccess.All}
                  color="white"
                  options={EAccessArr}
                  id="Access"
                  disabled={submitting}
                  name="assignee"
                  label="Assignee"
                  labelId="Access"
                />
                <SelectInput
                  defaultValue={STATUS[0]}
                  color="white"
                  options={STATUS}
                  id="Access"
                  disabled={submitting}
                  name="status"
                  label="Status"
                  labelId="Access"
                />
                <Button color="primary" variant="contained" type="submit">
                  Apply
                </Button>
              </Box>
            </form>
          )}
        />
      </Box>
    </Paper>
  );
};
