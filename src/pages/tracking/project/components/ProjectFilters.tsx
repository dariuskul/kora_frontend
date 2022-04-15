import { Box, Button, Paper } from "@mui/material";
import { SelectInput } from "components/inputs/Select";
import React from "react";
import { useState } from "react";
import { Form } from "react-final-form";
import { getProjects } from "store/projects/actions";
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
                  label="Status"
                  labelId="status"
                />
                <SelectInput
                  defaultValue={EAccess.All}
                  color="white"
                  options={EAccessArr}
                  id="Access"
                  disabled={submitting}
                  name="access"
                  label="Access"
                  labelId="Access"
                />
                <Button color="primary" variant="contained" type="submit">
                  Apply
                </Button>
              </Box>
            </form>
          )}
        />
      </Box>
    </Paper>
  );
};
