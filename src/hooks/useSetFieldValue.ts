import { useSetRecoilState } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldValueAtom } from '../atoms/field';

/**
 * Return a value setter for the specified field
 * @param name
 */
export default function useSetFieldValue<TValue = unknown>(name: string) {
  const key = useFieldKey(name);
  return useSetRecoilState(getFieldValueAtom<TValue>(key));
}
