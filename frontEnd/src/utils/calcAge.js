import validator from "validator";

function CalculateAge(userDateInput) {
  // convert user input value into date object
  var birthDate = new Date(userDateInput);

  // get difference from current date;
  var difference = Date.now() - birthDate.getTime();

  var ageDate = new Date(difference);
  var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  return calculatedAge;
}

export function isAtLeastAge(inputDate, minAge) {
  if (!validator.isDate(inputDate)) return "input is not a date";

  const age = CalculateAge(inputDate);

  return age >= minAge;
}
