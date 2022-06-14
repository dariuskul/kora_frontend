import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import React from 'react';
import { Field } from 'react-final-form';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from 'date-fns/locale/en-US';
import { DatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import format from 'date-fns/format';
import ltLocale from 'date-fns/locale/lt';
import i18n from 'i18n';

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

class LtLocalizedUtil extends AdapterDateFns {
  // eslint-disable-next-line class-methods-use-this
  public getDatePickerHeaderText(date: Date) {
    const splitedDate = format(date, 'EEEEEE, MMMM. d', { locale: ltLocale }).split(', ');
    const formatedDate = [
      splitedDate[0],
      splitedDate[1].charAt(0).toUpperCase() + splitedDate[1].slice(1),
    ].join(', ');
    return formatedDate;
  }

  // eslint-disable-next-line class-methods-use-this
  public getCalendarHeaderText(date: Date) {
    const formatedDate = format(date, 'MMMM yyyy', { locale: ltLocale });
    return formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
  }
}


const DateInput: React.FC<IInputUtil> = ({
  name,
  label,
  id,
  initialValue,
}) => {
  const language = i18n.language.toLocaleLowerCase();
  return (
    <Field name={name} id={id} initialValue={initialValue}>
      {({ input, meta }) => (
        <LocalizationProvider locale={language === 'lt' ? ltLocale : enLocale} dateAdapter={language === 'en' ? AdapterDateFns : LtLocalizedUtil}>
          <MobileDatePicker
            {...input}
            value={new Date(input.value).getDate() ? input.value : new Date()}
            label={label}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      )}
    </Field>
  )
};

export default DateInput;
