const { users } = JSON.parse(localStorage?.getItem("allUsers"));
const intialState = users ? users : [];

export default function usersReducer(state = intialState, value) {
  switch (value.type) {
    case "UPDATEUSERS":
      return value.payload ? value.payload : [];
    case "UPDATEFOLLOWING":
      const searchedUserId = value.payload.searchedUserId;
      const loggedInUserId = value.payload.LoggedInUserId;
      return state.map((user) => {
        if (user.id === searchedUserId) {
          const isInFollowers = user.followers.includes(loggedInUserId);
          if (isInFollowers) {
            return {
              ...user,
              followers: user.followers.filter(
                (userId) => userId !== loggedInUserId
              ),
            };
          } else {
            return {
              ...user,
              followers: [...user.followers, loggedInUserId],
            };
          }
        } else if (user.id === loggedInUserId) {
          const isInFollowing = user.following.includes(searchedUserId);
          if (isInFollowing) {
            return {
              ...user,
              following: user.following.filter(
                (userId) => userId !== searchedUserId
              ),
            };
          } else {
            return {
              ...user,
              following: [...user.following, searchedUserId],
            };
          }
        } else {
          return user;
        }
      });

    default:
      return state;
  }
}
