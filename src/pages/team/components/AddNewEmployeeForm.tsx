import React from "react";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import InputUtil from "components/inputs/InputUtil";
import { Form } from "react-final-form";
import { useAppThunkDispatch } from "store/store";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";
import { getErrorMessage } from "utils/error";
import { IAddEmployeevalues } from "store/users/types";
import { inviteUser } from "services/auth.service";

interface IAddNewEmployeeForm {
  onClose?: () => void;
}

export const AddNewEmployeeForm: React.FC<IAddNewEmployeeForm> = ({ onClose }) => {
  const dispatch = useAppThunkDispatch();

  const validate = (values: IAddEmployeevalues) => {
    const errors: IAddEmployeevalues = {
      email: "",
    };
    if (!values.email) {
      errors.email = "Required";
    }
    return Object.values(errors).filter(Boolean).length ? errors : {};
  };

  const onSubmit = async (values: IAddEmployeevalues) => {
    try {
      await inviteUser(values);
      toast.success(<Toast message="Project created successfully" />)
      onClose?.();
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />)
    }
  };
  return (
    <Box width="100%">
      <Form
        validate={validate}
        validateOnBlur={false}
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, values }) => (
          <form
            style={{ width: "100%" }}
            onSubmit={handleSubmit}
            id="loginForm"
          >
            <Box display="flex" flexDirection="column" gap="1rem">
              <InputUtil
                label="User email"
                id="project-name"
                name="email"
                type="text"
                disabled={submitting}
              />
              <Box width="100%" maxWidth="10rem">
                <Button
                  fullWidth
                  disabled={submitting}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  <Box alignItems="center" display="flex">
                    <Typography mr="0.5rem">Add</Typography>
                    {submitting && <CircularProgress size="1rem" />}
                  </Box>
                </Button>
              </Box>
            </Box>
          </form>
        )}
      ></Form>
    </Box>
  );
};
