import { useState, useEffect } from "react";
import { useUserPostQuery } from "../../api/posts";
import formatDate from "../Inputs/formatDate";
import CreatePostForm from "../Posts/createpostForm";
import {
  useAddPostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} from "../../api/posts";
import LikePost from "../Likes/likes";
import ProfileHeader from "../Inputs/profileHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSendFriendRequestMutation } from "../../api/friendRequest";

const ProfilePage = () => {
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const [createPost] = useAddPostMutation();
  const userId = useSelector((state) => state.user.credentials.user.id);
  const {
    data: userPosts,
    isLoading: postLoading,
    refetch: refetchPosts,
  } = useUserPostQuery(userId);
  const navigate = useNavigate();
  const [editedContent, setEditedContent] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [sendFriendRequest, { isLoading, isSuccess, isError }] =
    useSendFriendRequestMutation();
  const loggedInUserId = useSelector((state) => state.user.credentials.user.id);
  const { userId: profileUserId } = useParams();

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

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId).unwrap();
    } catch (error) {
      if (error.status === 404) {
        console.error("Post not found");
        alert("Post not found");
      } else {
        console.error("Error deleting post:", error);
        navigate("/Feed");
      }
    }
  };

  const handleEdit = async (postId, editedContent, editedTags) => {
    try {
      await editPost({ id: postId, content: editedContent, tags: editedTags });
      // Handle successful edit
      await refetchPosts();
    } catch (error) {
      console.error("Error editing post:", error);
      // Handle error
    }
  };

  const handleSendFriendRequest = async () => {
    try {
      await sendFriendRequest({ recipientId: profileUserId }).unwrap();
      // Handle success feedback
    } catch (error) {
      console.error("Error sending friend request:", error);
      // Handle error feedback
    }
  };

  if (postLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      {parseInt(userId) !== loggedInUserId && (
        <div className="send-friend-request">
          <button onClick={handleSendFriendRequest} disabled={isLoading}>
            Send Friend Request
          </button>
          {isSuccess && <p>Friend request sent!</p>}
          {isError && <p>Error sending friend request.</p>}
        </div>
      )}
      <div className="create-post-form-container">
        {" "}
        {/* Add this container around the CreatePostForm */}
        <CreatePostForm onSubmit={handlePostSubmit} />
      </div>
      <div className="user-posts">
        {userPosts.map((post) => (
          <div key={post.id} className="post">
            <p>{post.content}</p>
            <p>Date/Time: {formatDate(post.createdAt)}</p>
            <div className="interaction-options">
              {/* Add interaction options here */}
              <button
                onClick={() => handleEdit(post.id, editedContent, editedTags)}
              >
                Edit
              </button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
