import { updateFollowing } from "../api/login-api";

export const UPDATEFOLLOWING = "UPDATEFOLLOWING";

export const updateFollowingAction =
  (token, searchedUserId, LoggedInUserId) => async (dispatch) => {
    try {
      await updateFollowing(token, searchedUserId);

      dispatch({
        type: UPDATEFOLLOWING,
        payload: {
          searchedUserId: searchedUserId,
          LoggedInUserId: LoggedInUserId,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

export function updateUsers(users) {
  return {
    type: "UPDATEUSERS",
    payload: users,
  };
}
