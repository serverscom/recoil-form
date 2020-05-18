import * as React from 'react';
import useField from '../../hooks/useField';

export interface IRecoilInputProps extends JSX.IntrinsicAttributes {
  name: string;
}

const Input: React.FC<IRecoilInputProps> = ({ name, ...props }) => {
  const [{ onChange, ...inputProps }] = useField<string>(name);

  const handleChange = React.useCallback(
    event => {
      onChange(event.target.value);
      // TODO: call original onChange
    },
    [onChange]
  );

  return (
    <input
      {...props}
      {...inputProps}
      value={inputProps.value === undefined ? '' : inputProps.value}
      onChange={handleChange}
    />
  );
};

export default Input;
