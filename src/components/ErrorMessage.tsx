import * as React from 'react';
import useFieldError from '../hooks/useFieldError';
import useFieldTouched from '../hooks/useFieldTouched';

export interface IErrorMessageProps extends JSX.IntrinsicAttributes {
  name: string;
  as?: React.ElementType;
}

const Input: React.FC<IErrorMessageProps> = ({
  name,
  as: Component = 'small',
  ...props
}) => {
  const error = useFieldError<any>(name);
  const touched = useFieldTouched(name);

  if (touched && error) {
    return <Component {...props}>{error}</Component>;
  }

  return null;
};

export default Input;
