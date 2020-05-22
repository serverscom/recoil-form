import { defineAtom, defineSelector } from './cache';
import { getFieldErrorState, getFieldValueAtom } from './field';
import getFieldKey from "../utils/getFieldKey";

export const getFormFieldsAtom = defineAtom((key: string) => {
  return {
    key: `${key}/$fields`,
    default: {},
  };
});

export const getFormValuesState = defineSelector((key: string) => {
  return {
    key: `${key}/$values`,
    get({ get }) {
      const fields = get(getFormFieldsAtom(key));
      return Object.fromEntries(
        Object.entries(fields).map(([fKey, fName]) => [
          fName,
          get(getFieldValueAtom(fKey)),
        ])
      );
    },
    set({ set }, value: any) {
      for (const [fName, fValue] of Object.entries(value)) {
        const fieldKey = getFieldKey(key, fName);
        set(getFieldValueAtom(fieldKey), fValue);
      }
    },
  };
});

export const getFormErrorsState = defineSelector((key: string) => {
  return {
    key: `${key}/$errors`,
    get({ get }) {
      const fields = get(getFormFieldsAtom(key));
      return Object.fromEntries(
        Object.entries(fields).map(([fKey, fName]) => [
          fName,
          get(getFieldErrorState(fKey)),
        ])
      );
    },
    set({ set }, value: any) {
      for (const [fName, fError] of Object.entries(value)) {
        const fieldKey = getFieldKey(key, fName);
        set(getFieldErrorState(fieldKey), fError);
      }
    },
  };
});
