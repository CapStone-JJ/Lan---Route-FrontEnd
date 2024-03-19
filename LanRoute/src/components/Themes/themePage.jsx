import { ThemeProvider, useTheme } from './themeProvider';
import ThemeCustomizer from './themeCustomizer';
import ProfilePage from '../../components/UserProfile/userProfilePage';

const ThemePage = () => {
  const { theme, handleThemeChange } = useTheme(); // Use the useTheme hook to access theme values

  return (
    <ThemeProvider> 
      <div>
        <h1>Theme Customization</h1>
        <ThemeCustomizer theme={theme} onThemeChange={handleThemeChange} /> {/* Pass handleThemeChange as a prop */}
        <h1>Preview</h1>
        <ProfilePage />
      </div>
    </ThemeProvider>
  );
};

export default ThemePage;



