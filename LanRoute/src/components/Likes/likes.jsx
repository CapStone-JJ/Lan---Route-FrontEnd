// LikePost.js
import { useState } from "react";
import { useAddLikeMutation, useDeleteLikeMutation } from "../../api/posts";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Button } from "@mui/material";

const LikePost = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes.count || initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [addLike, { isLoading: addingLike }] = useAddLikeMutation();
  const [deleteLike, { isLoading: deletingLike }] = useDeleteLikeMutation();

  // Retrieve userId from Redux store
  const userId = useSelector((state) => state.user.credentials.user.userId);

  const handleLike = async () => {
    try {
      await addLike({ postId, userId });
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await deleteLike({ postId, userId });
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } catch (error) {
      console.error("Error removing like from post:", error);
    }
  };

  return (
    <div className="like-post-container">
      <Button
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={isLiked ? handleUnlike : handleLike} // Corrected prop name to onClick
        disabled={addingLike || deletingLike}
        style={{ background: 'none', border: 'none', padding: '0' }} // Add custom styles to remove box
      >
        {isLiked ? <ThumbUpAltIcon className="like-icon" /> : <ThumbUpOffAltIcon className="like-icon" />}
        <span className="like-count">{likes}</span>
      </Button>
    </div>
  );
};

LikePost.propTypes = {
  postId: PropTypes.number.isRequired,
  initialLikes: PropTypes.number.isRequired, // Add initialLikes as a required prop
};

export default LikePost;

