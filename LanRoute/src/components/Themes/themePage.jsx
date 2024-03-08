import ThemeCustomizer from './themeCustomizer';
import ProfilePage from '../UserProfile/profilePage';
import { useState } from 'react';

const ThemePage = () => {
  const [theme, setTheme] = useState({
    primaryColor: '#3498db', // Default primary color
    secondaryColor: '#f39c12', // Default secondary color
    fontFamily: 'Arial, sans-serif', // Default font family
    backgroundImage: '', // Default background image URL
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Save the theme settings to local storage or server here
  };

  return (
    <div>
      <h1>Theme Customization</h1>
      <ThemeCustomizer theme={theme} onThemeChange={handleThemeChange} />
      <h1>Preview</h1>
      <ProfilePage theme={theme} />
    </div>
  );
};

export default ThemePage;
