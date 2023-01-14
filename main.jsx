import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }, []);

  useEffect(() => {
    if (location.lat && location.lon) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=YOUR_API_KEY`
        )
        .then(res => {
          setWeather(res.data);
        });
    }
  }, [location]);

  return (
    <div>
      {weather.name && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
