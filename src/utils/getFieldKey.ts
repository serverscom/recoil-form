export default function getFieldKey(formKey: string, fieldName: string) {
  return `${formKey}/${fieldName}`;
}
