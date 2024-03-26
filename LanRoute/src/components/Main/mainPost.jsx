import PrimarySearchAppBar from '../Inputs/Header';
import PostPage from '../Posts/post';

const MainPost = () => {
  return (
    <div>
    <div style={{ display: 'flex', width: '100%', justifyContent: 'center', textAlign: 'center' }}>
      <PrimarySearchAppBar />
    </div>
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <PostPage />
      </div>
    </div>
  );
};

export default MainPost;