import { useState } from 'react';
import { useUserProfileQuery } from '../../api/auth';
import Avatar from './avatar';
import '../Styles/profileHeader.css'; // Import CSS for styling
import SettingsComponent from '../UserProfile/settings';
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress component from Material-UI
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import FriendsButton from './friendsButton';

const ProfileHeader = () => {
    const { username, userId } = useParams();
    const { data, isLoading, isError, refetch } = useUserProfileQuery(username);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const authenticatedUsername = useSelector((state) => state.user.credentials.user.username);

    console.log(username, userId);

    // Function to open the popup window
    const openSettingsPopup = () => {
      setIsSettingsOpen(true);
    };

    // Function to close the popup window
    const closeSettingsPopup = () => {
      setIsSettingsOpen(false);
    };

    const handleEditProfile = async () => {
      // Perform edit profile logic
      // Assuming editUser is an asynchronous function that edits the user profile
      try {
        // await editUser(...);
        // After successfully editing the profile, refetch the data
        await refetch();
        setIsSettingsOpen(false);
      } catch (error) {
        console.error('Error updating user:', error);
        // Handle error state
      }
    };

    if (isLoading) {
        return (
            <div className="loading-spinner">
                <CircularProgress />
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching user data</div>;
    }

    if (!data) {
        return null; // or render a placeholder while data is being fetched
    }

    const isOwnProfile = username === authenticatedUsername;
    
    console.log(data)
    return (
        <div className='app'>
            {/* Cover Image */}
          {/* Header */}
          <div className='header'>
            <div className='header__user'>
              <Avatar mod={false} src={data.image} userData={data} />
              <h1 className='header__user-name'>{data.username}</h1>
              <span className='header__user-handle'>@{data.username}</span>
              {isOwnProfile && (
                <Button onClick={openSettingsPopup}>Edit</Button>
              )}
            </div>

            <p className='header__bio'>{data.bio}</p>
            <div className='header__general-info'>
              {/* Add any additional general info here */}
              <p>Location: {data.location}</p>
              <div className='friend-button'>
              <FriendsButton />
              </div>

            </div>
          </div>
      
          {isOwnProfile && isSettingsOpen && (
          <div className="settings-popup">
            <div className="settings-popup-content">
              <div className="settings-box">
                <SettingsComponent userData={data} refetchProfile={refetch} mod={isOwnProfile} />
                <button onClick={closeSettingsPopup}>Close</button>
              </div>
            </div>
  </div>
)}

        </div>
      );
}

export default ProfileHeader;






