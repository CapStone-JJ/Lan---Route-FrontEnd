import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useGetCommentsQuery, useAddCommentMutation, useDeleteCommentMutation } from "../../api/comments";
import { Button, TextField } from "@mui/material";
import Votes from "./Votes";
import formatDate from "../Inputs/formatDate";

const Comment = ({ postId, commentIdToHighlight }) => {
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
  console.log(comments);

  // Ref for comments to enable scrolling into view
  const commentRefs = useRef({});

  useEffect(() => {
    // Scroll to and highlight the comment if commentIdToHighlight is provided
    if (commentIdToHighlight && commentRefs.current[commentIdToHighlight]) {
      commentRefs.current[commentIdToHighlight].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [commentIdToHighlight, comments]);

  const handleAddComment = async () => {
    if (!newCommentText.trim()) return; // Check if the comment text is not just whitespace
    console.log(typeof postId);
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
      <hr /> {/* Horizontal line after the "Comments" heading */}
      <h3>Comments</h3>
      <hr /> {/* Horizontal line after the "Comments" heading */}
      <div>
        {comments?.map((comment) => (
          <div
            key={comment.id}
            ref={(el) => (commentRefs.current[comment.id] = el)} // Assign ref to this comment
            style={{
              padding: "10px",
              margin: "10px 0",
              borderRadius: "5px",
              boxShadow:
                commentIdToHighlight === comment.id
                  ? "0 0 10px rgba(0, 0, 0, 0.1)"
                  : "none",
              backgroundColor:
                commentIdToHighlight === comment.id ? "#ff0" : "transparent", // Highlight if this comment is to be highlighted
              marginBottom: "16px", // Add margin bottom between each comment
              padding: "16px", // Add padding to improve spacing
            }}
          >
            <p>{comment.username}</p>
            <p>{comment.text}</p>
            <p>{formatDate(comment.createdAt)}</p>
                commentIdToHighlight === comment.id ? "#e8f0fe" : "#f9f9f9", // Softer blue for highlight
              transition: "background-color 0.3s ease",
            }}
          >
            <strong>{comment.user.username}</strong>: {comment.text}{" "}
            {/* Display username */}
            <Votes commentId={comment.id} userId={userId} />
            {comment.userId === userId && ( // Only show the delete button for the user's own comments
              <Button onClick={() => handleDeleteComment(comment.id)}>
                Delete Comment
              </Button>
            )}
          </div>
        ))}
      </div>
      <div>
        <TextField
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
          multiline
          fullWidth
          sx={{ marginBottom: '16px' }}
        />
        <Button variant="contained" onClick={handleAddComment}>Post Comment</Button>
      </div>
    </div>
  );
};

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  commentIdToHighlight: PropTypes.number, // This prop is not required, so it's not marked as `isRequired`
};

export default Comment;

