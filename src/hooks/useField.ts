import React from 'react';
import { useSetRecoilState } from 'recoil';

import useFieldKey from './useFieldKey';
import useFieldValue from './useFieldValue';
import useSetFieldError from './useSetFieldError';
import useSetFieldValue from './useSetFieldValue';
import { getFieldTouchedAtom } from '../atoms/field';

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

type Response<T> = [IFieldInputProps<T>, {}, IFieldHelperProps<T>];

function useField<TValue>(name: string): Response<TValue | undefined>;
function useField<TValue>(name: string, initialValue?: TValue): Response<TValue>;
function useField<TValue>(name: string, initialValue?: TValue): Response<TValue | undefined> {
  const key = useFieldKey(name);

  const value = useFieldValue(name, initialValue);
  const setValue = useSetFieldValue(name);
  const setError = useSetFieldError(name);

  const setTouched = useSetRecoilState(getFieldTouchedAtom(key));

  const onBlur = React.useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  return [{ name, value, onBlur, onChange: setValue }, {}, { setValue, setTouched, setError }];
}

export default useField;
