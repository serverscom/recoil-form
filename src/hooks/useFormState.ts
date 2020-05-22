import { useRecoilValue } from 'recoil';

import useFormKey from './useFormKey';
import { getFormStateAtom } from '../atoms/form';

export default function useFormState() {
  const key = useFormKey();
  return useRecoilValue(getFormStateAtom(key));
}
