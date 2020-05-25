import { defineAtom, defineSelector } from './cache';

import { FIELD_INITIAL_VAlUE } from '../constants';

export const getFieldInitialValueAtom = defineAtom(
  <TValue>(key: string, value?: TValue) => {
    return {
      key: `${key}/$initialValue`,
      default: value,
    };
  }
);

export const getFieldCurrentValueAtom = defineAtom(<TValue>(key: string) => {
  return {
    key: `${key}/$currentValue`,
    default: FIELD_INITIAL_VAlUE as TValue | typeof FIELD_INITIAL_VAlUE,
  };
});

export const getFieldValueAtom = defineSelector(
  <TValue>(key: string, initialValue?: TValue) => {
    const initialValueAtom = getFieldInitialValueAtom(key, initialValue);
    const currentValueAtom = getFieldCurrentValueAtom<TValue>(key);

    return {
      key: `${key}/$value`,
      get({ get }) {
        const currentValue = get(currentValueAtom);
        return currentValue === FIELD_INITIAL_VAlUE
          ? get(initialValueAtom)
          : currentValue;
      },
      set({ get, set }, newValue) {
        const currentValue = get(currentValueAtom);
        if (currentValue !== newValue) {
          // only update when value is changed
          set(currentValueAtom, newValue);
        }
      },
    };
  }
);

export const getFieldRefCounterAtom = defineAtom((key: string) => {
  return {
    key: `${key}/$refCounter`,
    default: 0,
  };
});

export const getFieldTouchedAtom = defineAtom<boolean>((key: string) => {
  return {
    key: `${key}/$touched`,
    default: false,
  };
});

export const getFieldErrorInternalAtom = defineAtom(<TValue>(key: string) => {
  return {
    key: `${key}/$errorAtom`,
    default: null as TValue | null,
  };
});

export const getFieldErrorAtom = defineSelector(<TValue>(key: string) => {
  const atom = getFieldErrorInternalAtom<TValue>(key);

  return {
    key: `${key}/$errorSelector`,
    get({ get }) {
      return get(atom);
    },
    set({ get, set }, error) {
      const currentError = get(atom);
      if (currentError !== error) {
        // only update when value is changed
        set(atom, error);
      }
    },
  };
});
