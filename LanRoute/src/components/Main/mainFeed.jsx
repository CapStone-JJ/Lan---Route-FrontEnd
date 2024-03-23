import Sidebar from '../Inputs/sidebar';
import Feed from '../Posts/Feed';
import NewPlaylists from '../Inputs/newPlaylists';
import CreatePostForm from '../Posts/createpostForm';

const MainFeed = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <div> {/* Adjust margins as needed */}
        <Sidebar />
      </div>
      <div>
      </div>
      <div>
        <NewPlaylists />
        <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CreatePostForm />
          {/* Line to separate the CreatePostForm from the Feed */}
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <div style={{ display: 'flex', marginRight: '425px' }}> {/* Adjust margin-left as needed */}
            <Feed />
          </div>
        </div>
        {/* Line to separate the Feed from the NewPlaylists */}
      </div>
    </div>
  );
};

export default MainFeed;








