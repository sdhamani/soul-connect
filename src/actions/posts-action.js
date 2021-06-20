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

export function addPost(newPost) {
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
