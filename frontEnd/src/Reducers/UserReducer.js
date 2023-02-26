export const initialUserData = { user: null, token: "" };

export default function userReducer(userData, action) {
  switch (action.type) {
    case "USER_LOGIN":
    case "USER_UPDATE":
      return { user: { ...action.user }, token: action.token };
    case "USER_LOGOUT":
      return { user: null, token: "" };
    default:
      return { ...userData };
  }
}
