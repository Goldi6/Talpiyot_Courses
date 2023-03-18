import { isAtLeastAge } from "utils/calcAge";

export const ageValidation = {
  func: (val) => {
    return isAtLeastAge(val, 18);
  },
  message: "You must be at least 18 years old to update your profile.",
};
export const nameValidation = {
  func: (value) => !value.includes("admin"),
  message: "came cannot include admin",
};
