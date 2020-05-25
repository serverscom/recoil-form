import { defineAtom, defineSelector } from './cache';
import { getFieldErrorAtom, getFieldValueAtom } from './field';
import getFieldKey from '../utils/getFieldKey';

export const getFormStateAtom = defineAtom<'ready' | 'submitting'>(
  (key: string) => {
    return {
      key: `${key}/$state`,
      default: 'ready',
    };
  }
);

export const getFormFieldsAtom = defineAtom((key: string) => {
  return {
    key: `${key}/$fields`,
    default: {},
  };
});

export const getFormValuesAtom = defineSelector((key: string) => {
  return {
    key: `${key}/$values`,
    get({ get }) {
      // TODO: DRY (see getFormErrorsAtom.get)
      const fields = get(getFormFieldsAtom(key));
      return Object.fromEntries(
        Object.entries(fields).map(([fieldKey, fieldName]) => [
          fieldName,
          get(getFieldValueAtom(fieldKey)),
        ])
      );
    },
    set({ get, set }, values: any) {
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
    },
  };
});

export const getFormErrorsAtom = defineSelector((key: string) => {
  return {
    key: `${key}/$errors`,
    get({ get }) {
      const fields = get(getFormFieldsAtom(key));
      return Object.fromEntries(
        Object.entries(fields).map(([fieldKey, fieldName]) => [
          fieldName,
          get(getFieldErrorAtom(fieldKey)),
        ])
      );
    },
    set({ get, set }, values: any) {
      Object.entries(values).forEach(([fieldName, fieldError]) => {
        const fieldKey = getFieldKey(key, fieldName);
        const atom = getFieldErrorAtom(fieldKey);
        const currentError = get(atom);
        if (currentError !== fieldError) {
          // only update when value is changed
          set(atom, fieldError);
        }
      });
    },
  };
});
