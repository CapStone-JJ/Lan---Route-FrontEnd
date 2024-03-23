import { useState, useEffect } from "react";
import {
  useUserProfileQuery,
} from "../../api/auth";
import { useUserPostQuery } from "../../api/posts";
import LikePost from "../Likes/likes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../Inputs/formatDate";
import "../Styles/playlistOnProfile.css";
import "../Styles/profilePage.css"

const UserProfile = () => {
  const { username } = useParams();
  const {
    data: userProfileData,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useUserProfileQuery(username);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const {
    data: userPosts,
  } = useUserPostQuery(userProfile?.id);
  
  useEffect(() => {
    if (!userProfileLoading && userProfileData) {
      setUserProfile(userProfileData);
    }
    if (!userProfileLoading && userProfileError) {
      setError(userProfileError);
    }
  }, [userProfileData, userProfileLoading, userProfileError]);
  
  if (userProfileLoading) {
    return <div>Loading...</div>;
  }
  if (userProfileError) {
    return <div>Error fetching user profile: {userProfileError.message}</div>;
  }
  if (!userProfile) {
    return <div>User Not Found</div>;
  }
  if (!userPosts || !Array.isArray(userPosts)) {
    return <div>No posts found for this user.</div>;
  }
  
 
  const sortedPosts = [...userPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="profile-page">
      {/* Message display section */}
      <div className="profile-page-user-posts">
        {sortedPosts.map((post) => (
          <div key={post.id} className="profile-page-post">
            <Link
              className="profile-page-post-link"
              to={{
                pathname: `/posts/${post.id}`,
                state: { userId: post.userId },
              }}
            >
              <p>{post.content}</p>
              <p>{formatDate(post.createdAt)}</p>
            </Link>
            <LikePost
                postId={post.id}
                initialLikes={post.likes ? post.likes.length : 0}
                userId={post.userId}
              />
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserProfile;
