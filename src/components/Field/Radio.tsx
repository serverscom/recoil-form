import * as React from 'react';

export interface IRadioFieldProps extends React.HTMLProps<HTMLInputElement> {
  name: string;
}

const RadioField = (/* props: IRadioFieldProps */): React.ReactElement => {
  throw new Error('`input` of type `radio` is not supported yet!');
};

export default RadioField;
