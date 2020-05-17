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
  const { value, onBlur, onChange } = useField(name);
  return (
    <Component
      {...props}
      value={value === undefined ? '' : value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Field;
