import { useRecoilValue } from 'recoil';

import useFormKey from './useFormKey';
import { getFormValuesAtom } from '../atoms/form';

export default function useFormValues() {
  const key = useFormKey();
  return useRecoilValue(getFormValuesAtom(key));
}
