import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { type } from "@testing-library/user-event/dist/type";
import { SelectInput } from "components/inputs/Select";
import React from "react";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { getProjects } from "store/projects/actions";
import { useAppSelector } from "store/selectors";
import { useAppThunkDispatch } from "store/store";

enum EStatus {
  All = "All",
  Archived = "Archived",
  Active = "Active",
}

enum EAccess {
  All = "All",
  Public = "Public",
  Private = "Private",
}

const EStatusArr = [EStatus.Active, EStatus.All, EStatus.Archived];
const EAccessArr = [EAccess.All, EAccess.Public, EAccess.Private];

export const ProjectFilters = () => {
  const dispatch = useAppThunkDispatch();
  const { t } = useTranslation();
  const clients = useAppSelector(s => s.clientsState);
  const [filters, setFilters] = useState({
    status: EStatus.Active,
    access: EAccess.Private,
  });

  const onSubmit = async (values: any) => {
    await dispatch(getProjects({ ...values }));
  };

  return (
    <Paper elevation={2}>
      <Box width="100%" padding="0.75rem 1.625rem" bgcolor="white">
        <Form
          validateOnBlur={false}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <Box display="flex" gap="0.5rem" alignItems="center">
                <SelectInput
                  defaultValue={EStatus.Active}
                  color="white"
                  options={EStatusArr}
                  id="status"
                  disabled={submitting}
                  name="status"
                  label={t('status')}
                  labelId="status"
                />
                <SelectInput
                  defaultValue={EAccess.All}
                  color="white"
                  options={EAccessArr}
                  id="Access"
                  disabled={submitting}
                  name="access"
                  label={t('access')}
                  labelId="Access"
                />
                <Field name="client" defaultValue={-1}>
                  {({ input, meta }) => (
                    <FormControl
                      error={meta.touched && meta.error}
                      disabled={submitting}
                      sx={{ maxWidth: '10rem' }}
                      fullWidth
                    >
                      <InputLabel id="client">{t('client')}</InputLabel>
                      <Select
                        {...input}
                        fullWidth
                        variant={"outlined"}
                        value={input.value}
                        labelId="client"
                        label={t('client')}
                      >
                        <MenuItem key='None' value={-1}>
                          None
                        </MenuItem>
                        {clients?.clients?.map(opt => (
                          <MenuItem key={opt.name} value={opt.id}>
                            {opt.name.length ? opt.name : 'None'}
                          </MenuItem>
                        ))}
                      </Select>
                      {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                    </FormControl>
                  )}
                </Field>
                <Button color="primary" variant="contained" type="submit">
                  {t('apply')}
                </Button>
              </Box>
            </form>
          )}
        />
      </Box>
    </Paper>
  );
};
