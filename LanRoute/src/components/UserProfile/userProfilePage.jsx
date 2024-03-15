import { useState, useEffect } from "react";
import { useUserProfileQuery } from "../../api/auth";
import { useUserPostQuery } from "../../api/posts";
import LikePost from "../Likes/likes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../Inputs/formatDate";

const UserProfile = () => {
    const {username}  = useParams();
    const { data: userProfileData, isLoading: userProfileLoading, error: userProfileError, refetch: refetchProfile } = useUserProfileQuery(username);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const { data: userPosts, isLoading: postLoading, error: postError, refetch: refetchPosts } = useUserPostQuery(userProfile?.id);

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

    const sortedPosts = [...userPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className='profile-page'>
          <div className="user-posts">
            {sortedPosts.map(post => (
              <div key={post.id} className="post">
                <Link
                  className="post-link"
                  to={{ pathname: `/posts/${post.id}`, state: { userId: post.userId } }}>
                  <p>{post.content}</p>
                  <p>{formatDate(post.createdAt)}</p>
                  <LikePost postId={post.id} initialLikes={post.likes ? post.likes.length : 0} userId={post.userId} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      );
    };
    
    export default UserProfile;