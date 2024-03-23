import { useState } from "react";
import {
  useUserProfileQuery,
  useCheckFriendshipStatusQuery,
  useDeleteFriendMutation,
} from "../../api/auth";
import { useSendFriendRequestMutation } from "../../api/friendRequest";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../Styles/playlistOnProfile.css";

const FriendsButton = () => {
  const { username } = useParams();
  const loggedInUserId = useSelector((state) => state.user.credentials.user.id);
  const {
    data: userProfileData,
  } = useUserProfileQuery(username);
  const [
    sendFriendRequest,
    {
      isLoading: isSending,
      isSuccess: isRequestSuccess,
    },
  ] = useSendFriendRequestMutation();
  const [deleteFriend, { isLoading: isDeleting, isSuccess: isDeleteSuccess }] =
    useDeleteFriendMutation(); // Hook to delete a friend
  const { data: friendshipStatus, isLoading: checkingFriendship } =
    useCheckFriendshipStatusQuery(userProfileData?.id, {
      skip: !userProfileData?.id, // Skip this query if userProfileData.id is not available
    });
  const [message, setMessage] = useState({ type: "", content: "" });

  
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

  return (
    <div className="friend-button">
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
    </div>
  );
};
export default FriendsButton;
