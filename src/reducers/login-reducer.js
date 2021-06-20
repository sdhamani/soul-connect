import firebase from "firebase";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "social-media-b028f.firebaseapp.com",
  projectId: "social-media-b028f",
  storageBucket: "social-media-b028f.appspot.com",
  messagingSenderId: "551745934551",
  appId: "1:551745934551:web:e603b9d485a94b5f000c92",
  measurementId: "G-SNMB1BE0P6",
};

const getUserDetails = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
  if (localStorage.getItem("user")) {
    const { isUserLoggedIn, localUserName, userImage, userId } = JSON.parse(
      localStorage?.getItem("user")
    );

    return {
      loggedIn: isUserLoggedIn,
      userName: localUserName,
      userImage: userImage,
      userId: userId,
    };
  } else {
    return [];
  }
};

const initialState = getUserDetails();

export default function loginReducer(state = initialState, value) {
  switch (value.type) {
    case "UPDATEUSER":
      return value.payload;
    case "LOGOUTUSER":
      return {
        loggedIn: false,
        userName: "",
        userImage: "",
        userId: "",
      };
    default:
      return state;
  }
}
