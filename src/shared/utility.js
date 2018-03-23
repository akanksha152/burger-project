export const updatedObject = (oldObject, updatedObject) => {
  return {
    ...oldObject,
    ...updatedObject
  }
}

export const checkValidity = (value, rules) => {
  let isValid = false;
  if (!rules) {
    return true;
  }
  if (rules.minlength) {
    isValid = value.length >= rules.minlength;
  } else if (rules.maxlength) {
    isValid = value.length <= rules.maxlength;
  } else if (rules.required) {
    isValid = value.trim() !== ''
  }
  return isValid;
}
