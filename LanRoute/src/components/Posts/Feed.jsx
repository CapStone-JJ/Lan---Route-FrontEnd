import { useState, useEffect } from "react";
import { useGetFeedQuery } from "../../api/posts";
import { useUserProfileQuery } from "../../api/auth";
import formatDate from "../Inputs/formatDate";
import { Link } from "react-router-dom";
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
        <div className="feed-container">
          {/* Render feed posts */}
          {feedData &&
            feedData.map(post => {
              const userData = post.author;
              const avatarSrc = post.author?.image;
              
              return (
                <div key={post.id} className="feed-post">
                  {/* Render the username link outside of the post-link */}
                  <div className="feed-author">
                    <Link to={{ pathname: `/profile/${post.author?.username}` }} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {/* Avatar component without the visible hyperlink */}
                      <Avatar
                        alt={`${post.author?.username} Avatar`}
                        src={avatarSrc}
                        userData={userData} // Pass userData to Avatar component
                      />
                      {/* Username */}
                      {post.author?.username}
                    </Link>
                  </div>
                  <Link
                    className="feed-post-link"
                    to={{ pathname: `/posts/${post.id}`, state: { userId: post.userId } }}
                  >
                    {/* Render the post content */}
                    <p>{post.image}</p>
                    <p className="feed-content">{post.content}</p>
                    <p className="feed-tags">{post.tags?.map(tag => tag.name).join(", ")}</p>
                    <p className="feed-date">{formatDate(post.createdAt)}</p>
                  </Link>
                  <div className="like-post-container">
                    <LikePost postId={post.id} initialLikes={post.likes.length} userId={post.userId} />
                  </div>
                </div>
              );
            })}
        </div>
      );
    };
    
    export default Feed;