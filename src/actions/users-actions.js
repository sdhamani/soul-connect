export const UPDATEFOLLOWING = "UPDATEFOLLOWING";
export const DECREMENT = "DECREMENT";

export function updateFollowing(searchedUserId, LoggedInUserId) {
  return {
    type: UPDATEFOLLOWING,
    payload: {
      searchedUserId: searchedUserId,
      LoggedInUserId: LoggedInUserId,
    },
  };
}

export function updateUsers(users) {
  return {
    type: "UPDATEUSERS",
    payload: users,
  };
}
