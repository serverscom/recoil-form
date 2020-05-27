import * as React from 'react';
// @ts-expect-error
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { O } from 'ts-toolbelt';

import FormKey from '../contexts/FormKey';
import uniqueId from '../utils/uniqueId';
import getFieldKey from '../utils/getFieldKey';
import toPairs from '../utils/toPairs';
import { getFormErrorsAtom, getFormFieldsAtom, getFormStateAtom, getFormValuesAtom } from '../atoms/form';
import { getFieldValueAtom, getFieldInitialValueAtom, getFieldTouchedAtom, getFieldErrorAtom } from '../atoms/field';
import { release } from '../atoms/cache';

export interface IFormActions<TValue extends {}> {
  setErrors(field: keyof TValue, error: any): void;
  setValues<TKey extends keyof TValue>(field: TKey, value: TValue[TKey]): void;
}

interface IRecoilFormOwnProps<TValue extends {}> {
  initialValues?: Partial<TValue>;
  onSubmit?(values: TValue, formActions: IFormActions<TValue>): void;
}

type MergeProps<TTarget extends {}, TSource extends {}> = O.Merge<O.Overwrite<TTarget, TSource>, TSource>;

export type RecoilFormAllProps<TValue extends {}> = MergeProps<
  React.HTMLAttributes<HTMLFormElement>,
  IRecoilFormOwnProps<TValue>
>;

interface IRecoilCallbackParams {
  getPromise: (atom: any) => Promise<any>;
  getLoadable: (atom: any) => any;
  set: (atom: any, value: any) => void;
  reset: (atom: any) => void;
}

const Form = <TValue extends {}>({
  initialValues = {},
  onSubmit,
  ...props
}: RecoilFormAllProps<TValue>): React.ReactComponentElement<typeof FormKey.Provider> => {
  const key = React.useMemo(() => uniqueId(), []);
  const setFormValues = useSetRecoilState(getFormValuesAtom(key));
  const setFormErrors = useSetRecoilState(getFormErrorsAtom(key));

  const setValues = React.useCallback(
    (...args) => {
      const values = args.length === 1 ? args[0] : Object.fromEntries(toPairs(args));
      setFormValues(values);
    },
    [setFormValues]
  );

  const setErrors = React.useCallback(
    (...args) => {
      const errors = args.length === 1 ? args[0] : Object.fromEntries(toPairs(args));
      setFormErrors(errors);
    },
    [setFormErrors]
  );

  const setInitialValues = useRecoilCallback(
    async ({ set }: IRecoilCallbackParams) => {
      Object.entries(initialValues).forEach(([fieldName, fieldValue]) => {
        const fieldKey = getFieldKey(key, fieldName);
        set(getFieldInitialValueAtom(fieldKey), fieldValue);
      });
    },
    [key]
  );

  const resetForm = useRecoilCallback(
    async ({ getPromise, reset }: IRecoilCallbackParams) => {
      const fields = await getPromise(getFormFieldsAtom(key));
      Object.keys(fields).forEach(fieldKey => {
        reset(getFieldValueAtom(fieldKey));
        reset(getFieldTouchedAtom(fieldKey));
        reset(getFieldErrorAtom(fieldKey));
      });
    },
    [key]
  );

  const formActions = React.useMemo(
    () => ({
      setErrors,
      setValues,
      resetForm,
    }),
    [setErrors, setValues, resetForm]
  );

  const submitForm = useRecoilCallback(
    async ({ getPromise, set }: IRecoilCallbackParams) => {
      if (onSubmit === undefined) {
        return;
      }

      set(getFormStateAtom(key), 'submitting');
      const fields = await getPromise(getFormFieldsAtom(key));
      Object.keys(fields).forEach(fieldKey => {
        const atom = getFieldTouchedAtom(fieldKey);
        set(atom, true);
      });
      const values = await getPromise(getFormValuesAtom(key));
      await onSubmit(values, formActions);
      set(getFormStateAtom(key), 'ready');
    },
    [formActions, key, onSubmit]
  );

  const onFormSubmit = React.useCallback(
    event => {
      event.preventDefault();
      submitForm();
    },
    [submitForm]
  );

  const onReset = React.useCallback(
    event => {
      event.preventDefault();
      resetForm();
    },
    [resetForm]
  );

  React.useEffect(() => {
    setInitialValues();
    return () => release(key);
  }, [setInitialValues, key]);

  return (
    <FormKey.Provider value={key}>
      <form {...props} onSubmit={onFormSubmit} onReset={onReset} />
    </FormKey.Provider>
  );
};

export default Form;
