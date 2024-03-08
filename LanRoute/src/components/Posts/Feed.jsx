import { useState, useEffect } from 'react';
import { useGetFeedQuery } from '../../api/posts';
import formatDate from '../Inputs/formatDate';
import { Link } from 'react-router-dom';
import CreatePostForm from './createpostForm';
import { useAddPostMutation } from '../../api/posts';
import LikePost from '../Likes/likes';
import "../Styles/feed.css"

const Feed = () => {
    const [token, setToken] = useState('');
    const [headers, setHeaders] = useState({
        Authorization: '',
        'Content-Type': 'application/json',
    });
    const { data: feedData } = useGetFeedQuery({ headers });
    const [addPost, { isLoading: isAddingPost }] = useAddPostMutation();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setHeaders({
                ...headers,
                Authorization: `Bearer ${storedToken}`,
            });
        }
    }, []);

    const handlePostSubmit = async (postData) => {
        try {
          await addPost(postData).unwrap();
          console.log("Post added successfully");
        } catch (error) {
          console.error("Error creating post:", error);
          // Handle error
        }
      };

    return (
        <div className="feed">
  {/* Render the CreatePostForm component with handlePostSubmit passed as prop */}
  <CreatePostForm onSubmit={handlePostSubmit} />

  {/* Render feed posts */}
  {feedData &&
    feedData.map(post => (
      <div key={post.id} className="post">
        <Link
          className="post-link"
          to={{ pathname: `/posts/${post.id}`, state: { userId: post.userId } }}
        >
          <p className="author">{post.author?.username}</p>
          <p className="content">{post.content}</p>
          <p className="tags">{post.tags?.map(tag => tag.name).join(',')}</p>
          <p className="date">{formatDate(post.createdAt)}</p>
          <LikePost postId={post.id} initialLikes={post.likes.length} userId={post.userId} />
        </Link>
      </div>
    ))}
</div>
    );
};

export default Feed;












