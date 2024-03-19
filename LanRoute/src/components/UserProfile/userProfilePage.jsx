import React, { useState, useEffect } from "react";
import { useUserProfileQuery } from "../../api/auth";
import { useUserPostQuery, useAddPostMutation } from "../../api/posts";
import LikePost from "../Likes/likes";
import { Link, useParams } from "react-router-dom";
import formatDate from "../Inputs/formatDate";
import CreatePostForm from "../Posts/createpostForm";
import SpotifyEmbed from "../Inputs/playlistConverter"; // Import the SpotifyEmbed component

const UserProfile = () => {
    const { username } = useParams();
    const [createPost] = useAddPostMutation();
    const { data: userProfileData, isLoading: userProfileLoading, error: userProfileError, refetch: refetchProfile } = useUserProfileQuery(username);
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const { data: userPosts, isLoading: postLoading, error: postError, refetch: refetchPosts } = useUserPostQuery(userProfile?.id);
    const [playlistUrl, setPlaylistUrl] = useState('');
    const [submittedUrl, setSubmittedUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Set the submitted URL and clear the input field
        setSubmittedUrl(playlistUrl);
        setPlaylistUrl('');
    };

    const handleChange = (event) => {
        setPlaylistUrl(event.target.value);
    };

    console.log(userProfileData);

    useEffect(() => {
        if (!userProfileLoading && userProfileData) {
            setUserProfile(userProfileData);
        }
        if (!userProfileLoading && userProfileError) {
            setError(userProfileError);
        }
    }, [userProfileData, userProfileLoading, userProfileError]);

    if (userProfileLoading) {
        return <div>Loading...</div>;
    }
    if (userProfileError) {
        return <div>Error fetching user profile: {userProfileError.message}</div>;
    }
    if (!userProfile) {
        return <div>User Not Found</div>;
    }

    const { widgets } = userProfile;

    if (!userPosts || !Array.isArray(userPosts)) {
        return <div>No posts found for this user.</div>;
    }

    const handlePostSubmit = async (postData) => {
        try {
            await createPost(postData);
            // Refetch the user's posts after successful post creation
            refetchPosts();
        } catch (error) {
            console.error('Error creating post:', error);
            // Handle error
        }
    };

    const sortedPosts = [...userPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className='profile-page'>
            <div className='create-post-form-container'> {/* Add this container around the CreatePostForm */}
                {/* Render SettingsComponent inside the popup window */}
                <CreatePostForm onSubmit={handlePostSubmit} />
            </div>
            <div className="user-posts">
                {sortedPosts.map(post => (
                    <div key={post.id} className="post">
                        <Link
                            className="post-link"
                            to={{ pathname: `/posts/${post.id}`, state: { userId: post.userId } }}>
                            <p>{post.content}</p>
                            <p>{formatDate(post.createdAt)}</p>
                            <LikePost postId={post.id} initialLikes={post.likes ? post.likes.length : 0} userId={post.userId} />
                        </Link>
                    </div>
                ))}
            </div>
            {/* Add the SpotifyEmbed component here */}
            <div>
                <h2>Favorite Playlist</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Enter Spotify Playlist URL:
                        <input
                            type="text"
                            value={playlistUrl}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
                {submittedUrl && (
                  <div>
                      {/* Render the SpotifyEmbed component with the submitted playlist URL */}
                      <SpotifyEmbed playlistId={submittedUrl} />
                  </div>
                  )}
            </div>
        </div>
    );
};

export default UserProfile;
