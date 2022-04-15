import { DialogContent, Typography } from "@mui/material";
import DialogWithClose from "components/tracking/modals/DialogWithClose";
import { AddUsersToProjectForm } from "pages/tracking/project/components/AddUsersToProjectForm";
import { TApiProjectItem } from "store/types/Project";

interface IAddUsersToProjectModal {
  open: boolean;
  setOpen: (open: boolean) => void;
  project: TApiProjectItem,
}

export const AddUsersToProjectModal: React.FC<IAddUsersToProjectModal> = ({ open, setOpen, project }) => {
  return (
    <DialogWithClose fullWidth open={open} onClose={() => setOpen(false)}>
      <DialogContent>
        <Typography fontSize="1.5rem">Add new members to project</Typography>
        <DialogContent sx={{ padding: 0 }}>
          <AddUsersToProjectForm project={project} onClose={() => setOpen(false)} />
        </DialogContent>
      </DialogContent>
    </DialogWithClose>
  )
}