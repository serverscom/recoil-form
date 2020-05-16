import * as React from 'react';
// @ts-expect-error
import { useRecoilState, useSetRecoilState } from 'recoil';
import useFormKey from '../hooks/useFormKey';
import useFieldKey from '../hooks/useFieldKey';
import { getFormFieldsAtom } from '../atoms/form';
import { getFieldValueAtom, getFieldMountedAtom, getFieldTouchedAtom } from '../atoms/field';

interface IRecoilFieldProps extends JSX.IntrinsicAttributes {
  name: string;
  type: string;
  as?: React.ElementType;
}

const Field: React.FC<IRecoilFieldProps> = ({ name, type, as: Component = 'input', ...props }) => {
  const formKey = useFormKey();
  const key = useFieldKey(name);

  console.log('render field', key);

  const [value, setValue] = useRecoilState(getFieldValueAtom(key));
  const setFormFields = useSetRecoilState(getFormFieldsAtom(formKey));

  const setMounted = useSetRecoilState(getFieldMountedAtom(key));
  const setTouched = useSetRecoilState(getFieldTouchedAtom(key));

  // TODO: onBlur
  const onBlur = React.useCallback(() => {
    setTouched(true);
  }, [setTouched]);

  const onChange = React.useCallback((event) => {
    setValue(event.target.value);
  }, [setValue]);

  React.useEffect(() => {
    // register field
    setFormFields((fields: {}) => ({
      ...fields,
      [key]: name,
    }));
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [key, setFormFields, setMounted]);

  return (
    <Component
      {...props}
      value={value === undefined ? '' : value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default Field;
