import { defineAtom, defineSelector } from './cache';
import { getFieldValueAtom } from './field';

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
  };
});
