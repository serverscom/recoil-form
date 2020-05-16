// @ts-expect-error
import { atom } from 'recoil';
import memoize from 'lodash/memoize';

export const getFormFieldsAtom = memoize((key: string) => {
  return atom({
    key,
    default: {},
  });
});


