import { useState, useEffect } from 'react';
import axios from 'axios';

const basePath = './images/'

function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const apiKey = "e1fcd2c44f4714de4cf14e3724f7860c";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weather) {
    return <div>Loading...</div>;
  }

  const weatherIcon = () => {
    if (weather.weather[0].main === "Clouds") {
      return <img src={basePath + 'clouds.png'} alt="Clouds" className="weather-icon" />;
    } else if (weather.weather[0].main === "Clear") {
      return <img src="images/clear.png" alt="Clear" className="weather-icon" />;
    } else if (weather.weather[0].main === "Rain") {
      return <img src="images/rain.png" alt="Rain" className="weather-icon" />;
    } else if (weather.weather[0].main === "Drizzle") {
      return <img src="images/drizzle.png" alt="Drizzle" className="weather-icon" />;
    } else if (weather.weather[0].main === "Mist") {
      return <img src="images/mist.png" alt="Mist" className="weather-icon" />;
    } else if (weather.weather[0].main === "Snow") {
      return <img src="images/snow.png" alt="Snow" className="weather-icon" />;
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className="weather">
      {weatherIcon()}
      <h1 className="temp">{weather.main.temp}°C</h1>
      <h2 className="city">{city}</h2>
      <div className="details">
        <div className="left-column">
          <div className="sunrise">
            <div>
              <p className="sunrise-time">{formatTime(weather.sys.sunrise)}</p>
              <p>Sunrise Time</p>
            </div>
          </div>
          <div className="col">
            <img src="images/humidity.png" alt="Humidity" />
            <div>
              <p className="humidity">{weather.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
        <div className="right-column">
          <div className="sunset">
            <div>
              <p className="sunset-time">{formatTime(weather.sys.sunset)}</p>
              <p>Sunset Time</p>
            </div>
          </div>
          <div className="col">
            <img src="images/wind.png" alt="Wind Speed" />
            <div>
              <p className="wind">{weather.wind.speed} km/h</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidget;
