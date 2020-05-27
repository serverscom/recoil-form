import * as React from 'react';
import useField from '../../hooks/useField';

export interface IInputFieldProps extends Omit<React.HTMLProps<HTMLInputElement>, 'value'> {
  name: string;
  defaultValue?: string;
}

const InputField: React.FC<IInputFieldProps> = ({
  name,
  defaultValue,
  onChange: originalOnChange,
  onBlur: originalOnBlur,
  ...props
}) => {
  const [{ onChange, onBlur, ...inputProps }] = useField<string>(name, defaultValue, true);

  const handleChange = React.useCallback(
    event => {
      if (originalOnChange) {
        originalOnChange(event);
      }
      onChange(event.target.value);
    },
    [onChange, originalOnChange]
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
      value={inputProps.value === undefined ? '' : inputProps.value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default InputField;
