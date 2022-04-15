import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';

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
  placeholder,
  color,
  rows,
  multiline = false,
  autoFocus = false,
  fullWidth = false,
  required = false,
  onFocus,
  onBlur,
  handlePasswordClick,
  disabled,
  id,
  initialValue,
}) => (
  <Field name={name} id={id} initialValue={initialValue}>
    {({ input, meta }) => (
      <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
        <DatePicker
          {...input}
          margin="none"
          required={required}
          placeholder={placeholder}
          fullWidth={fullWidth}
          label={label}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          error={meta.error && meta.touched}
          helperText={meta.touched ? meta.error : ''}
          id={id}
          multiline={multiline}
          rows={rows}
          color={color}
          disableFuture
          disabled={disabled}
          onClick={handlePasswordClick}
          variant="dialog"
        />
      </MuiPickersUtilsProvider>
    )}
  </Field>
);

export default DateInput;
