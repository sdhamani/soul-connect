export const UPDATEFOLLOWING = "UPDATEFOLLOWING";
export const DECREMENT = "DECREMENT";

export function updateFollowing(searchedUserId, LoggedInUserId) {
  console.log("inside update following");
  return {
    type: UPDATEFOLLOWING,
    payload: {
      searchedUserId: searchedUserId,
      LoggedInUserId: LoggedInUserId,
    },
  };
}

export function updateUsers(users) {
  console.log("inside update following");
  return {
    type: "UPDATEUSERS",
    payload: users,
  };
}
