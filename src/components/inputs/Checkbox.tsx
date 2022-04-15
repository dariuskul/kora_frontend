import React from 'react';
import { Field } from 'react-final-form';
import { Checkbox, FormControlLabel } from '@mui/material';

interface IEmailInput {
  style?: Record<any, string>;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  id: string;
  label: string;
  name: string;
}

const CheckBox: React.FC<IEmailInput> = ({
  style, onChange, disabled, id, label, name
}) => {

  return (
    <Field name={name}>
      {({ input, meta }) => (
        <FormControlLabel
          {...input}
          style={style}
          color="primary"
          label={label}
          name={name}
          disabled={disabled}
          id={id}
          control={<Checkbox onChange={e => {
            input.onChange(e);
            onChange?.(e);
          }} />}
        />
      )}
    </Field>
  );
};

export default CheckBox;
