import { Autocomplete, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import DateInput from 'components/inputs/DateInput';
import moment from 'moment';
import React from 'react';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { getUsersPerformance } from 'services/admin.service';
import { useAppSelector } from 'store/selectors';
import { TApiProjectItem } from 'store/types/Project';
import { IUser } from 'store/types/User';

interface IFilterResults {
  setFilterResults: (results: Array<IUser>) => void;
}

export const Filters: React.FC<IFilterResults> = ({ setFilterResults }) => {
  const team = useAppSelector(s => s.userState.team);
  const { projects } = useAppSelector(s => s.projectsState);
  const [teamSelect, setTeamSelect] = React.useState<IUser | null>(null);
  const [projectsSelect, setProjectsSelect] = React.useState<Array<TApiProjectItem>>([]);
  const { t } = useTranslation();
  const handleFilterSubmit = async (values: any) => {
    if (!teamSelect) return;
    const result = await getUsersPerformance(teamSelect?.id, projectsSelect.map(p => p.id), moment(values.date_from).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'), moment(values.date_to).format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'));
    setFilterResults(result.data)
  }
  return (
    <Box mt="1rem">
      <Stack>
        <Form
          onSubmit={handleFilterSubmit}
          validateOnBlur={false}
          render={({ handleSubmit, submitting, values }) => (
            <form
              style={{ width: "100%" }}
              onSubmit={handleSubmit}
              id="loginForm"
            >
              <Box display="flex" flexDirection="column" gap="1rem">
                <Stack flexWrap='wrap' alignItems='center' direction="row" gap="1rem">
                  <DateInput placeholder='' label={t('dateFrom')} name="date_from" disabled={false} id={''} />
                  <DateInput placeholder='' label={t('dateTo')} name="date_to" disabled={false} id={''} />
                  <Autocomplete
                    id="tags-standard"
                    sx={{ minWidth: 220 }}
                    options={team}
                    onChange={(value, user) => setTeamSelect(user)}
                    getOptionLabel={(option) => option.fullName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder=''
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label={t('team')}
                      />
                    )}
                  />
                  <Button
                    disabled={submitting}
                    color="primary"
                    id="registerSubmit"
                    type="submit"
                    variant="contained"
                  >
                    {t('submit')}
                  </Button>
                </Stack>
              </Box>
            </form>
          )}
        ></Form>
      </Stack>
    </Box>
  )
}