// @ts-expect-error
import { useRecoilValue } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldValueAtom } from '../atoms/field';

/**
 * Provides a value of the specified field
 * @param name
 * @param initialValue
 */
export default function useFieldValue<TValue>(
  name: string,
  initialValue?: TValue
): TValue {
  const key = useFieldKey(name);
  return useRecoilValue(getFieldValueAtom(key, initialValue));
}
