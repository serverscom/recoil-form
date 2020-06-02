import { atomFamily, selectorFamily } from 'recoil';
import { getFieldErrorAtom, getFieldValueAtom } from './field';
import getFieldKey from '../utils/getFieldKey';

type FormState = 'ready' | 'submitting';
type FormFields = {
  [key: string]: string;
};
type FormValues = {
  [key: string]: any;
};
type FormErrors = {
  [key: string]: any;
};

export const getFormStateAtom = atomFamily<FormState, string>({
  key: '$recoil-form/$form/$state',
  default: 'ready',
});

export const getFormFieldsAtom = atomFamily<FormFields, string>({
  key: '$recoil-form/$form/$fields',
  default: {},
});

export const getFormValuesAtom = selectorFamily<FormValues, string>({
  key: '$recoil-form/$form/$values',
  get(key: string) {
    return ({ get }) => {
      // TODO: DRY (see getFormErrorsAtom.get)
      const fields = get(getFormFieldsAtom(key));
      return Object.fromEntries(
        Object.entries(fields).map(([fieldKey, fieldName]) => [fieldName, get(getFieldValueAtom(fieldKey))])
      );
    };
  },
  set(key: string) {
    return ({ get, set }, values: FormValues) => {
      // TODO: DRY (see getFormErrorsAtom.set)
      Object.entries(values).forEach(([fieldName, fieldValue]) => {
        const fieldKey = getFieldKey(key, fieldName);
        const atom = getFieldValueAtom(fieldKey);
        const currentValue = get(atom);
        if (currentValue !== fieldValue) {
          // only update when value is changed
          set(atom, fieldValue);
        }
      });
    };
  },
});

export const getFormErrorsAtom = selectorFamily<FormErrors, string>({
  key: '$recoil-form/$form/$errors',
  get(key: string) {
    return ({ get }) => {
      const fields = get(getFormFieldsAtom(key));
      return Object.fromEntries(
        Object.entries(fields).map(([fieldKey, fieldName]) => [fieldName, get(getFieldErrorAtom(fieldKey))])
      );
    };
  },
  set(key: string) {
    return ({ get, set }, values: FormErrors) => {
      Object.entries(values).forEach(([fieldName, fieldError]) => {
        const fieldKey = getFieldKey(key, fieldName);
        const atom = getFieldErrorAtom(fieldKey);
        const currentError = get(atom);
        if (currentError !== fieldError) {
          // only update when value is changed
          set(atom, fieldError);
        }
      });
    };
  },
});
