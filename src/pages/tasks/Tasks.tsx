import { Box, Button, Typography } from "@mui/material";
import { CustomTable } from "components/others/CustomTable";
import { EditTaskModal } from "components/tracking/modals/EditTaskModal";
import { EditTimesModal } from "components/tracking/modals/EditTimesModal";
import { Assignee } from "pages/tasks/components/Assignee";
import { Filters } from "pages/tasks/components/Filters";
import { CreateNewTaskModal } from "pages/tasks/components/new-task/CreateNewTaskModal";
import React, { useEffect, useState } from "react";
import { Row } from "react-table";
import { openEditTaskModal } from "store/modals/modalSlice";
import { getProjects } from "store/projects/actions";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";
import { getAvailableTasks } from "store/tasks/actions";
import { IAvailableTask } from "store/types/Task";
import { TaskName } from "./components/TaskName";
import { TaskStatus } from "./components/TaskStatus";

export const Tasks = () => {
  const dispatch = useAppThunkDispatch();
  const [open, setOpen] = useState(false);
  const { availableTasks } = useAppSelector((s) => s.tasksState);
  const columns = React.useMemo(
    () => [
      {
        Header: "Task",
        accessor: (row: IAvailableTask) => (
          <TaskName project={row?.project?.name} taskName={row.description} />
        ),
      },
      {
        Header: "Assignee",
        maxWidth: 200,
        accessor: (row: IAvailableTask) => (
          <Assignee
            taskId={row.id}
            oldUserId={row?.assignee?.id || -1}
            name={row?.assignee?.fullName || "None"}
          />
        ),
      },
      {
        Header: "Status",
        maxWidth: 200,
        accessor: (row: IAvailableTask) => (
          <TaskStatus key={row.id} status={row.status} taskId={row.id} />
        ),
      },
    ],
    [availableTasks]
  );
  // create async useEffect
  useEffect(() => {
    const getTasks = async () => {
      try {
        await dispatch(getAvailableTasks({ projectId: undefined }));
        await dispatch(getProjects(""))
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, [dispatch]);

  const handleClick = (row: any) => {
    dispatch(openEditTaskModal(row.original));
  }

  return (
    <Box>
      <Typography variant="h4">Tasks</Typography>
      <Box mt="1.5rem">
        <Filters />
      </Box>
      <Box margin="0" maxWidth="70rem">
        <Box mt="1rem">
          <Button onClick={() => setOpen(true)} variant="contained">Create new task</Button>
        </Box>
        <CustomTable
          searchLabel="Search tasks"
          onCellClick={handleClick}
          columns={columns}
          data={availableTasks}
        />
      </Box>
      <EditTaskModal />
      <CreateNewTaskModal open={open} setOpen={setOpen} />
    </Box>
  );
};
