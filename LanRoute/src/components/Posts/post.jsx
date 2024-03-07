import { useParams } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation, useEditPostMutation } from '../../api/posts';
import { useGetTagsQuery } from '../../api/tags';
import Comment from '../Comments/Comment'
import { useNavigate } from 'react-router-dom';
import formatDate from '../Inputs/formatDate';
import { useSelector } from 'react-redux';


const PostPage = () => {
  const { postId } = useParams();
  console.log("Post ID:", postId);
  const { data: postData, isLoading: postLoading } = useGetPostQuery(postId);
  console.log(postData)
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
      navigate("/Feed");
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error appropriately
      if (error.status === 404) {
        // Handle 404 error (Post not found)
        console.error('Post not found');
        alert('Post not found');
      } else {
        // Handle other errors
        console.error('Error deleting post:', error);
        // Navigate to a different page or display a generic error message
        navigate('/Feed');
      }
    }
  };
  

  const handleEdit = async (newContent) => {
    try {
      await editPost({ id: postId, content: editedContent, tags: editedTags });
      setIsEditing(false); // Exit edit mode after saving changes
      // Handle successful edit
      await refetchPost();
    } catch (error) {
      console.error("Error editing post:", error);
      // Handle error
    }
  };

  if (postLoading) {
    return <div>Loading...</div>;
  }

  if (!postData) {
    return <div>Post not found</div>;
  }
  

  const { id, content, createdAt, authorId, author, post_tag } = postData;

  const username = author.username;

  const tagNames = post_tag ? post_tag.map(tag => tag.name) : []; 

  return (
    <div>
        <div>{username}</div>
        <div>{content}</div>
        <div>{formatDate(createdAt)}</div>
        <div>Tags: {tagNames.join(', ')}</div>
        <button onClick={() => handleDeletePost(postId)}>Delete</button>
        <button onClick={() => handleEdit("New content")}>Edit</button>
        <Comment postId={postId} />
    </div>
  );
};

export default PostPage;


