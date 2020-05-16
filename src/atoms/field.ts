// @ts-expect-error
import { atom, selector } from 'recoil';
import memoize from 'lodash/memoize';

import { FIELD_INITIAL_VAlUE } from '../constants';

export const getFieldInitialValueAtom = memoize((key: string) => {
  return atom({
    key: `${key}/initialValue`,
    default: undefined,
  });
});

export const getFieldCurrentValueAtom = memoize((key: string) => {
  return atom({
    key: `${key}/currentValue`,
    default: FIELD_INITIAL_VAlUE,
  });
});

export const getFieldValueAtom = memoize((key: string) => {
  const initialValueAtom = getFieldInitialValueAtom(key);
  const currentValueAtom = getFieldCurrentValueAtom(key);

  return selector({
    key: `${key}/value`,
    // @ts-expect-error
    get: ({ get }) => {
      const currentValue = get(currentValueAtom);
      return currentValue === FIELD_INITIAL_VAlUE ? get(initialValueAtom) : currentValue;
    },
    // @ts-expect-error
    set: ({ set }, newValue) => set(currentValueAtom, newValue),
  });
});

export const getFieldMountedAtom = memoize((key: string) => {
  return atom({
    key: `${key}/mounted`,
    default: true,
  });
});

export const getFieldTouchedAtom = memoize((key: string) => {
  return atom({
    key: `${key}/touched`,
    default: false,
  });
});

