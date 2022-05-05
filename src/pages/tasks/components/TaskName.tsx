import React from "react";
import { Box, Typography } from '@mui/material';

interface ITaskName {
    taskName: string;
    project: string;
}

export const TaskName: React.FC<ITaskName> = ({ project, taskName }) => {
    return (
        <div>
            <Box display="flex" flexDirection="column">
                <Typography fontSize="1.5rem" variant="h3">{taskName}</Typography>
                {project && <Typography fontSize="0.875rem" variant="subtitle1">#{project}</Typography >}
            </Box>
        </div>
    )
}
