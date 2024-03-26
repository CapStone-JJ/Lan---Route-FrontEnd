import Feed from '../Posts/Feed';
import NewPlaylists from '../Inputs/newPlaylists';
import CreatePostForm from '../Posts/createpostForm';
import PrimarySearchAppBar from '../Inputs/Header';

const MainFeed = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Centered horizontally */}
      <div style={{ width: '100%' }}> {/* Adjust margins as needed */}
        <PrimarySearchAppBar />
      </div>
      <div>
        <NewPlaylists />
        <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CreatePostForm />
          {/* Line to separate the CreatePostForm from the Feed */}
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: "center" }}> {/* Adjust margin-left as needed */}
            <Feed />
          </div>
        </div>
        {/* Line to separate the Feed from the NewPlaylists */}
      </div>
    </div>
  );
};

export default MainFeed;











