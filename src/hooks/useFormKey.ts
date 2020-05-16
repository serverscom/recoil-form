import * as React from 'react';
import FormKey from '../contexts/FormKey';

export default function useFormKey() {
  return React.useContext(FormKey);
}
