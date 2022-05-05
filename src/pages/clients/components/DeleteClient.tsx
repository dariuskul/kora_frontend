import { Box } from "@mui/system"
import { useConfirm } from "material-ui-confirm";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { useAppThunkDispatch } from "store/store";
import { removeClient } from "store/clients/actions";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";
import EditIcon from '@mui/icons-material/Edit';
import { EditClientModal } from "pages/clients/components/EditClientModal";
import React from "react";
import { IClient } from "store/clients/types";

interface IDeleteClient {
  id: IClient;
}

export const DeleteClient: React.FC<IDeleteClient> = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const confirm = useConfirm();
  const dispatch = useAppThunkDispatch();
  const handleDelete = async () => {
    setOpen(true);
    // if (!id) return;
    // try {
    //   await confirm({
    //     title: "Are you sure you want to delete this client?",
    //     description: "This action cannot be undone.",
    //     confirmationText: 'Yes',
    //     cancellationText: 'No',
    //   });
    //   await dispatch(removeClient(id)).unwrap();
    //   toast.success(<Toast message="Client removed successfully" />)
    // } catch (error) {
    //   toast.error(<Toast message="Something went wrong. Please try again later" />)
    // }
  }
  return (
    <Box textAlign="right">
      <IconButton color="primary" onClick={handleDelete}>
        <EditIcon />
      </IconButton>
      <EditClientModal onClose={() => setOpen(false)} open={open} client={id} />
    </Box>
  )
}