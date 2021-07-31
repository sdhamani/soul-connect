import getPosts, { deletePost, editPost } from "../api/post-api";
export const ADDPOST = "ADDPOST";
export const LIKEPOST = "LIKEPOST";

export const ADDCOMMENT = "ADDCOMMENT";
export const UPDATEPOSTS = "UPDATEPOSTS";

export function sortBy(sortByType) {
  return {
    type: sortByType,
  };
}

export const updatePosts = () => async (dispatch) => {
  try {
    const res = await getPosts();

    dispatch({
      type: UPDATEPOSTS,
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

export const editPosts = (token, newPost, postId) => async (dispatch) => {
  try {
    const res = await editPost(token, newPost, postId);

    dispatch({
      type: UPDATEPOSTS,
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

export const deletePosts = (token, postId) => async (dispatch) => {
  try {
    const res = await deletePost(token, postId);

    dispatch({
      type: UPDATEPOSTS,
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
  return {
    type: ADDPOST,
    payload: newPost,
  };
}

export function likePostFun(postId, userId) {
  return {
    type: LIKEPOST,
    payload: { id: postId, userId: userId },
  };
}

export function addComment(commentText, id, userName, userImage) {
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
