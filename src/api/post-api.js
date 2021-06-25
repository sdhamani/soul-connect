import axios from "axios";

export default async function getPosts() {
  const url = process.env.REACT_APP_BACKEND_API + "/posts";
  try {
    const postObj = await axios.get(url);

    if (postObj.data.success) {
      return postObj.data.posts;
    } else {
      return postObj.data.message;
    }
  } catch (error) {
    console.log("error while getting all posts", error);
  }
}

export async function addPost(token, newPostObj) {
  const url = process.env.REACT_APP_BACKEND_API + "/posts";
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const postObj = await axios.post(url, newPostObj, config);

    if (postObj.data.success) {
      return postObj.data.updatedPosts;
    } else {
      return postObj.data.message;
    }
  } catch (error) {
    console.log("error while adding post", error);
  }
}

export async function editPost(token, newPostObj, postId) {
  const url = process.env.REACT_APP_BACKEND_API + `/posts/${postId}`;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const postObj = await axios.post(url, newPostObj, config);

    if (postObj.data.success) {
      return postObj.data.posts;
    } else {
      return postObj.data.message;
    }
  } catch (error) {
    console.log("error while adding post", error);
  }
}

export async function deletePost(token, postId) {
  const url = process.env.REACT_APP_BACKEND_API + `/posts/${postId}`;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const postObj = await axios.delete(url, null, config);

    if (postObj.data.success) {
      return postObj.data.posts;
    } else {
      return postObj.data.message;
    }
  } catch (error) {
    console.log("error while deleting post", error);
  }
}

export async function likePost(token, postId) {
  const url = process.env.REACT_APP_BACKEND_API + `/posts/${postId}/like`;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };
    const postObj = await axios.post(url, null, config);

    if (postObj.data.success) {
      return postObj.data.posts;
    } else {
      return postObj.data.message;
    }
  } catch (error) {
    console.log("error while trying to like post", error);
  }
}

export async function commentPost(token, postId, description) {
  const url = process.env.REACT_APP_BACKEND_API + `/posts/${postId}/comment`;
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    const body = {
      description,
    };
    const postObj = await axios.post(url, body, config);

    if (postObj.data.success) {
      return postObj.data.posts;
    } else {
      return postObj.data.message;
    }
  } catch (error) {
    console.log("error while trying to like post", error);
  }
}
