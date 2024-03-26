import PrimarySearchAppBar from '../Inputs/Header';
import UserProfile from '../UserProfile/userProfilePage';
import ProfileHeader from '../Inputs/profileHeader';
import ProfilePlaylists from '../Inputs/profilePlaylists';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CreatePostForm from '../Posts/createpostForm';
import '../Styles/container.css';

const MainUserProfile = () => {
  const { username } = useParams(); // Get the username from the URL params
  const [embeddedPlaylists, setEmbeddedPlaylists] = useState([]);

  return (
    <div className='container-user-profile'>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', textAlign: 'center' }}>
        <PrimarySearchAppBar />
      </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <ProfileHeader />
        </div>
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CreatePostForm />
          </div>
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
            <ProfilePlaylists username={username} /> {/* Add ProfilePlaylists component with username */}
          </div>
          <div>
            {embeddedPlaylists.map((embedCode, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: embedCode }} />
            ))}
          </div>
          <hr style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <UserProfile />
          </div>
      </div>
  );
};

export default MainUserProfile;


