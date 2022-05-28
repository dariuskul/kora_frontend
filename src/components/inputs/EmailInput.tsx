import React from 'react';
import { Field } from 'react-final-form';
import { validateEmail } from '../../utils/validators';
import { TextField } from '@mui/material';

interface IEmailInput {
  style?: Record<any, string>;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  id: string;
}

const EmailInput: React.FC<IEmailInput> = ({
  style, className, onChange, error, disabled, id,
}) => {

  const validEmail = (value: string) => {
    if (!value) {
      return 'Required field';
    }
    if (!validateEmail(value)) {
      return 'Wrong email address';
    }
    return undefined;
  };

  return (
    <Field name="email" validate={validEmail}>
      {({ input, meta }) => (
        <TextField
          {...input}
          style={style}
          color="primary"
          label="Email address "
          type="text"
          error={(meta.error && meta.touched && !meta.active) || !!error}
          helperText={meta.touched && !meta.active ? meta.error : ''}
          variant="standard"
          disabled={disabled}
          id={id}
          inputProps={{ "data-testid": "emailInput" }}
          onChange={e => {
            input.onChange(e);
            onChange?.(e);
          }}
        />
      )}
    </Field>
  );
};

export default EmailInput;
