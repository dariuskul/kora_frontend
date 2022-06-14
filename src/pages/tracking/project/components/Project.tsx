import React, { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";

import { Loader } from "components/others/Loader";
import { Params, useParams } from "react-router-dom";
import { getProject, updateProject } from "services/tracking.service";
import { TApiProjectItem } from "store/types/Project";
import { ProjectTabs } from "pages/tracking/project/components/ProjectTabs";
import { ProjectMenu } from "pages/tracking/project/components/ProjectMenu";
import { TApiTaskItem } from "store/types/Task";
import EditIcon from '@mui/icons-material/Edit';
import { jiraImage } from "pages/tracking/timer/components/DayEntry";

export const Project = () => {
  const params: Params<string> = useParams();
  const [project, setProject] = useState<TApiProjectItem>();
  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await getProject(Number(params.projectId));
        setProject(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, []);

  if (!project) {
    return null;
  }

  if (!project && !loading) {
    return null;
  }

  const handeProjectNameChange = async (e: any) => {
    if (!e.target.value) {
      return;
    }
    if (e.key && e.key === "Enter") {
      await updateProject(project.id, { name: e.target.value });
      e.target.blur();
      setEditingName(false);
      return;
    }
  }

  return (
    <>
      <Loader loading={loading} />
      <Box>
        <Box alignItems="center" display="flex" gap="0.5rem">
          {project.isJiraProject ? <img src={jiraImage} /> : null} {editingName ? <TextField onKeyDown={handeProjectNameChange} onBlur={handeProjectNameChange} sx={{ fontSize: '2rem' }} defaultValue={project.name} /> : <Typography fontSize="2rem">{project.name}</Typography>}
          {!project.isJiraProject ? <IconButton onClick={() => setEditingName(prev => !prev)}>
            <EditIcon />
          </IconButton> : null}
          <ProjectMenu {...project} />
        </Box>
        {project?.tasks ? <ProjectTabs setProject={setProject} project={project} tasks={project.tasks || [] as Array<TApiTaskItem>} /> : null}
      </Box>
    </>
  )
}