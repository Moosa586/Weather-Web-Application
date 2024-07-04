const apiKey = '4bef1783a0dc0d568d2c2eeda73a3149'; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');

searchButton.addEventListener('click', () => {
  const city = searchInput.value;
  fetchWeather(city);
});

async function fetchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    if (weatherData.cod === '404') {
      alert('City not found. Please enter a valid city name.');
      clearWeather();
      return;
    }

    displayWeather(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = data.main.temp.toFixed(1);
  weatherDescription.textContent = data.weather[0].description;

  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  weatherIcon.innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
}

function clearWeather() {
  cityName.textContent = '';
  temperature.textContent = '';
  weatherDescription.textContent = '';
  weatherIcon.innerHTML = '';
}
