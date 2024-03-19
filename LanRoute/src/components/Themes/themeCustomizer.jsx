import PropTypes from 'prop-types';
import "../Styles/themes.css"

const ThemeCustomizer = ({ theme, onThemeChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onThemeChange({ ...theme, [name]: value });
  };

  return (
    <div>
      <label>
        Primary Color:
        <select name="primaryColor" value={theme.primaryColor} onChange={handleChange}>
          <option value="#3498db">Blue</option>
          <option value="#e74c3c">Red</option>
          <option value="#2ecc71">Green</option>
          <option value="#f1c40f">Yellow</option>
          <option value="#9b59b6">Purple</option>
          <option value="#e67e22">Orange</option>
          <option value="#1abc9c">Turquoise</option>
          <option value="#34495e">Dark</option>
          <option value="#95a5a6">Gray</option>
          <option value="#27ae60">Emerald</option>
        </select>
      </label>
      <label>
        Secondary Color:
        <select name="secondaryColor" value={theme.secondaryColor} onChange={handleChange}>
          <option value="#f39c12">Orange</option>
          <option value="#9b59b6">Purple</option>
          <option value="#e74c3c">Red</option>
          <option value="#2ecc71">Green</option>
          <option value="#3498db">Blue</option>
          <option value="#e67e22">Dark Orange</option>
          <option value="#1abc9c">Turquoise</option>
          <option value="#34495e">Dark</option>
          <option value="#95a5a6">Gray</option>
          <option value="#27ae60">Emerald</option>
        </select>
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
      <label>
        Background Image URL:
        <input
          type="text"
          name="backgroundImage"
          value={theme.backgroundImage}
          onChange={handleChange}
        />
      </label>
      {/* Add more customization options if needed */}
    </div>
  );
};

ThemeCustomizer.propTypes = {
  theme: PropTypes.shape({
    primaryColor: PropTypes.string.isRequired,
    secondaryColor: PropTypes.string.isRequired,
    fontFamily: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
  }).isRequired,
  onThemeChange: PropTypes.func.isRequired,
};

export default ThemeCustomizer;

