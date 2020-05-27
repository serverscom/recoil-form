import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldInitialValueAtom, getFieldValueAtom } from '../atoms/field';

/**
 * Provides a value of the specified field
 * @param name
 * @param initialValue
 */
function useFieldValue<TValue>(name: string): TValue | undefined;
function useFieldValue<TValue>(name: string, initialValue: TValue, overrideInitialValue?: boolean): TValue;
function useFieldValue<TValue>(
  name: string,
  initialValue?: TValue,
  overrideInitialValue?: boolean
): TValue | undefined {
  const key = useFieldKey(name);
  // atom is memoized, so only first passed initial value will be saved
  const atom = getFieldValueAtom<TValue>(key, initialValue);

  const value = useRecoilValue(atom);
  const setInitialValue = useSetRecoilState(getFieldInitialValueAtom(key));
  useEffect(() => {
    // for the cases when we have N components for the same field (e.g. radio buttons)
    // we need to have ability to set initial value not by first rendered component
    // but by last which has defined initial value
    if (overrideInitialValue && initialValue !== undefined && initialValue !== value) {
      setInitialValue(initialValue);
    }
    // hook it triggered only once, so updates to initial value on mounted component do nothing
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return value;
}

export default useFieldValue;
