import React, { useState, useEffect } from "react";
import { useUserProfileQuery } from "../../api/auth";
import { useUserPostQuery, useAddPostMutation } from "../../api/posts";
import { useSendFriendRequestMutation } from "../../api/friendRequest";
import LikePost from "../Likes/likes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../Inputs/formatDate";
import CreatePostForm from "../Posts/createpostForm";
import { useSelector } from "react-redux";
import ProfilePlaylists from "../Inputs/profilePlaylists";
import '../Styles/playlistOnProfile.css'
import { Button } from "@mui/material";


const UserProfile = () => {
    const { username, profileId } = useParams();
    const [createPost] = useAddPostMutation();
    const { data: userProfileData, isLoading: userProfileLoading, error: userProfileError, refetch: refetchProfile } = useUserProfileQuery(username);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const { data: userPosts, isLoading: postLoading, error: postError, refetch: refetchPosts } = useUserPostQuery(userProfile?.id);
    const [sendFriendRequest, { isLoading, isSuccess, isError }] = useSendFriendRequestMutation();
    const loggedInUserId = useSelector((state) => state.user.credentials.user.id);
    const { userId } = useParams();

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

    const handlePostSubmit = async (postData) => {
        try {
            await createPost(postData);
            // Refetch the user's posts after successful post creation
            refetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error
        }
    };

    const handleSendFriendRequest = async () => {
      try {
          // Get the recipientId from userProfileData.id
          const recipientId = parseInt(userProfileData.id);

          // Call the sendFriendRequest mutation with the recipientId
          await sendFriendRequest({ recipientId });

          // Handle success feedback
      } catch (error) {
          console.error("Error sending friend request:", error);
          // Handle error feedback
      }
  };

    const sortedPosts = [...userPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className='profile-page'>
              {parseInt(userProfileData.id) !== loggedInUserId && (
                <div className="profile-page-send-friend-request">
                  <Button onClick={handleSendFriendRequest} disabled={isLoading}>
                  Send Friend Request
                 </Button>
                    {isSuccess && <p>Friend request sent!</p>}
                    {isError && <p>Error sending friend request.</p>}
                </div>
                )}
            <div className="profile-page-user-posts">
                {sortedPosts.map(post => (
                    <div key={post.id} className="profile-page-post">
                        <Link
                            className="profile-page-post-link"
                            to={{ pathname: `/posts/${post.id}`, state: { userId: post.userId } }}>
                            <p>{post.content}</p>
                            <p>{formatDate(post.createdAt)}</p>
                        </Link>
                        <LikePost postId={post.id} initialLikes={post.likes ? post.likes.length : 0} userId={post.userId} />
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default UserProfile;
