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

export const getFieldCurrentValueAtom = defineAtom(<TValue>(key: string) => {
  return {
    key: `${key}/currentValue`,
    default: FIELD_INITIAL_VAlUE as TValue | typeof FIELD_INITIAL_VAlUE,
  };
});

export const getFieldValueAtom = defineSelector(
  <TValue>(key: string, initialValue?: TValue) => {
    const initialValueAtom = getFieldInitialValueAtom(key, initialValue);
    const currentValueAtom = getFieldCurrentValueAtom<TValue>(key);

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

export const getFieldRefCounterAtom = defineAtom((key: string) => {
  return {
    key: `${key}/ref_counter`,
    default: 0,
  };
});

export const getFieldTouchedAtom = defineAtom((key: string) => {
  return {
    key: `${key}/touched`,
    default: false,
  };
});
