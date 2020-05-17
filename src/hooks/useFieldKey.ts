import useFormKey from './useFormKey';
import getFieldKey from '../utils/getFieldKey';

const useFieldKey = (fieldName: string) => {
  const formKey = useFormKey();
  return getFieldKey(formKey, fieldName)
};

export default useFieldKey;
