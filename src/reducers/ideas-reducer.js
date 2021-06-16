import useLogin from "../context/login-context";

export default function ideaDispatchFun(state, value) {
  switch (value.TYPE) {
    case "VOTES":
      return state.slice().sort(function (a, b) {
        let aVotesLength = a.votes.length;
        let bVotesLength = b.votes.length;
        return bVotesLength - aVotesLength;
      });

    case "EARLIEST_DATE":
      return state.slice().sort(function (a, b) {
        a = a.creationDate.split("/");
        b = b.creationDate.split("/");
        return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
      });
    case "OLDEST_DATE":
      return state.slice().sort(function (a, b) {
        a = a.creationDate.split("/");
        b = b.creationDate.split("/");
        return b[2] - a[2] || b[1] - a[1] || b[0] - a[0];
      });

    case "ADDIDEA":
      return [...state, value.PAYLOAD];
    case "LIKE":
      const userId = value.PAYLOAD.userId;
      const ideaId = value.PAYLOAD.id;
      const currentState = state;
      return currentState.map((idea) => {
        if (idea.id === ideaId) {
          return idea.votes.includes(userId)
            ? {
                ...idea,
                votes: idea.votes.filter((vote) => vote !== userId),
              }
            : {
                ...idea,
                votes: [...idea.votes, userId],
              };
        }
        return idea;
      });
    case "EDITIDEA":
      const editedArray = state.map((idea) => {
        if (idea.id === value.PAYLOAD.id) {
          return {
            ...idea,
            title: value.PAYLOAD.title,
            description: value.PAYLOAD.description,
            tags: value.PAYLOAD.tags,
            creationDate: value.PAYLOAD.editedDate,
          };
        }
        return idea;
      });

      return editedArray;
    case "DELETEIDEA":
      return state.filter((idea) => idea.id !== value.PAYLOAD);
    case "ADDCOMMENT":
      console.log("value", value);
      const newComment = {
        description: value.PAYLOAD.commentText,
        userName: value.PAYLOAD.userName,
        userImage: value.PAYLOAD.userImage,
      };

      return state.map((idea) => {
        if (idea.id === value.PAYLOAD.ideaId) {
          const newIdea = {
            ...idea,
            comments: [...idea.comments, newComment],
          };

          return newIdea;
        } else {
          return idea;
        }
      });

    default:
      return state;
  }
}
