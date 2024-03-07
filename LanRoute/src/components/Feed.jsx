import { useState, useEffect } from "react";
import { useGetFeedQuery } from "../api/posts";
import formatDate from "./Inputs/formatDate";
import { Link } from "react-router-dom";
import CreatePostForm from "./Posts/createpostForm";
import { useAddPostMutation } from "../api/posts";
import LikePost from "./Likes/likes";

const Feed = () => {
  const [token, setToken] = useState("");
  const [headers, setHeaders] = useState({
    Authorization: "",
    "Content-Type": "application/json",
  });
  const { data: feedData, refetch: refetchFeed } = useGetFeedQuery({ headers });
  const [createPost] = useAddPostMutation();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setHeaders({
        ...headers,
        Authorization: `Bearer ${storedToken}`,
      });
    }
  }, []);


  const handlePostSubmit = async (postData) => {
    try {
      await createPost(postData).unwrap();;
      // Refetch the feed data after successful post creation
      refetchFeed();
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error
    }
  };

  return (
    <div>
      {/* Render the CreatePostForm component with handlePostSubmit passed as prop */}
      <CreatePostForm onSubmit={handlePostSubmit} />

      {/* Render feed posts */}
      {feedData &&
        feedData.map((post) => (
          <div key={post.id}>
            <Link
              className="post-link"
              to={{
                pathname: `/posts/${post.id}`,
                state: { userId: post.userId },
              }}
            >
              <p>{post.username}</p>
              <p>{post.content}</p>
              <p>{formatDate(post.createdAt)}</p>
              <LikePost
                postId={post.id}
                initialLikes={post.likes.length}
                userId={post.userId}
              />
              <hr />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Feed;
