import { useState, useEffect } from "react";
import { useGetFeedQuery } from "../api/posts";
import formatDate from "./Inputs/formatDate";
import { Link } from "react-router-dom";
import CreatePostForm from "./Posts/createpostForm";

const Feed = () => {
  const [token, setToken] = useState("");
  const [headers, setHeaders] = useState({
    Authorization: "",
    "Content-Type": "application/json",
  });
  const { data: feedData, refetch: refetchFeed } = useGetFeedQuery({ headers });

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

  useEffect(() => {
    if (token) {
      refetchFeed(); // Refetch feed whenever the token changes and becomes available
    }
  }, [token, refetchFeed]);

  return (
    <div>
      {/* Render the CreatePostForm component */}
      <CreatePostForm onPostCreated={refetchFeed} />{" "}
      {/* Pass refetchFeed as a prop */}
      {/* Render feed posts */}
      {feedData &&
        feedData.map((post) => (
          <div key={post.id}>
            <Link className="post-link" to={`/posts/${post.id}`}>
              <p>{post.author?.username}</p>
              <p>{post.content}</p>
              <p>{formatDate(post.createdAt)}</p>
              <hr />
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Feed;
