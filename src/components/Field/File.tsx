import * as React from 'react';

export interface IFileFieldProps extends Omit<React.HTMLProps<HTMLInputElement>, 'value'> {
  name: string;
}

const FileField = (/* props: IFileFieldProps */): React.ReactElement => {
  throw new Error('`input` of type `file` is not supported yet!');
};

export default FileField;
