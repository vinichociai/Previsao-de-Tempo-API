// Chaves de API
// Por segurança, não coloque chaves reais em repositórios públicos.
// Substitua os valores abaixo localmente para testar o projeto.
const apiKey = "SUA_CHAVE_OPENWEATHER";
const unsplashApiKey = "SUA_CHAVE_UNSPLASH";

const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const errorElement = document.querySelector("#error-message");

const defaultBackground =
  "linear-gradient(180deg, #594cee 0%, hsl(201, 84%, 76%) 100%)";

const hasConfiguredApiKeys = () => {
  return (
    apiKey &&
    unsplashApiKey &&
    apiKey !== "SUA_CHAVE_OPENWEATHER" &&
    unsplashApiKey !== "SUA_CHAVE_UNSPLASH"
  );
};

const showError = (message) => {
  errorElement.innerText = message;
  errorElement.classList.remove("hide");
  weatherContainer.classList.add("hide");
};

const hideError = () => {
  errorElement.innerText = "";
  errorElement.classList.add("hide");
};

const setLoading = (isLoading) => {
  searchBtn.disabled = isLoading;
  searchBtn.innerHTML = isLoading
    ? '<i class="fa-solid fa-spinner fa-spin"></i>'
    : '<i class="fa-solid fa-magnifying-glass"></i>';
};

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${apiKey}&lang=pt_br`;

  const response = await fetch(apiWeatherURL);

  if (!response.ok) {
    throw new Error("Não foi possível buscar os dados do clima.");
  }

  return response.json();
};

const getUnsplashImage = async (city) => {
  const apiUnsplashURL = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    city
  )}&client_id=${unsplashApiKey}&orientation=landscape&per_page=1`;

  const response = await fetch(apiUnsplashURL);

  if (!response.ok) {
    throw new Error("Não foi possível buscar imagem da cidade.");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  return data.results[0].urls.regular;
};

const updateWeatherInterface = (weatherData, imageUrl) => {
  cityElement.innerText = weatherData.name;
  tempElement.innerText = Math.round(weatherData.main.temp);
  descElement.innerText = weatherData.weather[0].description;

  weatherIconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
  );

  countryElement.setAttribute(
    "src",
    `https://flagsapi.com/${weatherData.sys.country}/flat/64.png`
  );

  humidityElement.innerText = `${weatherData.main.humidity}%`;
  windElement.innerText = `${weatherData.wind.speed} km/h`;

  if (imageUrl) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${imageUrl})`;
  } else {
    document.body.style.backgroundImage = defaultBackground;
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";

  weatherContainer.classList.remove("hide");
};

const showWeatherData = async (city) => {
  const formattedCity = city.trim();

  if (!formattedCity) {
    showError("Digite o nome de uma cidade para pesquisar.");
    return;
  }

  if (!hasConfiguredApiKeys()) {
    showError(
      "As chaves das APIs ainda não foram configuradas. Adicione suas chaves da OpenWeather e Unsplash no arquivo scripts.js para testar o projeto."
    );
    return;
  }

  try {
    setLoading(true);
    hideError();

    const weatherData = await getWeatherData(formattedCity);
    const imageUrl = await getUnsplashImage(formattedCity);

    updateWeatherInterface(weatherData, imageUrl);
  } catch (error) {
    console.error(error);
    document.body.style.backgroundImage = defaultBackground;

    showError(
      "Não foi possível encontrar dados para essa cidade. Verifique o nome digitado e tente novamente."
    );
  } finally {
    setLoading(false);
  }
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  showWeatherData(cityInput.value);
});
