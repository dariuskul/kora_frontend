import { Box, Typography } from '@mui/material';
import { CustomTable } from 'components/others/CustomTable';
import { Assignee } from 'pages/tasks/components/Assignee';
import { Filters } from 'pages/tasks/components/Filters';
import React, { useEffect } from 'react';
import { Row } from 'react-table';
import { useAppSelector } from 'store/selectors';
import { useAppThunkDispatch } from 'store/store';
import { getAvailableTasks } from 'store/tasks/actions';
import { IAvailableTask } from 'store/types/Task';

export const Tasks = () => {
  const dispatch = useAppThunkDispatch();
  const { availableTasks } = useAppSelector(s => s.tasksState);
  console.log(availableTasks);
  const columns = React.useMemo(
    () => [
      {
        Header: "Task",
        accessor: "description",
      },
      {
        Header: "Asignee",
        maxWidth: 200,
        accessor: (row: IAvailableTask) => <Assignee taskId={row.id} oldUserId={row?.assignee?.id || -1} name={row?.assignee?.fullName || "None"} />
      },
    ],
    []
  );
  // create async useEffect
  useEffect(() => {
    const getTasks = async () => {
      try {
        await dispatch(getAvailableTasks({ projectId: undefined }));
      } catch (error) {
        console.error(error);
      }
    }
    getTasks();
  }, []);




  return (
    <Box>
      <Typography variant="h4">Tasks</Typography>
      <Filters />
      <Box margin="0" maxWidth="50rem">
        <CustomTable searchLabel="Search tasks" columns={columns} data={availableTasks} />
      </Box>
    </Box>
  )
}