import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';

interface IInputUtil {
  icon?: React.ReactElement;
  name: string;
  inputErrorClass?: string;
  label?: string;
  placeholder?: string;
  color?: 'primary' | 'secondary';
  rows?: number;
  multiline?: boolean;
  autoFocus?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  secondIcon?: React.ReactElement;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordClick?: () => void;
  disabled: boolean;
  startIconStyle?: string;
  endIconStyle?: string;
  variant?: 'standard' | 'outlined';
  inputHeight?: string;
  id: string;
  inputStyle?: string;
  initialValue?: string;
}

const DateInput: React.FC<IInputUtil> = ({
  name,
  label,
  id,
  initialValue,
}) => (
  <Field name={name} id={id} initialValue={initialValue}>
    {({ input, meta }) => (
      <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          {...input}
          value={new Date(input.value).getDate() ? input.value : new Date()}
          label={label}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    )}
  </Field>
);

export default DateInput;
