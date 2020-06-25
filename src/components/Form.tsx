import * as React from 'react';
import { useRecoilCallback, useSetRecoilState, CallbackInterface } from 'recoil';
import { O } from 'ts-toolbelt';

import FormKey from '../contexts/FormKey';
import uniqueId from '../utils/uniqueId';
import getFieldKey from '../utils/getFieldKey';
import toPairs from '../utils/toPairs';
import { getFormErrorsAtom, getFormFieldsAtom, getFormStateAtom, getFormValuesAtom } from '../atoms/form';
import { getFieldValueAtom, getFieldInitialValueAtom, getFieldTouchedAtom, getFieldErrorAtom } from '../atoms/field';

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
    ({ set }: CallbackInterface) => async () => {
      Object.entries(initialValues).forEach(([fieldName, fieldValue]) => {
        const fieldKey = getFieldKey(key, fieldName);
        set(getFieldInitialValueAtom(fieldKey), fieldValue);
      });
    },
    [key]
  );

  const resetForm = useRecoilCallback(
    ({ snapshot, reset }: CallbackInterface) => async () => {
      const fields = await snapshot.getPromise(getFormFieldsAtom(key));
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
    ({ snapshot, set }: CallbackInterface) => async () => {
      if (onSubmit === undefined) {
        return;
      }

      set(getFormStateAtom(key), 'submitting');
      const fields = await snapshot.getPromise(getFormFieldsAtom(key));
      Object.keys(fields).forEach(fieldKey => {
        const atom = getFieldTouchedAtom(fieldKey);
        set(atom, true);
      });
      const values = (await snapshot.getPromise(getFormValuesAtom(key))) as TValue;
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
  }, [setInitialValues]);

  return (
    <FormKey.Provider value={key}>
      <form {...props} onSubmit={onFormSubmit} onReset={onReset} />
    </FormKey.Provider>
  );
};

export default Form;
