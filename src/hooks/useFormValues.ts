import { useRecoilValue } from 'recoil';

import useFormKey from './useFormKey';
import { getFormValuesState } from '../atoms/form';

export default function useFormValues() {
  const key = useFormKey();
  const values = useRecoilValue(getFormValuesState(key));
  return values;
}
