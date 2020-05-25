import { useSetRecoilState } from 'recoil';

import useFieldKey from './useFieldKey';
import { getFieldErrorAtom } from '../atoms/field';

/**
 * Return a error setter for the specified field
 * @param name
 */
export default function useSetFieldError<TValue = unknown>(name: string) {
  const key = useFieldKey(name);
  const atom = getFieldErrorAtom<TValue>(key);
  return useSetRecoilState(atom);
}
