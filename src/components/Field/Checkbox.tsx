import * as React from 'react';
import useField from '../../hooks/useField';

export interface IRecoilCheckboxProps extends JSX.IntrinsicAttributes {
  name: string;
  onChange: (event: React.ChangeEvent) => any;
  onBlur: (event: React.FocusEvent) => any;
}

// TODO: checkbox with value? <input type="checkbox" name="answer" value={42} />
const Checkbox: React.FC<IRecoilCheckboxProps> = ({
  name,
  onChange: originalOnChange,
  onBlur: originalOnBlur,
  ...props
}) => {
  const [{ onChange, onBlur, ...inputProps }] = useField<boolean>(name);

  const handleChange = React.useCallback(
    event => {
      if (originalOnChange) {
        originalOnChange(event);
      }
      onChange(event.target.checked);
    },
    [onChange, originalOnChange]
  );

  const handleBlur = React.useCallback(
    event => {
      if (originalOnBlur) {
        originalOnBlur(event);
      }
      onBlur();
    },
    [onBlur, originalOnBlur]
  );

  return (
    <input
      {...props}
      {...inputProps}
      type="checkbox"
      value={undefined}
      checked={!!inputProps.value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default Checkbox;
