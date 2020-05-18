import React from 'react';
import { useSetRecoilState } from 'recoil';

import useFormKey from './useFormKey';
import { getFieldRefCounterAtom } from '../atoms/field';
import { getFormFieldsAtom } from '../atoms/form';
import getFieldKey from '../utils/getFieldKey';

const useFieldKey = (fieldName: string) => {
  const formKey = useFormKey();
  const fieldKey = getFieldKey(formKey, fieldName);

  const setRefCounter = useSetRecoilState(getFieldRefCounterAtom(fieldKey));
  const setFormFields = useSetRecoilState(getFormFieldsAtom(formKey));

  React.useEffect(() => {
    // register field
    setFormFields((fields: {}) => ({
      ...fields,
      [fieldKey]: fieldName,
    }));

    setRefCounter(counter => counter + 1);

    return () => {
      setRefCounter(counter => counter - 1);
    };
  }, [fieldName, fieldKey, setFormFields, setRefCounter]);

  return getFieldKey(formKey, fieldName);
};

export default useFieldKey;
