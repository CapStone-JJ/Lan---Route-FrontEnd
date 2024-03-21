import Sidebar from '../Inputs/sidebar';
import PlaylistManager from '../Inputs/playListManager';

const MainPlaylists = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Sidebar />
      <PlaylistManager />
    </div>
  );
};

export default MainPlaylists;