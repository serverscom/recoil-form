let id = Date.now();

export default function uniqueId() {
  return `__RECOIL_FORM_${id++}__`;
}
