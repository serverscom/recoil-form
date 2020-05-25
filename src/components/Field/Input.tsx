import * as React from 'react';
import useField from '../../hooks/useField';

export interface IRecoilInputProps extends JSX.IntrinsicAttributes {
  name: string;
  onChange: (event: React.ChangeEvent) => any;
  onBlur: (event: React.FocusEvent) => any;
}

const Input: React.FC<IRecoilInputProps> = ({
  name,
  onChange: originalOnChange,
  onBlur: originalOnBlur,
  ...props
}) => {
  const [{ onChange, onBlur, ...inputProps }] = useField<string>(name);

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

export default Input;
