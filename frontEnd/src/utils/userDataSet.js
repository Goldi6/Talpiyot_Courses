export const returnUserDataSet = (user) => {
  return {
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    _id: user._id,
  };
};
