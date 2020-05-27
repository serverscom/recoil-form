import { useRecoilValue } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldValueAtom } from '../atoms/field';

/**
 * Provides a value of the specified field
 * @param name
 * @param initialValue
 */
function useFieldValue<TValue>(name: string): TValue | undefined;
function useFieldValue<TValue>(name: string, initialValue: TValue): TValue;
function useFieldValue<TValue>(name: string, initialValue?: TValue): TValue | undefined {
  const key = useFieldKey(name);
  const atom = getFieldValueAtom<TValue>(key, initialValue);
  return useRecoilValue(atom);
}

export default useFieldValue;
