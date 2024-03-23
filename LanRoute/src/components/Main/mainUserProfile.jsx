import React from 'react';
import Sidebar from '../Inputs/sidebar';
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
      <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
        <Sidebar />
        <div style={{ width: '600px', marginLeft: '20px', textAlign: 'center' }}>
          <ProfileHeader />
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CreatePostForm />
          </div>
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ProfilePlaylists username={username} style={{ marginLeft: '20px' }} /> {/* Add ProfilePlaylists component with username */}
          </div>
          <div style={{ marginLeft: '20px' }}>
            {embeddedPlaylists.map((embedCode, index) => (
              <div key={index} dangerouslySetInnerHTML={{ __html: embedCode }} />
            ))}
          </div>
          <hr style={{ width: '100%', marginTop: '20px', marginBottom: '20px', border: 'none', borderBottom: '1px solid #ccc' }} />
          <UserProfile style={{ marginLeft: '20px' }} />
        </div>
      </div>
    </div>
  );
};

export default MainUserProfile;


