import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { Loader } from "components/others/Loader";
import { Params, useParams } from "react-router-dom";
import { getProject } from "services/tracking.service";
import { TApiProjectItem } from "store/types/Project";
import { ProjectTabs } from "pages/tracking/project/components/ProjectTabs";
import { ProjectMenu } from "pages/tracking/project/components/ProjectMenu";
import { TApiTaskItem } from "store/types/Task";

export const Project = () => {
  const params: Params<string> = useParams();
  const [project, setProject] = useState<TApiProjectItem>();
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Loader loading={loading} />
      <Box>
        <Box alignItems="center" display="flex" gap="0.5rem">
          <Typography fontSize="2rem">{project.name}</Typography>
          <ProjectMenu {...project} />
        </Box>
        {project?.tasks ? <ProjectTabs project={project} tasks={project.tasks || [] as Array<TApiTaskItem>} /> : null}
      </Box>
    </>
  )
}