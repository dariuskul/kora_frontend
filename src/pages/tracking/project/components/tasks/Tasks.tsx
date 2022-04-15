import { Box, Button, Typography } from '@mui/material';
import { CreateTaskModal } from 'pages/tracking/project/components/tasks/CreateTaskModal';
import { TasksTable } from 'pages/tracking/project/components/tasks/TasksTable';
import { TaskTime } from 'pages/tracking/project/components/tasks/TaskTime';
import React, { useState } from 'react';
import { Row } from 'react-table';
import { TApiTaskItem } from 'store/types/Task';

interface ITasks {
  tasks: Array<any>;
  projectId: number;
}

export const Tasks: React.FC<ITasks> = ({ projectId, tasks }) => {
  const [openModal, setOpenModal] = useState(false);

  const columns = React.useMemo(() => [
    {
      Header: `Task (${tasks.length} tasks)`,
      accessor: 'description',
    },
    {
      Header: 'Time',
      Cell: ({ row }: { row: Row<any> }) => <TaskTime timeSheets={row.original.timers} />,
    }
  ], []);

  return (
    <div>
      <Box paddingRight="0.75rem" maxWidth="15rem" marginLeft="auto">
        <Button fullWidth onClick={() => setOpenModal(true)} variant="contained">
          <Typography variant="body1">CREATE NEW TASK</Typography>
        </Button>
      </Box>
      <CreateTaskModal open={openModal} setOpen={setOpenModal} projectId={projectId} />
      <TasksTable columns={columns} data={tasks} />
    </div>
  )
}