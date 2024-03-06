import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../../api/comments";
import Votes from "./Votes";

const Comment = ({ postId }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const {
    data: comments,
    error,
    isLoading,
    refetch,
  } = useGetCommentsQuery(postId);
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const userId = useSelector((state) => state.user.credentials.user.id);
  console.log(userId);

  const handleAddComment = async () => {
    if (!newCommentText.trim()) return; // Check if the comment text is not just whitespace
    await addComment({ postId, text: newCommentText }).unwrap();
    refetch(); // Refetch comments after adding a new one
    console.log(comments);
    setNewCommentText(""); // Clear the textarea after posting a comment
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId).unwrap();
    refetch(); // Refetch comments to update the list
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments!</p>;

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments?.map((comment) => (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <Votes commentId={comment.id} userId={userId} />
            {comment.userId === userId && ( // Only show the delete button for the user's own comments
              <button onClick={() => handleDeleteComment(comment.id)}>
                Delete Comment
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default Comment;
