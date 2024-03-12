import Sidebar from '../Inputs/sidebar';
import ProfilePage from '../UserProfile/profilePage';
import ProfileHeader from '../Inputs/profileHeader';
import SearchBar from '../Inputs/searchBar';

const MainProfile = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Sidebar />
      <SearchBar />
      <div style={{ width: '600px', marginLeft: '20px' }}>
        <ProfileHeader />
        <ProfilePage />
      </div>
    </div>
  );
};

export default MainProfile;