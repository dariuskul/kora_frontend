import { IconButton } from "@mui/material"
import { DeleteForever } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
import { IUser } from "store/types/User";
import { useAppThunkDispatch } from "store/store";
import { removeEmployee } from "store/users/actions";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";

interface IRemoveEmployee {
  employee: IUser;
}

export const RemoveEmployee: React.FC<IRemoveEmployee> = ({ employee }) => {
  const confirm = useConfirm();
  const dispatch = useAppThunkDispatch();
  const handleClick = async () => {
    try {
      await confirm({
        title: "Are you sure you want to delete this employee?",
        description: "You won't be able to revert this!",
        confirmationText: "Confirm",
        cancellationText: "Cancel",
      });
      await dispatch(removeEmployee(employee.id.toString())).unwrap();
      toast.success(<Toast message="Employee removed succesfully" />);
    } catch (error) {

    }
  }
  return (
    <IconButton onClick={handleClick}>
      <DeleteForever color="error" />
    </IconButton>
  )
}
