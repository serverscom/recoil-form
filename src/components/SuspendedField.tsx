import * as React from 'react';
import Field from './Field';
import type { IRecoilFieldProps } from './Field';

interface IRecoilSuspendedFieldProps extends IRecoilFieldProps {
  fallback?: React.ReactNode;
}

const SuspendedField: React.FC<IRecoilSuspendedFieldProps> = ({ fallback = null, ...props }) => (
  <React.Suspense fallback={fallback}>
    <Field {...props} />
  </React.Suspense>
);

export default SuspendedField;
