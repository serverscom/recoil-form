import { useRecoilValue } from 'recoil';

import useFormKey from './useFormKey';
import { getFormValuesState } from '../atoms/form';

export default function useFormValues() {
  const key = useFormKey();
  return useRecoilValue(getFormValuesState(key));
}
