import { useState } from 'react';
import { useAddLikeMutation } from '../../api/posts';
import Button from "../Inputs/button";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

const LikePost = ({ postId, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes.count || initialLikes);
    const [isLiked, setIsLiked] = useState(false);
    const [addLike, { isLoading: likeLoading }] = useAddLikeMutation();
    const dispatch = useDispatch();

    // Retrieve userId from Redux store
    const userId = useSelector(state => state.user.credentials.user.userId);

    const handleLike = async () => {
        try {
            // Call the addLike mutation
            const response = await addLike({ 
                postId,
                userId
            });
    
            console.log(response); // Log the response object to check its structure
    
            // Check if the response contains an error
            if (response.error) {
                console.error('Error liking post:', response.error);
                // Handle error
            } else {
                // Ensure that the response contains the expected data structure
                if (response.data && response.data.likes !== undefined) {
                    // Update the likes count and isLiked state based on the response
                    setLikes(response.data.likes);
                    setIsLiked(true);
                } else {
                    console.error('Invalid response format:', response);
                }
            }
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
            <span>{likes}</span>
        </div>
    );
};

LikePost.propTypes = {
    postId: PropTypes.number.isRequired,
    initialLikes: PropTypes.number.isRequired, // Add initialLikes as a required prop
};

export default LikePost;

