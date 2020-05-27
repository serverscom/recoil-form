import * as React from 'react';
import useFieldError from '../hooks/useFieldError';
import useFieldTouched from '../hooks/useFieldTouched';
import { PolymorphicComponentProps } from 'utils/types';

const ErrorMessage = <C extends React.ElementType = 'small'>(
  props: { as?: C; name: string } & PolymorphicComponentProps<C>
): React.ReactElement | null => {
  const { as: component = 'small', name, ...componentProps } = props;
  const error = useFieldError<any>(name);
  const touched = useFieldTouched(name);

  if (touched && error) {
    return React.createElement(component, componentProps, <>{error}</>);
  }

  return null;
};

export default ErrorMessage;
