import React, { useState } from "react";
import { useGetCommentsQuery, useAddCommentMutation } from "../../api/comments";

const Comment = ({ postId }) => {
  const [newComment, setNewComment] = useState("");
  const { data: comments, error, isLoading } = useGetCommentsQuery(postId);
  const [addComment] = useAddCommentMutation();

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment({ text: newComment, postId });
    setNewComment("");
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
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default Comment;
