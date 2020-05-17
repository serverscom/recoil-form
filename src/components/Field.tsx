import * as React from 'react';
import useField from '../hooks/useField';

interface IRecoilFieldProps extends JSX.IntrinsicAttributes {
  name: string;
  type: string;
  as?: React.ElementType;
}

const Field: React.FC<IRecoilFieldProps> = ({
  name,
  type,
  as: Component = 'input',
  ...props
}) => {
  const [inputProps] = useField(name);
  return (
    <Component
      {...props}
      {...inputProps}
      value={inputProps.value === undefined ? '' : inputProps.value}
    />
  );
};

export default Field;
