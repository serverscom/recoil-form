// @ts-expect-error
import { useSetRecoilState } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldValueAtom } from '../atoms/field';

/**
 * Return a value setter for the specified field
 * @param name
 */
export default function useSetFieldValue(name: string) {
  const key = useFieldKey(name);
  return useSetRecoilState(getFieldValueAtom(key));
}
