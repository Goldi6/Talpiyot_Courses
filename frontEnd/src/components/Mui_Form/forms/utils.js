export function formReset(form, valueSettersArray, isReadySettersArray) {
  valueSettersArray.forEach((valueSetter) => valueSetter(""));
  isReadySettersArray.forEach((isReadySetter) => isReadySetter(false));
  form.reset();
}

//?: remove the isReady in input constructors?
export function requiredFieldsReady(values) {
  return values.every((value) => value.trim() !== "");
}
