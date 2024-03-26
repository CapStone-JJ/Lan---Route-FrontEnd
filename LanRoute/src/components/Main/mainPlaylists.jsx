import PrimarySearchAppBar from '../Inputs/Header';
import PlaylistManager from '../Inputs/playListManager';

const MainPlaylists = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <PrimarySearchAppBar />
      </div>
      <div>
        <PlaylistManager />
      </div>
    </div>
  );
};

export default MainPlaylists;