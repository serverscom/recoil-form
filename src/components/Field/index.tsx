import * as React from 'react';

import InputField, { IInputFieldProps } from './Input';
import RadioField, { IRadioFieldProps } from './Radio';
import FileField, { IFileFieldProps } from './File';
import CheckboxField, { ICheckboxFieldProps } from './Checkbox';
import SelectField, { ISelectFieldProps } from './Select';
import { PolymorphicComponentProps, AnyObject } from '../../utils/types';

type GenericFieldProps<C extends React.ElementType, T> = C extends 'select'
  ? ISelectFieldProps
  : C extends 'input' | undefined
  ? T extends 'checkbox'
    ? ICheckboxFieldProps
    : T extends 'radio'
    ? IRadioFieldProps
    : T extends 'file'
    ? IFileFieldProps
    : IInputFieldProps
  : PolymorphicComponentProps<C>;

const isInput = (component: any) => component === undefined || component === 'input';

const isRecoilCheckbox = (props: AnyObject, component: any): props is ICheckboxFieldProps =>
  isInput(component) && props.type === 'checkbox';

const isRecoilRadio = (props: AnyObject, component: any): props is IRadioFieldProps =>
  isInput(component) && props.type === 'radio';

const isRecoilFile = (props: AnyObject, component: any): props is IFileFieldProps =>
  isInput(component) && props.type === 'file';

const isRecoilInput = (props: AnyObject, component: any): props is IInputFieldProps =>
  isInput(component) && !isRecoilCheckbox(props, component) && !isRecoilRadio(props, component);

const isRecoilSelect = (props: AnyObject, component: any): props is ISelectFieldProps =>
  props && component === 'select';

const GenericField = <T extends string, C extends React.ElementType = 'input'>(
  props: { as?: C; type?: T; fallback?: React.ReactNode } & GenericFieldProps<C, T>
): React.ReactElement => {
  const { as: component = 'input', fallback = null, ...componentProps } = props;

  let result;

  if (isRecoilSelect(componentProps, component)) {
    result = <SelectField {...componentProps} />;
  } else if (isRecoilCheckbox(componentProps, component)) {
    result = <CheckboxField {...componentProps} />;
  } else if (isRecoilRadio(componentProps, component)) {
    result = <RadioField {...componentProps} />;
  } else if (isRecoilFile(componentProps, component)) {
    result = <FileField {...componentProps} />;
  } else if (isRecoilInput(componentProps, component)) {
    result = <InputField {...componentProps} />;
  } else {
    result = React.createElement(component, componentProps);
  }

  return <React.Suspense fallback={fallback}>{result}</React.Suspense>;
};

export default GenericField;
