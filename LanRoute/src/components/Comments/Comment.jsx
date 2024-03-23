import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../../api/comments";
import Votes from "./Votes";
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
  console.log(userId);
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
      <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
      <h3>Comments</h3>
      <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
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
                commentIdToHighlight === comment.id ? "#E8F0FE" : "#F9F9F9", // Softer blue for highlight
              transition: "background-color 0.3s ease",
            }}
          >
            
            <p style={{ fontWeight: "bold" }}>{comment.user.username}</p>
              {/* Comment text */}
              <p style={{ fontWeight: 'normal'}}>{comment.text}</p>
            <Votes commentId={comment.id} userId={userId} />
            {comment.userId === userId && ( // Only show the delete button for the user's own comments
              <Button onClick={() => handleDeleteComment(comment.id)}>
                Delete Comment
              </Button>
            )}
            <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          </div>
        ))}
      </div>
      <div>
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
      </div>
      <Button onClick={handleAddComment}>Post Comment</Button>
    </div>
  );
};
Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  commentIdToHighlight: PropTypes.number, // This prop is not required, so it's not marked as `isRequired`
};
export default Comment;

