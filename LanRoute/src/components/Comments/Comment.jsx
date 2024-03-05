import React, { useState } from "react";
import { useGetCommentsQuery, useAddCommentMutation } from "../../api/comments";

const Comment = ({ postId }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const {
    data: comments,
    error,
    isLoading,
    refetch,
  } = useGetCommentsQuery(postId);
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async () => {
    if (!newCommentText.trim()) return; // Check if the comment text is not just whitespace
    await addComment({ postId, text: newCommentText }).unwrap();
    refetch(); // Refetch comments after adding a new one
    setNewCommentText(""); // Clear the textarea after posting a comment
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments!</p>;

  return (
    <div>
      <h3>Comments</h3>
      <div>
        {comments?.map((comment) => (
          <p key={comment.id}>{comment.text}</p>
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
