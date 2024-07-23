// Variáveis e seleçao de elementos
const apiKey = "SUA API";
const unsplashApiKey = "SUA API";
const apiCountryURL = "https://flagsapi.com/BE/flat/64.png";

const cityinput = document.querySelector("#city-input");
var searchBtn = document.getElementById("search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

// Adicione um elemento de erro
const errorElement = document.createElement("p");
errorElement.id = "error-message";
errorElement.style.color = "red";
errorElement.style.display = "none"; // Inicialmente escondido
weatherContainer.appendChild(errorElement);

// Funçoes
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const res = await fetch(apiWeatherURL);
    if (!res.ok) {
        throw new Error('Erro ao buscar dados do clima');
    }
    const data = await res.json();
    return data;
}

const getUnsplashImage = async (city) => {
    const apiUnsplashURL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}&orientation=landscape&per_page=1`;
    const res = await fetch(apiUnsplashURL);
    if (!res.ok) {
        throw new Error('Erro ao buscar imagem do Unsplash');
    }
    const data = await res.json();
    // Se encontrar resultados, retorne a URL da primeira imagem, caso contrário, retorne uma imagem padrão
    return data.results.length > 0 ? data.results[0].urls.regular : 'URL_DA_IMAGEM_PADRAO';
}

const showWeatherData = async (city) => {
    try {
        const data = await getWeatherData(city);
        const imageUrl = await getUnsplashImage(city);

        cityElement.innerText = data.name;
        tempElement.innerText = parseInt(data.main.temp);
        descElement.innerText = data.weather[0].description;
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
        humidityElement.innerText = `${data.main.humidity}%`;
        windElement.innerText = `${data.wind.speed}km/h`;

        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        weatherContainer.classList.remove("hide");
        errorElement.style.display = "none"; // Esconder mensagem de erro se estiver mostrando dados corretamente
    } catch (error) {
        console.error('Erro ao mostrar dados do clima ou imagem:', error);
        // Em caso de erro, definir imagem padrão e esconder container de clima
        document.body.style.backgroundImage = `url(URL_DA_IMAGEM_PADRAO)`;
        weatherContainer.classList.add("hide");
        // Mostrar mensagem de erro
        errorElement.innerText = "Erro: Não foi possível encontrar dados para essa entrada. Por favor, digite um nome válido de cidade, estado ou país.";
        errorElement.style.display = "block";
    }
}

// Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityinput.value;
    showWeatherData(city);
});

cityinput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city);
    }
});