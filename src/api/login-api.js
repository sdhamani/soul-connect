import axios from "axios";

export default async function LoginUser(userObj) {
  const url = process.env.REACT_APP_BACKEND_API + "/login";
  try {
    const loginObj = await axios.post(url, userObj);

    if (loginObj.data.success) {
      return loginObj.data;
    } else {
      return loginObj.data.message;
    }
  } catch (error) {
    console.log("error while signing user", error);
  }
}

export async function GetUsers() {
  const url = process.env.REACT_APP_BACKEND_API + "/user";
  try {
    const allUsers = await axios.get(url);

    if (allUsers.data.success) {
      return allUsers.data.users;
    } else {
      return allUsers.data.message;
    }
  } catch (error) {
    console.log("error while getting all users", error);
  }
}

export async function updateFollowing(token, searchedUserId) {
  const url = process.env.REACT_APP_BACKEND_API + "/user/follow";
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    const body = {
      searchedUserId: searchedUserId,
    };

    const allUsers = await axios.post(url, body, config);

    if (allUsers.data.success) {
      return allUsers.data.users;
    } else {
      return allUsers.data.message;
    }
  } catch (error) {
    console.log("error while getting all users", error);
  }
}
