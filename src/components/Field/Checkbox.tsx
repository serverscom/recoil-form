import * as React from 'react';
import useField from '../../hooks/useField';

export interface ICheckboxFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
  value?: any;
  uncheckedValue?: any;
}

const CheckboxField: React.FC<ICheckboxFieldProps> = ({
  name,
  value = true,
  uncheckedValue = undefined,
  defaultChecked,
  onChange: originalOnChange,
  onBlur: originalOnBlur,
  ...props
}) => {
  const [{ onChange, onBlur, ...inputProps }] = useField<any>(name, defaultChecked ? value : uncheckedValue);

  const handleChange = React.useCallback(
    event => {
      if (originalOnChange) {
        originalOnChange(event);
      }
      onChange(event.target.checked ? value : uncheckedValue);
    },
    [onChange, originalOnChange, value, uncheckedValue]
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

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (![value, uncheckedValue, undefined].includes(inputProps.value)) {
        console.warn(
          "Checkbox value stored in the form state is equal neither to it's `value` nor to it's `uncheckedValue`"
        );
      }
    }, [inputProps.value, value, uncheckedValue]);
  }

  return (
    <input
      {...props}
      {...inputProps}
      type="checkbox"
      value={undefined}
      checked={inputProps.value === value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default CheckboxField;
