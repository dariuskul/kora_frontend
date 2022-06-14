import React from "react";

import { Box, Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import InputUtil from "components/inputs/InputUtil";
import { Form } from "react-final-form";
import { ILoginValues } from "store/users/types";
import { useAppThunkDispatch } from "store/store";
import { toast } from "react-toastify";
import { Toast } from "components/others/Toast";
import { getErrorMessage } from "utils/error";
import { ICreateProjectValues } from "store/projects/types";
import { createProject } from "store/projects/actions";
import CheckBox from "components/inputs/Checkbox";
import { InfoOutlined } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface ICreateProjectForm {
  onClose?: () => void;
}

export const CreateProjectForm: React.FC<ICreateProjectForm> = ({ onClose }) => {
  const dispatch = useAppThunkDispatch();
  const { t } = useTranslation();

  const validate = (values: ICreateProjectValues) => {
    const errors: ICreateProjectValues = {
      name: "",
    };
    if (!values.name) {
      errors.name = "Required";
    }
    return Object.values(errors).filter(Boolean).length ? errors : {};
  };

  const onSubmit = async (values: ICreateProjectValues) => {
    try {
      await dispatch(createProject({ ...values, isPublic: !!values.isPublic })).unwrap();
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
                label={t('projectName')}
                id="project-name"
                name="name"
                type="text"
                disabled={submitting}
              />
              <Box display="flex" alignItems="center">
                <CheckBox name="isPublic" id="project-public" label={t('public')} />
                <Tooltip title={t('projectWillBevisibleToAll')}>
                  <InfoOutlined />
                </Tooltip>
              </Box>
              <Box width="100%" maxWidth="10rem">
                <Button
                  fullWidth
                  disabled={submitting}
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  <Box alignItems="center" display="flex">
                    <Typography mr="0.5rem">{t('create')}</Typography>
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
