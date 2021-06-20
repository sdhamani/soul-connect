export const UPDATEUSER = "UPDATEUSER";
export const LOGOUTUSER = "LOGOUTUSER";

export function updateUser(userObj) {
  return {
    type: UPDATEUSER,
    payload: userObj,
  };
}

export function logoutUser() {
  return {
    type: LOGOUTUSER,
  };
}
