import React, { useState, useEffect } from 'react';
import { useGetTagsQuery } from '../../api/tags';
import { useDeletePostMutation, useEditPostMutation } from '../../api/posts';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const PostPage = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedPost, setEditedPost] = useState(null);
    const [tags, setTags] = useState([]);
    const { data: tagsData, isLoading: tagsLoading } = useGetTagsQuery();
    const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();
    const [editPost, { isLoading: editLoading }] = useEditPostMutation();
    const dispatch = useDispatch();
    const notLength = useSelector(state => state.length);

    useEffect(() => {
        // Fetch the post data using postId
        // Example: fetchPost(postId).then((data) => setPost(data));
    }, [postId]);

    useEffect(() => {
        if (tagsData) {
            setTags(tagsData);
        }
    }, [tagsData]);

    const handleEdit = () => {
        setEditMode(true);
        // Initialize editedPost state with current post data
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
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <div>
                        {post.tags.map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                    <Link to={`/edit/${postId}`}>Edit</Link>
                    <button onClick={handleDelete} disabled={deleteLoading}>Delete</button>
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

export default PostPage;

