import { useState } from "react";
import { useAddLikeMutation, useDeleteLikeMutation } from "../../api/posts";
import Button from "../Inputs/button";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

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
    <div>
      <Button
        click={isLiked ? handleUnlike : handleLike}
        disabled={addingLike || deletingLike}
      >
        {isLiked ? "Liked" : "Like"}
      </Button>
      <span>{likes}</span>
    </div>
  );
};
LikePost.propTypes = {
  postId: PropTypes.number.isRequired,
  initialLikes: PropTypes.number.isRequired, // Add initialLikes as a required prop
};
export default LikePost;
