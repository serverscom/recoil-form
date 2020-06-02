import { atomFamily, RecoilState, selectorFamily } from 'recoil';

import { FIELD_INITIAL_VAlUE } from '../constants';
type AtomFamily = <T>(key: string) => RecoilState<T>;

export const getFieldInitialValueAtom: AtomFamily = atomFamily<any, string>({
  key: '$recoil-form/$field/$value/$initial',
  default: undefined,
});

export const getFieldCurrentValueAtom: AtomFamily = atomFamily<any, string>({
  key: '$recoil-form/field/$value/$current',
  default: FIELD_INITIAL_VAlUE,
});

export const getFieldValueAtom: AtomFamily = selectorFamily<any, string>({
  key: '$recoil-form/$field/$value',
  get(param) {
    const initialValueAtom = getFieldInitialValueAtom(param);
    const currentValueAtom = getFieldCurrentValueAtom(param);

    return ({ get }) => {
      const currentValue = get(currentValueAtom);
      return currentValue === FIELD_INITIAL_VAlUE ? get(initialValueAtom) : currentValue;
    };
  },
  set(param) {
    const currentValueAtom = getFieldCurrentValueAtom(param);

    return ({ get, set }, newValue) => {
      const currentValue = get(currentValueAtom);
      if (currentValue !== newValue) {
        // only update when value is changed
        set(currentValueAtom, newValue);
      }
    };
  },
});

export const getFieldRefCounterAtom = atomFamily<number, string>({
  key: '$recoil-form/$field/$refCounter',
  default: 0,
});

export const getFieldTouchedAtom = atomFamily<boolean, string>({
  key: '$recoil-form/$field/$touched',
  default: false,
});

export const getFieldErrorInternalAtom: AtomFamily = atomFamily<any, string>({
  key: '$recoil-form/$field/$error/$internal',
  default: null,
});

export const getFieldErrorAtom: AtomFamily = selectorFamily<any, string>({
  key: '$recoil-form/$field/$error',
  get(param) {
    const atom = getFieldErrorInternalAtom(param);
    return ({ get }) => get(atom);
  },
  set(param) {
    const atom = getFieldErrorInternalAtom(param);
    return ({ get, set }, error) => {
      const currentError = get(atom);
      if (currentError !== error) {
        // only update when value is changed
        set(atom, error);
      }
    };
  },
});
