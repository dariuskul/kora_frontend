import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { modifyProject } from 'store/projects/actions';
import { useAppThunkDispatch } from 'store/store';
import { TApiProjectItem } from 'store/types/Project';


export const ProjectMenu = React.memo((project: TApiProjectItem) => {
  const dispatch = useAppThunkDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const archiveProject = async () => {
    dispatch(modifyProject({ projectId: project.id, projectInfo: { isArchived: project.isArchived ? false : true } }))
  }

  const OPTIONS = [{ name: project.isArchived ? 'Restore' : 'Archive', action: () => archiveProject() }];
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {OPTIONS.map((option) => (
          <MenuItem onClick={option.action} key={option.name} >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})