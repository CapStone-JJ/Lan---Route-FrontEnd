import Sidebar from '../Inputs/sidebar';
import PostPage from '../Posts/post';

const MainPost = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <Sidebar />
      <div style={{ width: '100%' }}>
      <PostPage />
      </div>
    </div>
  );
};

export default MainPost;