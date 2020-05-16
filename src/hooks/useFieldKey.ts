import useFormKey from './useFormKey';
import getFieldKey from '../utils/getFieldKey';

const useFieldKey = (fieldName: string) => getFieldKey(useFormKey(), fieldName);

export default useFieldKey;
