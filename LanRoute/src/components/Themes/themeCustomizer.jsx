// ThemeCustomizer.js

import React from 'react';

const ThemeCustomizer = ({ theme, onThemeChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onThemeChange({ ...theme, [name]: value });
  };

  return (
    <div>
      <label>
        Primary Color:
        <input
          type="color"
          name="primaryColor"
          value={theme.primaryColor}
          onChange={handleChange}
        />
      </label>
      <label>
        Secondary Color:
        <input
          type="color"
          name="secondaryColor"
          value={theme.secondaryColor}
          onChange={handleChange}
        />
      </label>
      <label>
        Font Family:
        <select name="fontFamily" value={theme.fontFamily} onChange={handleChange}>
          <option value="Arial, sans-serif">Arial</option>
          <option value="Helvetica, sans-serif">Helvetica</option>
          <option value="Verdana, sans-serif">Verdana</option>
          {/* Add more font options as needed */}
        </select>
      </label>
      {/* Add more customization options like background image upload */}
    </div>
  );
};

export default ThemeCustomizer;
