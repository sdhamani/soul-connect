const intialState = [];

export default function postsReducer(state = intialState, value) {
  switch (value.type) {
    case "UPDATEPOSTS":
      return value.payload;
    case "VOTES":
      let sortedState = state.slice().sort(function (a, b) {
        let aVotesLength = a.votes.length;
        let bVotesLength = b.votes.length;
        return bVotesLength - aVotesLength;
      });
      return sortedState;
    case "EARLIEST_DATE":
      state.sort(function (a, b) {
        a = new Date(a.creationDate);
        b = new Date(b.creationDate);
        console.log(a, b, b - a);
        return b - a;
      });

      return [...state];
    case "OLDEST_DATE":
      state.sort(function (a, b) {
        a = new Date(a.creationDate);
        b = new Date(b.creationDate);
        return a - b;
      });

      return [...state];

    case "ADDPOST":
      return [...state, value.payload];
    case "LIKEPOST":
      const userId = value.payload.userId;
      const ideaId = value.payload.id;

      return state.map((idea) => {
        if (idea._id === ideaId) {
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

    case "ADDCOMMENT":
      const newComment = {
        description: value.payload.commentText,
        userName: value.payload.userName,
        userImage: value.payload.userImage,
      };

      return state.map((idea) => {
        if (idea._id === value.payload.ideaId) {
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
