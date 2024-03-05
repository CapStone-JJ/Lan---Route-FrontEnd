import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation, useEditPostMutation } from '../../api/posts';
import { useGetTagsQuery } from '../../api/tags';
import { useDeletePostMutation, useEditPostMutation, useGetPostQuery } from '../../api/posts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from '../Comments/Comment'

const PostPage = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
    const [tags, setTags] = useState([]);
    const { data: tagsData, isLoading: tagsLoading } = useGetTagsQuery();
    const { data: postData, isLoading: postLoading } = useGetPostQuery(postId);
    const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
    const [editPost, { isLoading: editLoading }] = useEditPostMutation();
    const dispatch = useDispatch();
    const notLength = useSelector(state => state.length);
    

    useEffect(() => {
        // Check if postData is available and set post state
        if (postData) {
            setPost(postData);
            // Initialize editedPost with post data
            setEditedPost({ ...postData });
        }
    }, [postData, postId]);

    // Rest of your component code


    useEffect(() => {
        if (tagsData) {
            setTags(tagsData);
        }
    }, [tagsData]);

    const handleEdit = () => {
        setEditMode(true);
        setEditedPost({ ...post });
    };

    const handleSaveEdit = () => {
        // Call editPost mutation with editedPost data
        editPost(editedPost)
            .then(() => {
                // If edit successful, exit edit mode and update post state
                setEditMode(false);
                setPost({ ...editedPost });
            })
            .catch((error) => {
                console.error('Error editing post:', error);
                // Handle error
            });
    };

    const handleDelete = () => {
        deletePost(postId)
            .then(() => {
                // If delete successful, redirect to post list page or perform any other necessary action
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
                // Handle error
            });
    };

    return (
        <div>
            {post ? (
                <>
                    <h1>{post.author}</h1>
                    <p>{post.content}</p>
                    <div>
                        {post.tags && post.tags.map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                    <Link to={`/edit/${postId}`}>Edit</Link>
                    <button onClick={handleDelete} disabled={deleteLoading}>Delete</button>
                    <Comment postId={postId} />
                </>
            ) : (
                <p>Loading...</p>
            )}
            {editMode && (
                <div>
                    <input
                        type="text"
                        value={editedPost.title}
                        onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                    />
                    <textarea
                        value={editedPost.content}
                        onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                    ></textarea>
                    {/* Add tags input field */}
                    {/* Add save and cancel buttons */}
                    <button onClick={handleSaveEdit} disabled={editLoading}>Save</button>
                    <button onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

PostPage.propTypes = {
    postId: PropTypes.number.isRequired,

import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const { data: postData, isLoading: postLoading } = useGetPostQuery(postId);
  const { data: tagsData } = useGetTagsQuery();
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deletePost(postId);
      // Handle successful deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error
      navigate('/Feed');
    }
  };

  const handleEdit = async (newContent) => {
    try {
      await editPost({ id: postId, content: newContent });
      // Handle successful edit
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

  const { id, content, createdAt, author, tags } = postData;

  return (
    <div>
      <div>ID: {id}</div>
      <div>Content: {content}</div>
      <div>Created At: {createdAt}</div>
      <div>Author: {author.username}</div>
      <div>Tags: {postData.tags && tagsData.map(tag => tag.name).join(', ')}</div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => handleEdit("New content")}>Edit</button>
    </div>
  );

};

export default PostPage;


