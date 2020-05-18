import * as React from 'react';
import useField from '../../hooks/useField';

export interface IRecoilCheckboxProps extends JSX.IntrinsicAttributes {
  name: string;
}

// TODO: checkbox with value? <input type="checkbox" name="answer" value={42} />
const Checkbox: React.FC<IRecoilCheckboxProps> = ({ name, ...props }) => {
  const [{ onChange, ...inputProps }] = useField<boolean>(name);

  const handleChange = React.useCallback(
    event => {
      onChange(event.target.checked);
      // TODO: call original onChange
    },
    [onChange]
  );

  return (
    <input
      {...props}
      {...inputProps}
      type="checkbox"
      value={undefined}
      checked={!!inputProps.value}
      onChange={handleChange}
    />
  );
};

export default Checkbox;
