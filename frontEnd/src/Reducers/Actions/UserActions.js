export const userLogin_Action = ({ user, token }) => ({
  type: "USER_LOGIN",
  user,
  token,
});
export const userUpdateAccount_Action = ({ user, token }) => ({
  type: "USER_UPDATE",
  user,
  token,
});

export const userLogout_Action = () => ({
  type: "USER_LOGOUT",
});

export const createStudentAccount_Action = (user) => ({
  type: "USER_CREATE",
  user,
});
export const deleteStudentAccount_Action = (userId) => ({
  type: "USER_DELETE",
  userId,
});
