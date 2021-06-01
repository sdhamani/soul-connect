import users from "../../data/users";

export default function checkCredentails(employeeId, password) {
  let user = users.find((user) => user.employeeId === employeeId);

  if (!user) {
    return { success: false, message: "Invalid User" };
  } else if (user.password === password) {
    return { success: true, user: user };
  } else {
    return { success: false, message: "Incorrect Password" };
  }
}
