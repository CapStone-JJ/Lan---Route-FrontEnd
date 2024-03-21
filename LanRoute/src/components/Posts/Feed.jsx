import { useState, useEffect } from "react";
import { useGetFeedQuery } from "../../api/posts";
import { useUserProfileQuery } from "../../api/auth";
import formatDate from "../Inputs/formatDate";
import { Link } from "react-router-dom";
import CreatePostForm from "./createpostForm";
import { useAddPostMutation } from "../../api/posts";
import LikePost from "../Likes/likes";
import "../Styles/feed.css";
import Avatar from "../Inputs/avatar";
import { useSelector } from "react-redux";

const Feed = () => {
    const [token, setToken] = useState('');
    const username = useSelector((state) => state.user.credentials.user.username);
    const { data } = useUserProfileQuery(username);
    const [headers, setHeaders] = useState({
        Authorization: '',
        'Content-Type': 'application/json',
    });
    const { data: feedData } = useGetFeedQuery({ headers });
    const [addPost, { isLoading: isAddingPost }] = useAddPostMutation();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
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
          await addPost(postData).unwrap();
          console.log("Post added successfully");
        } catch (error) {
          console.error("Error creating post:", error);
          // Handle error
        }
      };
      

      return (
        <div className="feed">
          {/* Render the CreatePostForm component with handlePostSubmit passed as prop */}
          <CreatePostForm onSubmit={handlePostSubmit} />
      
          {/* Render feed posts */}
          {feedData &&
            feedData.map(post => {
              const userData = post.author;
              const avatarSrc = post.author?.image;
      
              return (
                <div key={post.id} className="post">
                  {/* Render the username link outside of the post-link */}
                  <div className="author">
                    <Link to={{ pathname: `/profile/${post.author?.username}` }}>
                    <Avatar
                      alt={`${post.author?.username} Avatar`}
                      src={avatarSrc}
                      userData={userData} // Pass userData to Avatar component
                    />
                      {post.author?.username}
                    </Link>
                  </div>
                  <Link
                    className="post-link"
                    to={{ pathname: `/posts/${post.id}`, state: { userId: post.userId } }}
                  >
                    {/* Render the post content */}
                    <p>{post.image}</p>
                    <p className="content">{post.content}</p>
                    <p className="tags">{post.tags?.map(tag => tag.name).join(", ")}</p>
                    <p className="date">{formatDate(post.createdAt)}</p>
                    <LikePost postId={post.id} initialLikes={post.likes.length} userId={post.userId} />
  
  const [token, setToken] = useState("");
  const username = useSelector((state) => state.user.credentials.user.username);
  const { data } = useUserProfileQuery(username);
  const [headers, setHeaders] = useState({
    Authorization: "",
    "Content-Type": "application/json",
  });
  const { data: feedData } = useGetFeedQuery({ headers });
  const [addPost, { isLoading: isAddingPost }] = useAddPostMutation();

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
      await addPost(postData).unwrap();
      console.log("Post added successfully");
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error
    }
  };

  return (
    <div className="feed">
      {/* Render the CreatePostForm component with handlePostSubmit passed as prop */}
      <CreatePostForm onSubmit={handlePostSubmit} />

      {/* Render feed posts */}
      {feedData &&
        feedData.map((post) => {
          // Log the post author's username
          console.log("Post author username:", post.author?.username);

          return (
            <div key={post.id} className="post">
              <Link
                className="post-link"
                to={{
                  pathname: `/posts/${post.id}`,
                  state: { userId: post.userId },
                }}
              >
                {/* Link the username to the user's profile page */}
                <p className="author">
                  <Avatar
                    alt={`${post.author?.username} Avatar`}
                    src={post.author?.image}
                  />
                  <Link to={{ pathname: `/profile/${post.author?.username}` }}>
                    {post.author?.username}
                  </Link>
                </p>
                {post.fileType === "image" && (
                  <div className="post-image-container">
                    <img
                      src={`http://localhost:3333${post.filePath}`}
                      alt="Post"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
                {post.fileType === "video" && (
                  <div className="post-video-container">
                    <video
                      controls
                      style={{ maxWidth: "100%", height: "auto" }}
                    >
                      <source
                        src={`http://localhost:3333${post.filePath}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                <p className="content">{post.content}</p>
                <p className="tags">
                  {post.tags?.map((tag) => tag.name).join(", ")}
                </p>
                <p className="date">{formatDate(post.createdAt)}</p>
                <LikePost
                  postId={post.id}
                  initialLikes={post.likes.length}
                  userId={post.userId}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Feed;
