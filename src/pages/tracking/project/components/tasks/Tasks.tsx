import { Box, Button, Typography } from '@mui/material';
import { CustomTable } from 'components/others/CustomTable';
import { CreateTaskModal } from 'pages/tracking/project/components/tasks/CreateTaskModal';
import { TasksTable } from 'pages/tracking/project/components/tasks/TasksTable';
import { TaskTime } from 'pages/tracking/project/components/tasks/TaskTime';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'react-table';
import { TApiTaskItem } from 'store/types/Task';

interface ITasks {
  tasks: Array<any>;
  projectId: number;
  isJira: boolean;
  setProject: (project: any) => void;
}

export const Tasks: React.FC<ITasks> = ({ projectId, tasks, isJira, setProject }) => {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();

  const columns = React.useMemo(() => [
    {
      Header: `Task (${tasks.length} tasks)`,
      accessor: 'description',
      Cell: ({ row: { original } }: any) => (
        <div>
          <Typography fontSize="1.25rem" fontWeight="500" variant="body2">{original.description}</Typography>
        </div>
      )
    },
    {
      Header: 'Time',
      Cell: ({ row }: { row: Row<any> }) => <TaskTime timeSheets={row.original.timers} />,
    }
  ], []);

  return (
    <div>
      <Box paddingRight="0.75rem" maxWidth="15rem" marginLeft="auto">
        {!isJira && <Button fullWidth onClick={() => setOpenModal(true)} variant="contained">
          <Typography variant="body1">{t('createNewTask')}</Typography>
        </Button>}
      </Box>
      <CreateTaskModal setProject={setProject} open={openModal} setOpen={setOpenModal} projectId={projectId} />
      <CustomTable searchLabel="Search tasks" columns={columns} data={tasks} />
    </div>
  )
}