import { defineAtom } from './cache';

export const getFormFieldsAtom = defineAtom((key: string) => {
  return {
    key,
    default: {},
  };
});
