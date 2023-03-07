export const returnUserDataSet = (user) => {
  return {
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    birthday: user.birthday,
    _id: user._id,
  };
};
