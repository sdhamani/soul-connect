import checkCredentails from "./components/login/checkCredentials";
import users from "./data/users";
import ideaDispatchFun from "./reducers/ideas-reducer";
import allIdeas from "./data/ideas";
import { v4 as uuidv4 } from "uuid";

describe("testing login funtionality", () => {
  test("testing incorrect user", () => {
    const [employeeId, password] = ["SD487928", "ISas@156"];

    const response = checkCredentails(employeeId, password);

    const expectedObj = { success: false, message: "Invalid User" };

    expect(response).toEqual(expectedObj);
  });

  test("testing incorrect passoword", () => {
    const [employeeId, password] = ["SB153560", "ISas@156"];

    const response = checkCredentails(employeeId, password);

    const expectedObj = { success: false, message: "Incorrect Password" };

    expect(response).toEqual(expectedObj);
  });

  test("testing correct credentials", () => {
    const [employeeId, password] = ["SB153560", "Sagar@123"];
    const user = users.find((user) => user.employeeId === employeeId);

    const response = checkCredentails(employeeId, password);

    const expectedObj = { success: true, user: user };

    expect(response).toEqual(expectedObj);
  });
});

describe("testing ideas reducer funtionality", () => {
  test("testing case LIKE in ideas-reducer", () => {
    let action = {
      TYPE: "LIKE",
      PAYLOAD: { id: "i001", userID: "u123" },
    };

    let reducedState = ideaDispatchFun(allIdeas, action);

    const finalState = allIdeas.map((idea) => {
      return idea.id === action.PAYLOAD.id
        ? { ...idea, votes: [...idea.votes, action.PAYLOADuserId] }
        : { ...idea };
    });
    expect(reducedState).toEqual(finalState);
  });
  test("testing case ADDIDEA in ideas-reducer", () => {
    let today = new Date();

    let date =
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    let newIdea = {
      id: uuidv4(),
      hackathon: "May21",
      userId: "u123",
      title: "Testing Title",
      description: "Testing Description",
      tags: ["feature", "tech"],
      creationDate: date,
      votes: [],
    };
    let action = {
      TYPE: "ADDIDEA",
      PAYLOAD: newIdea,
    };

    let reducedState = ideaDispatchFun(allIdeas, action);

    const finalState = [...allIdeas, newIdea];
    expect(reducedState).toEqual(finalState);
  });
  test("testing case EDITIDEA in ideas-reducer", () => {
    let today = new Date();

    let date =
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    let newIdea = {
      id: "i001",
      title: "Updated Title",
      description: "Updated Description",
      tags: ["feature", "tech"],
      editedDate: date,
    };
    let action = {
      TYPE: "EDITIDEA",
      PAYLOAD: newIdea,
    };

    let reducedState = ideaDispatchFun(allIdeas, action);

    const finalState = allIdeas.map((idea) => {
      if (idea.id === action.PAYLOAD.id) {
        return {
          ...idea,
          title: action.PAYLOAD.title,
          description: action.PAYLOAD.description,
          tags: action.PAYLOAD.tags,
          creationDate: action.PAYLOAD.editedDate,
        };
      }
      return idea;
    });
    expect(reducedState).toEqual(finalState);
  });
  test("testing case DELETEIDEA in ideas-reducer", () => {
    let action = {
      TYPE: "DELETEIDEA",
      PAYLOAD: "i001",
    };

    let reducedState = ideaDispatchFun(allIdeas, action);

    const finalState = allIdeas.filter((idea) => idea.id !== action.PAYLOAD);

    expect(reducedState).toEqual(finalState);
  });
});
