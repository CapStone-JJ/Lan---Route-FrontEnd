import { useParams, useLocation } from "react-router-dom";
import {
  useGetPostQuery,
  useDeletePostMutation,
  useEditPostMutation,
} from "../../api/posts";
import { useGetTagsQuery } from "../../api/tags";
import Comment from "../Comments/Comment";
import { useNavigate } from "react-router-dom";
import formatDate from "../Inputs/formatDate";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "../Styles/post.css";
import { Link } from "react-router-dom";
import Avatar from "../Inputs/avatar";
import { Button, TextField, Box } from "@mui/material";


const PostPage = () => {
  const { postId: postIdString } = useParams();
  const postId = parseInt(postIdString, 10);
  const location = useLocation();
  const commentIdToHighlight = location.state?.commentId;
  const {
    data: postData,
    isLoading: postLoading,
    isError,
    error,
    refetch: refetchPost,
  } = useGetPostQuery(postId);
  const { data: tagsData } = useGetTagsQuery();
  const [deletePost] = useDeletePostMutation();
  const [editPost] = useEditPostMutation();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.credentials.user.id);
  const [editedContent, setEditedContent] = useState("");
  const [editedTags, setEditedTags] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (postData) {
      setEditedContent(postData.content);
      const tagNames = postData.Post_tag
        ? postData.Post_tag.map((entry) => entry.tag.name || entry.tag?.name)
        : [];
      setEditedTags(tagNames.join(", "));
    }
  }, [postData]);

  const handleDeletePost = async (postId) => {
    setIsDeleting(true);
    try {
      await deletePost(postId).unwrap();
      navigate("/mainFeed");
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
      setIsEditing(false);
      await refetchPost();
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  if (postLoading) {
    return <div>Loading...</div>;
  }
  if (isError) return <div>Error: {error.message}</div>;
  if (!postData) {
    return <div>Post not found</div>;
  }

  const authorUserId = postData.author.id;
  const { content, createdAt, author, Post_tag } = postData;
  const username = author.username;
  const tagNames = Post_tag ? Post_tag.map((entry) => entry.tag.name || entry.tag?.name) : [];

  return (
    <div className="container">
      <div className="post">
        <Link to={`/profile/${username}`}>
          <Avatar alt={`${username} Avatar`} src={username.image} />
          <div>{username}</div>
        </Link>
        {isEditing ? (
          <>
            <div>
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </div>
            <div>
              <TextField
                label="Tags"
                variant="outlined"
                fullWidth
                value={editedTags}
                onChange={(e) => setEditedTags(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>{content}</div>
            <div>{tagNames.join(", ")}</div>
          </>
        )}
        <div>{formatDate(createdAt)}</div>
        {authorUserId === userId && !isEditing && (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button onClick={() => handleDeletePost(postId)} disabled={isDeleting}>Delete</Button>
          </>
        )}
        {isEditing && (
          <>
            <Button onClick={handleEdit}>Save Changes</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </>
        )}
        <Comment postId={postId} commentIdToHighlight={commentIdToHighlight} />
      </div>
    </div>
  );
};

export default PostPage;
