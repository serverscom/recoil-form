import { defineAtom, defineSelector } from './cache';

import { FIELD_INITIAL_VAlUE } from '../constants';

export const getFieldInitialValueAtom = defineAtom(
  <TValue>(key: string, value?: TValue) => {
    return {
      key: `${key}/initialValue`,
      default: value,
    };
  }
);

export const getFieldCurrentValueAtom = defineAtom((key: string) => {
  return {
    key: `${key}/currentValue`,
    default: FIELD_INITIAL_VAlUE,
  };
});

export const getFieldValueAtom = defineSelector(
  <TValue>(key: string, initialValue?: TValue) => {
    const initialValueAtom = getFieldInitialValueAtom(key, initialValue);
    const currentValueAtom = getFieldCurrentValueAtom(key);

    return {
      key: `${key}/value`,
      get: ({ get }) => {
        const currentValue = get(currentValueAtom);
        return currentValue === FIELD_INITIAL_VAlUE
          ? get(initialValueAtom)
          : currentValue;
      },
      set: ({ set }, newValue) => set(currentValueAtom, newValue),
    };
  }
);

export const getFieldMountedAtom = defineAtom((key: string) => {
  return {
    key: `${key}/mounted`,
    default: true,
  };
});

export const getFieldTouchedAtom = defineAtom((key: string) => {
  return {
    key: `${key}/touched`,
    default: false,
  };
});
