import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
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
  autoFocus?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  secondIcon?: React.ReactElement;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordClick?: () => void;
  startIconStyle?: string;
  endIconStyle?: string;
  variant?: 'standard' | 'outlined';
  id: string;
}

const TimeInput: React.FC<IInputUtil> = ({
  name,
  label,
  placeholder,
  color,
  autoFocus = false,
  fullWidth = false,
  required = false,
  onFocus,
  onBlur,
  handlePasswordClick,
  id,
}) => (
  <Field name={name} id={id} >
    {({ input, meta }) => (
      <MuiPickersUtilsProvider locale={enLocale} utils={DateFnsUtils}>
        <KeyboardTimePicker
          {...input}
          margin="none"
          onChange={input.onChange}
          required={required}
          ampm={false}
          placeholder={placeholder}
          fullWidth={fullWidth}
          label={label}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          error={meta.error && meta.touched}
          helperText={meta.touched ? meta.error : ''}
          id={id}
          color={color}
        />
      </MuiPickersUtilsProvider>
    )}
  </Field>
);

export default TimeInput;
