import React from 'react';
import { useState, useEffect } from 'react';
import { useGetTagsQuery, useAddTagMutation } from '../../api/tags';
import { useAddPostMutation, useGetPostsQuery, useDeletePostMutation, useEditPostMutation, useGetPostQuery  } from '../../api/posts';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = ({}) => {
    const userId = useSelector((state) => state.user.credentials.user.id);
    const { data: userPosts, isLoading } = useGetPostsQuery(userId);
    const { data: tagsData } = useGetTagsQuery();
    const [deletePost] = useDeletePostMutation();
    const [editPost] = useEditPostMutation();

    const [editedContent, setEditedContent] = useState('');
    const [editedTags, setEditedTags] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Set initial state when component mounts
        if (postData) {
          setEditedContent(postData.content);
          const tagNames = postData.Post_tag ? postData.Post_tag.map(entry => entry.tag.name || entry.tag?.name) : [];
          setEditedTags(tagNames.join(', '));
        }
      }, [postData]);
    
      const handleDeletePost = async (postId) => {
        try {
          await deletePost(postId).unwrap(); 
        } catch (error) {
          if (error.status === 404) {
            console.error('Post not found');
            alert('Post not found');
          } else {
            console.error('Error deleting post:', error);
            navigate('/Feed');
          }
        }
      };

      if (postLoading) {
        return <div>Loading...</div>;
      }
    
      if (!postData) {
        return <div>Post not found</div>;
      }

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



    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="user-posts">
          {userPosts.map(post => (
            <div key={post.id} className="post">
              <p>{post.content}</p>
              <p>Date/Time: {post.createdAt}</p>
              <p>Likes: {post.likes.length}</p>
              <p>Comments: {post.comments.length}</p>
              <div className="interaction-options">
                {/* Add interaction options here */}
                <button onClick={() => handleLike(post.id)}>Like</button>
                <button onClick={() => handleComment(post.id)}>Comment</button>
                <button onClick={() => handleEdit(post.id)}>Edit</button>
                <button onClick={() => handleDeletePost(post.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
    );
};

export default ProfilePage;
