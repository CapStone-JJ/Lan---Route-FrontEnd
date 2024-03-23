import Sidebar from '../Inputs/sidebar';
import PostPage from '../Posts/post';

const MainPost = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <Sidebar />
      <PostPage />
    </div>
  );
};

export default MainPost;