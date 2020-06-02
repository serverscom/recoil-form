import * as React from 'react';

export interface ISelectFieldProps extends Omit<React.HTMLProps<HTMLSelectElement>, 'value'> {
  name: string;
}

const SelectField = (/* props: ISelectFieldProps */): React.ReactElement => {
  throw new Error('`input` of type `select` is not supported yet!');
};

export default SelectField;
