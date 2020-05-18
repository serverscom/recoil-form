import * as React from 'react';

import Input from './Input';
import Checkbox from './Checkbox';

interface IRecoilFieldProps extends JSX.IntrinsicAttributes {
  name: string;
  type?: string;
  value?: any;
  as?: React.ElementType;
  fallback?: React.ReactNode;
}

const getComponent = (component: React.ElementType, type?: string): React.ElementType => {
  if (component === 'input') {
    switch (type) {
      case 'checkbox':
        return Checkbox;
      case 'radio':
        throw new Error('`input` of type `radio` is not supported yet!');
      case 'file':
        throw new Error('`input` of `file` is not supported yet!');
      default:
        return Input;
    }
  }

  if (component === 'select') {
    throw new Error('`select` is not supported yet');
  }

  return component;
}

const Field: React.FC<IRecoilFieldProps> = ({
  type,
  as= 'input',
  fallback = null,
  ...props
}) => {
  const Component = getComponent(as, type);
  return (
    <React.Suspense fallback={fallback}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default Field;
