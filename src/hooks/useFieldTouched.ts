import { useRecoilValue } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldTouchedAtom } from '../atoms/field';

/**
 * Provides touched state for the specified field
 * @param name
 */
export default function useFieldTouched(name: string): boolean {
  const key = useFieldKey(name);
  const atom = getFieldTouchedAtom(key);
  return useRecoilValue(atom);
}
