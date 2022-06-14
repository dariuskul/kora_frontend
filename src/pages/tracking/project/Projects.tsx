import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Box, Button, Typography } from "@mui/material";
import { useAppThunkDispatch } from "store/store";

import { getProjects } from "store/projects/actions";
import { useAppSelector } from "store/selectors";
import { Toast } from "components/others/Toast";
import { Loader } from "components/others/Loader";
import { Row } from "react-table";
import { TApiProjectItem } from "store/types/Project";
import { ProjectName } from "pages/tracking/project/components/ProjectName";
import { CreateProjectModal } from "pages/tracking/project/components/CreateProjectModal";
import { TotalTracked } from "pages/tracking/project/components/TotalTacked";
import { CustomTable } from "components/others/CustomTable";
import { useNavigate } from "react-router-dom";
import { ProjectFilters } from "pages/tracking/project/components/ProjectFilters";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { projects } = useAppSelector((s) => s.projectsState);
  const { t } = useTranslation();

  const dispatch = useAppThunkDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: t('name'),
        accessor: "name",
        Cell: ({ row }: { row: Row<TApiProjectItem> }) => (
          <ProjectName value={row} />
        ),
        maxWidth: 500,
        minWidth: 300,
      },
      {
        Header: t('numberOfTasks'),
        accessor: (row: TApiProjectItem) => {
          return row.tasks.length;
        },
        width: "15%",
      },
      {
        Header: t('trackedHours'),
        Cell: ({ row }: { row: Row<TApiProjectItem> }) => (
          <TotalTracked value={row.original} />
        ),
      },
      {
        Header: t('access'),
        Cell: ({ row }: { row: Row<TApiProjectItem> }) => {
          return (
            <div>{row.original.isPublic ? t('public') : t('private')}</div>
          )
        },
        accessor: (row: TApiProjectItem) => {
          return row.isPublic ? "public" : "private";
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        await dispatch(getProjects('')).unwrap();
      } catch (error) {
        toast.error(<Toast message="Something went wrong" />);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [dispatch]);

  const onCellClick = (row: Row<TApiProjectItem>) => {
    navigate(`/projects/${row.original.id}`);
  };

  return (
    <Box>
      <Box mb="1rem" alignItems="center" justifyContent="space-between" display="flex">
        <Typography fontSize="2rem" variant="h3">
          {t('projects')}
        </Typography>
        <Button onClick={() => setOpenCreateModal(true)} variant="contained">{t('createNewProject')}</Button>
      </Box>
      <ProjectFilters />
      <Loader loading={loading} size="5rem" />
      <CustomTable
        onCellClick={onCellClick}
        searchLabel={t('searchProjects')}
        columns={columns}
        data={projects}
      />
      <CreateProjectModal open={openCreateModal} setOpen={setOpenCreateModal} />
    </Box>
  );
};
