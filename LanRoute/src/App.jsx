import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainFeed from './components/Main/mainFeed';
import MainNotifications from './components/Main/mainNotifications';
import MainFriends from './components/Main/mainFriends';
import ThemePage from './components/Themes/themePage';
import { ThemeProvider } from './components/Themes/themeProvider';
import MainSearch from './components/Main/MainSearch';
import MainUserProfile from './components/Main/mainUserProfile';
import MainPlaylists from './components/Main/mainPlaylists';
import MainPost from './components/Main/mainPost';
import SettingsComponent from './components/UserProfile/settings';

function App() {
  // Define userData state using useState
  const [userData, setUserData] = useState(null);

  // Define a function to fetch user data
  const fetchUserData = async () => {
    try {
      // Example: Fetch user data from an API
      const response = await fetch('your-api-endpoint-here');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  // Define a function to refetch user data
  const refetchProfile = async () => {
    await fetchUserData();
  };

  return (
    <ThemeProvider>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/feed" element={<MainFeed />} />
          <Route path="/posts/:postId" element={<MainPost />} />
          <Route path="/notifications" element={<MainNotifications />} />
          <Route path="/friends" element={<MainFriends />} />
          <Route path="/themePage" element={<ThemePage />} />
          <Route path="/searchBar" element={<MainSearch />} />
          <Route path="/profile/:username" element={<MainUserProfile />} />
          <Route
            path="/settings"
            element={<SettingsComponent userData={userData} refetchProfile={refetchProfile} />}
          />
          <Route path="/playlists" element={<MainPlaylists />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

