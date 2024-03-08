import Sidebar from '../Inputs/sidebar';
import ProfilePage from '../UserProfile/profilePage';
import ProfileHeader from '../Inputs/profileHeader';
import CreatePostForm from '../Posts/createpostForm';

const MainProfile = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Sidebar />
      <div style={{ width: '600px', marginLeft: '20px' }}>
        <ProfileHeader />
        <ProfilePage />
      </div>
    </div>
  );
};

export default MainProfile;