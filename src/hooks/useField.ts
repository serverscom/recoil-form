import React from 'react';
// @ts-expect-error
import { useSetRecoilState } from 'recoil';

import useFormKey from './useFormKey';
import useFieldKey from './useFieldKey';
import useFieldValue from './useFieldValue';
import useSetFieldValue from './useSetFieldValue';
import { getFormFieldsAtom } from '../atoms/form';
import { getFieldMountedAtom, getFieldTouchedAtom } from '../atoms/field';

export interface IFieldInputProps<TValue> {
  name: string;
  onBlur(): void;
  onChange(e: React.ChangeEvent<any>): void;
  value: TValue;
}

export interface IFieldHelperProps<TValue> {
  setError(error: any): void;
  setTouched(state: boolean): void;
  setValue(value: TValue): void;
}

export default function useField<TValue>(
  name: string,
  initialValue?: TValue
): [IFieldInputProps<TValue>, {}, IFieldHelperProps<TValue>] {
  const formKey = useFormKey();
  const key = useFieldKey(name);

  const value = useFieldValue(name, initialValue);
  const setValue = useSetFieldValue(name);
  const setFormFields = useSetRecoilState(getFormFieldsAtom(formKey));

  const setMounted = useSetRecoilState(getFieldMountedAtom(key));
  const setTouched = useSetRecoilState(getFieldTouchedAtom(key));
  const setError = () => void 0;

  // TODO: onBlur
  const onBlur = React.useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  React.useEffect(() => {
    // register field
    setFormFields((fields: {}) => ({
      ...fields,
      [key]: name,
    }));
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [name, key, setFormFields, setMounted]);

  return [
    { name, value, onBlur, onChange: setValue },
    {},
    { setValue, setTouched, setError },
  ];
}
