import { TextField } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';

interface IInputUtil {
  icon?: React.ReactElement;
  name: string;
  type: string;
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

const InputUtil: React.FC<IInputUtil> = ({
  name,
  type,
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
  variant,
  id,
  initialValue,
}) => (
  <Field name={name} id={id} initialValue={initialValue}>
    {({ input, meta }) => (
      <TextField
        {...input}
        margin="none"
        required={required}
        placeholder={placeholder}
        fullWidth={fullWidth}
        label={label}
        autoFocus={autoFocus}
        onFocus={onFocus}
        sx={{ position: 'relative' }}
        onBlur={onBlur}
        error={meta.error && meta.touched}
        helperText={meta.touched ? meta.error : ''}
        type={type}
        id={id}
        multiline={multiline}
        rows={rows}
        color={color}
        disabled={disabled}
        onClick={handlePasswordClick}
        variant="standard"
      />
    )}
  </Field>
);

export default InputUtil;
