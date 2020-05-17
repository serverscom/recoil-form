// @ts-expect-error
import { useRecoilValue } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldValueAtom } from '../atoms/field';

/**
 * Provides a value of the specified field
 * @param name
 */
export default function useFieldValue(name: string) {
  const key = useFieldKey(name);
  return useRecoilValue(getFieldValueAtom(key));
}
