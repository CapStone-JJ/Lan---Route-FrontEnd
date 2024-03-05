import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation, useEditPostMutation } from '../../api/posts';
import { useGetTagsQuery } from '../../api/tags';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from '../Comments/Comment'
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
      <Comment postId={postId} />
    </div>
  );

};

export default PostPage;


