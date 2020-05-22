import * as React from 'react';
import FormKey from '../contexts/FormKey';

export default function useFormKey() {
  const formKey = React.useContext(FormKey);
  if (!formKey) {
    throw new Error("useFormKey is used outside of Form context");
  }

  return formKey;
}
