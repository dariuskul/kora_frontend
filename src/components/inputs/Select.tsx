import React from 'react';
import { Field } from 'react-final-form';

import { Select, FormControl, FormHelperText, MenuItem, InputLabel, MenuProps } from '@mui/material';

interface IInput {
  required?: boolean;
  variant?: 'standard' | 'outlined' | 'filled';
  id: string;
  label: string;
  defaultValue: string;
  labelId: string;
  disabled: boolean;
  fullWidth?: boolean;
  name: string;
  options: Array<string>;
  color: string;
  MenuProps?: Partial<MenuProps>;
  type?: "standard" | "outlined" | "filled"
}

export const SelectInput = ({
  id,
  label,
  labelId,
  defaultValue,
  disabled,
  name,
  options,
  MenuProps,
  type
}: IInput) => (
  <Field name={name} defaultValue={defaultValue}>
    {({ input, meta }) => (
      <FormControl
        error={meta.touched && meta.error}
        disabled={disabled}
        sx={{ maxWidth: '10rem' }}
        fullWidth
      >
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <Select
          {...input}
          fullWidth
          variant={type || "outlined"}
          value={input.value}
          labelId={labelId}
          label={label}
          MenuProps={MenuProps}
        >
          {options.map(opt => (
            <MenuItem key={opt} value={opt}>
              {opt || '-'}
            </MenuItem>
          ))}
        </Select>
        {meta.error && meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
      </FormControl>
    )}
  </Field>
);

