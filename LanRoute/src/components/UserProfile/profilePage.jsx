import { useState, useEffect, useContext } from 'react';
import { useUserPostQuery } from '../../api/posts';
import formatDate from '../Inputs/formatDate';
import CreatePostForm from '../Posts/createpostForm';
import { useAddPostMutation, useDeletePostMutation, useEditPostMutation } from '../../api/posts';
import LikePost from '../Likes/likes';
import ProfileHeader from '../Inputs/profileHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "../Styles/profilePage.css";
import SettingsComponent from './settings';

const ProfilePage = () => {
    const [deletePost] = useDeletePostMutation();
    const [editPost] = useEditPostMutation();
    const [createPost] = useAddPostMutation();
    const userId = useSelector((state) => state.user.credentials.user.id);
    const { data: userPosts, isLoading: postLoading, refetch: refetchPosts } = useUserPostQuery(userId);
    const navigate = useNavigate();
    const [editedContent, setEditedContent] = useState('');
    const [editedTags, setEditedTags] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Function to open the popup window
    const openSettingsPopup = () => {
      setIsSettingsOpen(true);
    };

  // Function to close the popup window
    const closeSettingsPopup = () => {
      setIsSettingsOpen(false);
    };

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

    const handleDeletePost = async (postId) => {
      setIsDeleting(true);
      try {
        await deletePost(postId).unwrap(); 
        navigate('/profilePage');
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      } finally {
        setIsDeleting(false);
      }
    };

    const handleEdit = async () => {
      try {
        await editPost({ id: postId, content: editedContent, tags: editedTags });
        setIsEditing(false); // Exit edit mode after saving changes
        // Handle successful edit
        await refetchPost();
      } catch (error) {
        console.error('Error editing post:', error);
        // Handle error
      }
    };

    if (postLoading) {
        return <div>Loading...</div>;
    }

    // Create a copy of userPosts array before sorting
    const sortedPosts = [...userPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
      <div className='profile-page'>
        <div className='create-post-form-container'> {/* Add this container around the CreatePostForm */}
        {/* Render SettingsComponent inside the popup window */}
        {isSettingsOpen && (
            <div className="settings-popup">
                <div className="settings-popup-content">
                    <SettingsComponent />
                    <button onClick={closeSettingsPopup}>Close</button>
                </div>
            </div>
        )}

        {/* Button to open the popup window */}
        <button onClick={openSettingsPopup}>Edit Profile</button>
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
              </Link>
              </div>
          ))}
        </div>
        
        
      </div>
    );
};

export default ProfilePage;


