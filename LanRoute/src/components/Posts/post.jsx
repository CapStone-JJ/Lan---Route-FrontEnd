import { useParams } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation, useEditPostMutation } from '../../api/posts';
import { useGetTagsQuery } from '../../api/tags';
import Comment from '../Comments/Comment'
import { useNavigate } from 'react-router-dom';
import formatDate from '../Inputs/formatDate';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const PostPage = () => {
  const { postId } = useParams();
  const { data: postData, isLoading: postLoading, refetch: refetchPost } = useGetPostQuery(postId);
  const { data: tagsData } = useGetTagsQuery();
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.credentials.user.id);

  const [editedContent, setEditedContent] = useState('');
  const [editedTags, setEditedTags] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track whether the user is editing

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

  if (!postData) {
    return <div>Post not found</div>;
  }
  
  const { content, createdAt, author, Post_tag } = postData;
  const username = author.username;
  const tagNames = Post_tag ? Post_tag.map(entry => entry.tag.name || entry.tag?.name) : [];
  
  return (
    <div>
        <div>{username}</div>
        {isEditing ? (
          <>
            <div>
              Content:
              <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
            </div>
            <div>
              Tags:
              <input type="text" value={editedTags} onChange={(e) => setEditedTags(e.target.value)} />
            </div>
          </>
        ) : (
          <>
            <div>{content}</div>
            <div>{tagNames.join(', ')}</div>
          </>
        )}
        <div>{formatDate(createdAt)}</div>
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => handleDeletePost(postId)}>Delete</button>
          </>
        )}
        {isEditing && (
          <>
            <button onClick={handleEdit}>Save Changes</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
        <Comment postId={postId} />
    </div>
  );
};

export default PostPage;



