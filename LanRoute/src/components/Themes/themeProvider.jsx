import { createContext, useState, useContext } from 'react';

// Create a new context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#3498db',
    secondaryColor: '#f39c12',
    fontFamily: 'Arial, sans-serif',
    backgroundImage: '',
  });

  const handleThemeChange = (newTheme) => {
    console.log('Updating theme with new values:', newTheme);
    // Create a new object by spreading the current theme and updating it with the new values
    const updatedTheme = { ...theme, ...newTheme };
    console.log('Updated theme:', updatedTheme);
    // Set the state with the updated theme object
    setTheme(updatedTheme);
    // Save the theme settings to local storage or server here if needed
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = () => {
  return useContext(ThemeContext);
};
