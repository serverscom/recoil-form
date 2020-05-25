import { useRecoilValue } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldErrorAtom } from '../atoms/field';

/**
 * Provides an error for the specified field
 * @param name
 */
function useFieldError<TValue = unknown>(name: string): TValue | null {
  const key = useFieldKey(name);
  const atom = getFieldErrorAtom<TValue>(key);
  return useRecoilValue(atom);
}

export default useFieldError;
