import React from "react";
import { toast } from "react-toastify";
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material";
import InputUtil from "components/inputs/InputUtil";
import { Form } from "react-final-form";
import { IRegisterValues } from "store/users/types";
import { Toast } from "components/others/Toast";
import { getErrorMessage } from "utils/error";
import { register } from "services/auth.service";
import DateInput from "components/inputs/DateInput";

interface IRegisterForm {
  email: string;
}

export const RegisterForm: React.FC<IRegisterForm> = ({ email }) => {
  const validate = (values: IRegisterValues) => {
    const errors: IRegisterValues = {
      email: "",
      password: "",
      dateOfBirth: "",
      fullName: "",
    };
    if (!values.password) {
      errors.password = "Required";
    }
    return Object.values(errors).filter(Boolean).length ? errors : {};
  };

  const onSubmit = async (values: IRegisterValues) => {
    try {
      await register({ ...values, email });
      toast.success(<Toast message="Registration successful, you can login now" />)
    } catch (error) {
      toast.error(<Toast message={getErrorMessage(error)} />);
    }
  };
  return (
    <Box width="100%" maxWidth="30rem">
      <Typography sx={{ fontSize: '3rem !important' }} mb="1rem" align="center">
        Register
      </Typography>
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
              <Tooltip placement="top-end" title="You cannot change your registration email as you were invited with this email">
                <TextField variant="standard" value={email} disabled />
              </Tooltip>
              <Box>
                <DateInput disabled={submitting} id="tate" label="Birthday" name="dateOfBirth" />
              </Box>
              <InputUtil
                id="fullName-input"
                disabled={submitting}
                label="Full name"
                name="fullName"
                type="text"
              />
              <InputUtil
                label="Password"
                id="password-input"
                name="password"
                type="password"
                disabled={submitting}
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
