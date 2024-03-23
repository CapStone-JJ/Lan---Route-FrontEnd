import React, { useState, useEffect } from "react";
import {
  useUserProfileQuery,
  useCheckFriendshipStatusQuery,
  useDeleteFriendMutation,
} from "../../api/auth";
import { useUserPostQuery, useAddPostMutation } from "../../api/posts";
import { useSendFriendRequestMutation } from "../../api/friendRequest";
import LikePost from "../Likes/likes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../Inputs/formatDate";
import CreatePostForm from "../Posts/createpostForm";
import { useSelector } from "react-redux";
import ProfilePlaylists from "../Inputs/profilePlaylists";
import "../Styles/playlistOnProfile.css";

const UserProfile = () => {
  const { username } = useParams();
  const loggedInUserId = useSelector((state) => state.user.credentials.user.id);
  const [createPost] = useAddPostMutation();
  const {
    data: userProfileData,
    isLoading: userProfileLoading,
    error: userProfileError,
  } = useUserProfileQuery(username);
  const [
    sendFriendRequest,
    {
      isLoading: isSending,
      isSuccess: isRequestSuccess,
      isError: isRequestError,
    },
  ] = useSendFriendRequestMutation();
  const [deleteFriend, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] =
    useDeleteFriendMutation(); // Hook to delete a friend

  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const {
    data: userPosts,
    isLoading: postLoading,
    error: postError,
    refetch: refetchPosts,
  } = useUserPostQuery(username);

  const { userId } = useParams();
  const [embeddedPlaylists, setEmbeddedPlaylists] = useState([]);
  const { data: friendshipStatus, isLoading: checkingFriendship } =
    useCheckFriendshipStatusQuery(userProfileData?.id, {
      skip: !userProfileData?.id, // Skip this query if userProfileData.id is not available
    });
  const [message, setMessage] = useState({ type: "", content: "" });

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
      console.error("Error creating post:", error);
      // Handle error
    }
  };

  // Handle sending friend requests
  const handleSendFriendRequest = async () => {
    if (!userProfileData || userProfileData.id === loggedInUserId) {
      setMessage({
        type: "error",
        content: "Cannot send a friend request to yourself.",
      });
      return;
    }
    try {
      await sendFriendRequest({ recipientId: userProfileData.id }).unwrap();
      setMessage({
        type: "success",
        content: "Friend request sent successfully",
      });
    } catch (error) {
      let content = "Error sending friend request";
      if (error.status === 409) {
        content = error.data.message; // "Friend request already exists."
      } else {
        console.error(content, error);
      }
      setMessage({ type: "error", content });
    }
  };

  // Handle unfriending
  const handleUnfriend = async () => {
    if (!friendshipStatus?.areFriends) {
      console.error("You are not friends, cannot unfriend.");
      return;
    }

    try {
      const currentUserId = loggedInUserId; // The ID of the logged-in user
      const otherUserId = userProfileData.id; // The ID of the other user

      await deleteFriend({
        currentUserId,
        otherUserId,
      }).unwrap();

      console.log("Unfriended successfully");
    } catch (error) {
      console.error("Error unfriending:", error);
    }
  };

  // Conditionally render the friend action button based on the friendship status
  const renderFriendActionButton = () => {
    if (checkingFriendship || isSending || isDeleting) {
      return <button disabled>Loading...</button>;
    }

    return friendshipStatus?.areFriends ? (
      <button onClick={handleUnfriend} disabled={isDeleting}>
        Unfriend
      </button>
    ) : (
      <button onClick={handleSendFriendRequest} disabled={isSending}>
        Send Friend Request
      </button>
    );
  };

  if (userProfileLoading) {
    return <div>Loading...</div>;
  }

  if (userProfileError) {
    return <div>Error fetching user profile: {userProfileError.message}</div>;
  }

  const sortedPosts = [...userPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="profile-page">
      {/* Message display section */}
      {message.content && (
        <div className={`message ${message.type}`}>{message.content}</div>
      )}
      {parseInt(userProfileData.id) !== loggedInUserId && (
        <div className="friend-action">
          {renderFriendActionButton()}
          {isRequestSuccess && <p>Friend request sent!</p>}
          {isDeleteSuccess && <p>Friend removed successfully.</p>}
        </div>
      )}
      <div className="create-post-form-container">
        {" "}
        {/* Add this container around the CreatePostForm */}
        {/* Render SettingsComponent inside the popup window */}
        <CreatePostForm onSubmit={handlePostSubmit} />
      </div>
      <div>
        <ProfilePlaylists username={username} />
        {embeddedPlaylists.map((embedCode, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: embedCode }} />
        ))}
      </div>
      <div className="user-posts">
        {sortedPosts.map((post) => (
          <div key={post.id} className="post">
            <Link
              className="post-link"
              to={{
                pathname: `/posts/${post.id}`,
                state: { userId: post.userId },
              }}
            >
              <p>{post.content}</p>
              <p>{formatDate(post.createdAt)}</p>
              <LikePost
                postId={post.id}
                initialLikes={post.likes ? post.likes.length : 0}
                userId={post.userId}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
