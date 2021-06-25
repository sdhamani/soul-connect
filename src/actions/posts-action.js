import getPosts from "../api/post-api";
export const ADDPOST = "ADDPOST";
export const LIKEPOST = "LIKEPOST";
export const EDITPOST = "EDITPOST";
export const DELETEPOST = "DELETEPOST";
export const ADDCOMMENT = "ADDCOMMENT";

export function sortBy(sortByType) {
  console.log("inside sortBy action creator", sortByType);
  return {
    type: sortByType,
  };
}

export const updatePosts = () => async (dispatch) => {
  try {
    const res = await getPosts();

    dispatch({
      type: "UPDATEPOSTS",
      payload: res,
    });
    localStorage?.setItem(
      "allPosts",
      JSON.stringify({
        res,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

export function addPostFun(newPost) {
  console.log("inside ADDPOST");
  return {
    type: ADDPOST,
    payload: newPost,
  };
}

export function likePost(postId, userId) {
  console.log("inside likepost", postId, userId);
  return {
    type: LIKEPOST,
    payload: { id: postId, userId: userId },
  };
}

export function editPost(newPost) {
  console.log("inside update following");
  return {
    type: EDITPOST,
    payload: newPost,
  };
}

export function deletePost(postId) {
  console.log("inside delete following");
  return {
    type: DELETEPOST,
    payload: postId,
  };
}

export function addComment(commentText, id, userName, userImage) {
  console.log("inside ADDCOMMENT following");
  return {
    type: ADDCOMMENT,
    payload: {
      commentText: commentText,
      ideaId: id,
      userName: userName,
      userImage: userImage,
    },
  };
}
