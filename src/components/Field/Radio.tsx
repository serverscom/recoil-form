import * as React from 'react';
import useField from '../../hooks/useField';

export interface IRadioFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  value: any;
}

const RadioField: React.FC<IRadioFieldProps> = ({
  name,
  value,
  defaultChecked,
  onChange: originalOnChange,
  onBlur: originalOnBlur,
  ...props
}) => {
  const [{ onChange, onBlur, ...inputProps }] = useField<any>(name, defaultChecked ? value : undefined);

  const handleChange = React.useCallback(
    event => {
      if (originalOnChange) {
        originalOnChange(event);
      }
      if (event.target.checked) {
        onChange(value);
      }
      onBlur(); // mark sa touched
    },
    [onChange, onBlur, originalOnChange, value]
  );

  const handleBlur = React.useCallback(
    event => {
      if (originalOnBlur) {
        originalOnBlur(event);
      }
      onBlur();
    },
    [onBlur, originalOnBlur]
  );

  return (
    <input
      {...props}
      {...inputProps}
      type="radio"
      value={JSON.stringify(value)}
      checked={inputProps.value === value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default RadioField;
