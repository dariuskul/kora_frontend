import React from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import InputUtil from "components/inputs/InputUtil";
import { Form } from "react-final-form";
import { IRegisterValues, IUpdateValues } from "store/users/types";
import { Toast } from "components/others/Toast";
import { getErrorMessage } from "utils/error";
import { register } from "services/auth.service";
import DateInput from "components/inputs/DateInput";
import { updateUser } from "store/users/actions";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";

export const ProfileForm = () => {
  const { email, fullName } = useAppSelector(s => s.userState);
  const dispatch = useAppThunkDispatch();
  const validate = (values: IUpdateValues) => {
    const errors: IUpdateValues = {
      email: "",
      password: "",
      dateOfBirth: "",
      fullName: "",
    };
    return Object.values(errors).filter(Boolean).length ? errors : {};
  };

  const onSubmit = async (values: IUpdateValues) => {
    try {
      await dispatch(updateUser(values)).unwrap();
      toast.success(<Toast message="Profile was updated!" />)
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />);
    }
  };
  return (
    <Box width="100%" maxWidth="30rem">
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

                id="fullName-input"
                disabled={submitting}
                label="Full name"
                initialValue={fullName}
                name="fullName"
                type="text"
              />
              <InputUtil
                label="New password"
                id="password-input"
                name="password"
                type="password"
                disabled={submitting}
              />
              <InputUtil
                id="fullName-input"
                disabled={submitting}
                label="E-mail"
                initialValue={email}
                name="email"
                type="email"
              />
              <Button
                disabled={submitting}
                color="primary"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        )}
      ></Form>
    </Box>
  );
};
