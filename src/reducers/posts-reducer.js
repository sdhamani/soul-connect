import ideas from "../data/ideas";
export default function postsReducer(state = ideas, value) {
  switch (value.type) {
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

    case "ADDPOST":
      console.log("ADDPOST", value.payload);
      return [...state, value.payload];
    case "LIKEPOST":
      const userId = value.payload.userId;
      const ideaId = value.payload.id;
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
    case "EDITPOST":
      const editedArray = state.map((idea) => {
        if (idea.id === value.payload.id) {
          return {
            ...idea,
            title: value.payload.title,
            description: value.payload.description,
            tags: value.payload.tags,
            creationDate: value.payload.editedDate,
          };
        }
        return idea;
      });

      return editedArray;
    case "DELETEPOST":
      return state.filter((idea) => idea.id !== value.payload);
    case "ADDCOMMENT":
      console.log("value", value);
      const newComment = {
        description: value.payload.commentText,
        userName: value.payload.userName,
        userImage: value.payload.userImage,
      };

      return state.map((idea) => {
        if (idea.id === value.payload.ideaId) {
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
