import { validate } from "@material-ui/pickers";
import { Box, Button, Paper, TextField, Tooltip } from "@mui/material";
import DateInput from "components/inputs/DateInput";
import InputUtil from "components/inputs/InputUtil";
import { MultiSelect } from "components/inputs/MultiSelect";
import { Form } from "react-final-form";

const PROJECTS = ["test", "test2"];

export const Filters = () => {
  return (
    <Box mt="1.5rem">
      <Paper>
        <Form
          validateOnBlur={false}
          onSubmit={() => console.log("test")}
          render={({ handleSubmit, submitting, values }) => (
            <form style={{ width: "100%" }} id="loginForm">
              <Box p={1} display="flex" flexWrap="wrap" gap="1rem">
                <MultiSelect
                  type="outlined"
                  options={PROJECTS}
                  id="test"
                  defaultValue="test"
                  disabled={submitting}
                  name="projects"
                  color="white"
                  label="Select project"
                  labelId="Select project"
                />
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
      </Paper>
    </Box>
  );
};
