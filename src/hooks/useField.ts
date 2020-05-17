import React from 'react';
// @ts-expect-error
import { useRecoilState, useSetRecoilState } from 'recoil';

import useFormKey from './useFormKey';
import useFieldKey from './useFieldKey';
import { getFormFieldsAtom } from '../atoms/form';
import {
  getFieldValueAtom,
  getFieldMountedAtom,
  getFieldTouchedAtom,
} from '../atoms/field';

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

  const [value, setValue] = useRecoilState(
    getFieldValueAtom(key, initialValue)
  );
  const setFormFields = useSetRecoilState(getFormFieldsAtom(formKey));

  const setMounted = useSetRecoilState(getFieldMountedAtom(key));
  const setTouched = useSetRecoilState(getFieldTouchedAtom(key));
  const setError = () => void 0;

  // TODO: onBlur
  const onBlur = React.useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  const onChange = React.useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue]
  );

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
  }, [key, setFormFields, setMounted]);

  return [
    { name, value, onBlur, onChange },
    {},
    { setValue, setTouched, setError }
  ];
}
