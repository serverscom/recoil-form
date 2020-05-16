import * as React from 'react';
// @ts-expect-error
import { useRecoilCallback } from 'recoil';

import FormKey from '../contexts/FormKey';
import uniqueId from '../utils/uniqueId';
import getFieldKey from '../utils/getFieldKey';
import { getFormFieldsAtom } from '../atoms/form';
import { getFieldValueAtom, getFieldInitialValueAtom } from '../atoms/field';


interface IRecoilFormProps extends React.HTMLAttributes<HTMLFormElement> {
  initialValues?: {
    [key: string]: any;
  };
}

interface IRecoilCallbackParams {
  getPromise: (atom: any) => Promise<any>;
  getLoadable: (atom: any) => any;
  set: (atom: any, value: any) => void;
  reset: (atom: any) => void;
}

const Form: React.FC<IRecoilFormProps> = ({ initialValues = {}, ...props }) => {
  const key = React.useMemo(() => uniqueId(), []);
  console.log('render form', key);

  const setInitialValues = useRecoilCallback(async ({ set }: IRecoilCallbackParams) => {
    Object.entries(initialValues).forEach(([fieldName, fieldValue]) => {
      const fieldKey = getFieldKey(key, fieldName);
      set(getFieldInitialValueAtom(fieldKey), fieldValue);
    });
  }, [key]);

  const resetForm = useRecoilCallback(async ({ getPromise, reset }: IRecoilCallbackParams) => {
    const fields = await getPromise(getFormFieldsAtom(key));
    Object.keys(fields).forEach((fieldKey) => {
      reset(getFieldValueAtom(fieldKey));
    });
  }, [key]);

  const logFormValues = useRecoilCallback(async ({ getPromise }: IRecoilCallbackParams) => {
    const fields = await getPromise(getFormFieldsAtom(key));
    const values = await Promise.all(
      Object.entries(fields)
        // @ts-ignore
        .map(([fieldKey, fieldName]) => getPromise(getFieldValueAtom(fieldKey)).then((fieldValue: any) => ({
          name: fieldName,
          value: fieldValue,
        })))
    );

    console.log(values);
  }, [key]);

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    console.log('submitted!');
    logFormValues();
  }, [logFormValues]);

  const onReset = React.useCallback((event) => {
    event.preventDefault();
    console.log('reset!');
    resetForm();
  }, [resetForm]);

  React.useEffect(() => {
    setInitialValues();
  }, []);

  return (
    <FormKey.Provider value={key}>
      <form {...props} onSubmit={onSubmit} onReset={onReset} />
    </FormKey.Provider>
  );
}

export default Form;
