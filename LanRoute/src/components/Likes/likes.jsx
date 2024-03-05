import { useState } from 'react';
import { useAddLikeMutation } from '../../api/posts';
import Button from "../Inputs/button";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

const LikePost = ({ postId, initialLikes, userId }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [addLike, { isLoading: likeLoading }] = useAddLikeMutation();
    const dispatch = useDispatch();

    const handleLike = async () => {
        try {
            // Call the addLike mutation
            const response = await addLike({ 
                postId,
                // Pass the userId as part of the user object
                user: { connect: { id: userId } }
            });
            console.log(userId)
            // Update the likes count and isLiked state based on the response
            setLikes(response.data.likes);
            setIsLiked(true);
        } catch (error) {
            console.error('Error liking post:', error);
            // Handle error
        }
    };

    return (
        <div>
            <Button click={handleLike} disabled={likeLoading || isLiked}>
                {isLiked ? 'Liked' : 'Like'}
            </Button>
            <span>{likes} Likes</span>
        </div>
    );
};

LikePost.propTypes = {
    postId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired, // Add userId as a required prop
};

export default LikePost;
