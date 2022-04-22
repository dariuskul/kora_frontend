import { validate } from "@material-ui/pickers";
import { Box, Button, Paper, TextField, Tooltip } from "@mui/material";
import DateInput from "components/inputs/DateInput";
import InputUtil from "components/inputs/InputUtil";
import { MultiSelect } from "components/inputs/MultiSelect";
import moment from "moment";
import { Form } from "react-final-form";
import { getReport } from "services/admin.service";
import { TApiProjectItem } from "store/types/Project";
import { IUser } from "store/types/User";
interface IFilters {
  projects: Array<TApiProjectItem>;
  users: Array<IUser>;
  setFile: (file: Blob) => void;
}

export const Filters: React.FC<IFilters> = ({ projects, users, setFile }) => {

  const onSubmit = async (values: any) => {
    setFile(null);
    try {
      const res = await getReport(values.projects, values.dateFrom, values.dateTo);
      let blob = new Blob([res.data], { type: 'application/pdf' })
      setFile(blob);
    } catch (error) {
      
    }
  }

  const PROJECTS = ["All", ...projects.map((p) => p.name)];
  const USERS = [
    "All",
    ...users.filter((u) => u.fullName).map((u) => u.fullName),
  ];
  return (
    <Box mt="1.5rem">
      <Paper>
        <Form
          validateOnBlur={false}
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%" }}
              id="loginForm"
            >
              <Box
                alignItems="center"
                p={1}
                display="flex"
                flexWrap="wrap"
                gap="1rem"
              >
                <MultiSelect
                  type="outlined"
                  options={PROJECTS}
                  id="test"
                  defaultValue={PROJECTS[0]}
                  disabled={submitting}
                  name="projects"
                  color="white"
                  label="Select project"
                  labelId="Select project"
                />
                <DateInput
                  initialValue={moment().format('YYYY/MM/DD')}
                  label="Date from"
                  name="dateFrom"
                  disabled={submitting}
                  id="date-input"
                />
                <DateInput
                  initialValue={moment().format('YYYY/MM/DD')}
                  label="Date to"
                  name="dateTo"
                  disabled={submitting}
                  id="date-input"
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
