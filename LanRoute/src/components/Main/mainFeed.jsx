import Sidebar from '../Inputs/sidebar';
import Feed from '../Posts/Feed';

const MainFeed = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Feed />
    </div>
  );
};

export default MainFeed;