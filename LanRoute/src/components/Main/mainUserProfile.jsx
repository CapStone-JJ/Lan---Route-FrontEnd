import Sidebar from '../Inputs/sidebar';
import UserProfile from '../UserProfile/userProfilePage';
import ProfileHeader from '../Inputs/profileHeader';
import SearchBar from '../Inputs/searchBar';

const MainUserProfile = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Sidebar />
      <div style={{ width: '600px', marginLeft: '20px' }}>
        <ProfileHeader />
        <UserProfile />
      </div>
    </div>
  );
};

export default MainUserProfile;