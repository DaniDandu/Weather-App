import { apiKey } from './config.js';

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const closeMenu = document.querySelector('.close-menu');
    const menuSidebar = document.querySelector('.menu-sidebar');
    const searchIcon = document.querySelector('.search-icon');
    const inputContainer = document.querySelector('.input-container');
    const headerTop = document.querySelector('.header-top');
    const searchBtn = document.querySelector('.search-btn');
    const cityInput = document.querySelector('.city-input');
    const weatherInfoSection = document.querySelector('.weather-info')
    const cityTxt = document.querySelector('.country-txt');
    const tempTxt = document.querySelector('.temp-txt');
    const conditionTxt = document.querySelector('.condition-txt');
    const feelsTemp = document.querySelector('.feels-value-txt');
    const cloudsValueTxt = document.querySelector('.clouds-value-txt');
    const humidityValueTxt = document.querySelector('.humidity-value-txt');
    const windValueTxt = document.querySelector('.wind-value-txt');
    const weatherSummaryImg = document.querySelector('.weather-summary-img');
    const currentDateTxt = document.querySelector('.current-date-txt')


    // Funcționalitate meniu
    if (menuIcon) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            menuSidebar.classList.add('active');
        });
    }

    // Închidere meniu
    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            menuSidebar.classList.remove('active');
        });
    }

    // Funcționalitate search
    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            inputContainer.classList.add('active');
            headerTop.style.opacity = '0';
            headerTop.style.pointerEvents = 'none';
        });
    }

    // Închidere search la click în afară
    document.addEventListener('click', (e) => {
        // Închide meniul
        if (!menuSidebar.contains(e.target) && !menuIcon.contains(e.target)) {
            menuSidebar.classList.remove('active');
        }

        // Închide search bar
        if (!inputContainer.contains(e.target) && !searchIcon.contains(e.target)) {
            inputContainer.classList.remove('active');
            headerTop.style.opacity = '1';
            headerTop.style.pointerEvents = 'all';
        }
    });

    // Închidere search la submit
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            inputContainer.classList.remove('active');
            headerTop.style.opacity = '1';
            headerTop.style.pointerEvents = 'all';
        });
    }

    // Închidere meniu la resize
    window.addEventListener('resize', () => {
        menuSidebar.classList.remove('active');
        inputContainer.classList.remove('active');
        headerTop.style.opacity = '1';
        headerTop.style.pointerEvents = 'all';
    });

    searchBtn.addEventListener('click', () => {
        if (cityInput.value.trim() != '') {
            updateWeatherInfo(cityInput.value)
            cityInput.value = ''
        }
    })

    cityInput.addEventListener('keydown', (event) => {
        if (event.key == 'Enter' &&
            cityInput.value.trim() != ''
        ) {
            updateWeatherInfo(cityInput.value)
            cityInput.value = ''
        }
    })


    async function getFetchData(endPoint, city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
    
        const response = await fetch(apiUrl);
    
        return response.json();
    }

    function getWeatherIcon(id) {
        if (id <= 232) return 'thunderstorm.svg'
        if (id <= 321) return 'drizzle.svg'
        if (id <= 531) return 'rain.svg'
        if (id <= 622) return 'snow.svg'
        if (id <= 781) return 'atmosphere.svg'
        if (id <= 800) return 'clear.svg'
        else return 'clouds.svg'
    }
    
    async function updateWeatherInfo(city) {
        const weatherData = await getFetchData('weather', city);
        console.log(weatherData);
    
        const {
            name: country,
            main: { temp, temp_max, temp_min, feels_like, humidity}, 
            clouds: { all },
            weather: [{ id, main }],
            wind: { speed },
        } = weatherData;
    
        cityTxt.textContent = country
        tempTxt.textContent = Math.round(temp) + ' °C'
        conditionTxt.textContent = main
        feelsTemp.textContent = Math.round(feels_like) + ' °C'
        humidityValueTxt.textContent = humidity + '%'
        cloudsValueTxt.textContent = all + '%'
        windValueTxt.textContent = Math.round(speed) + ' km/h'

        weatherSummaryImg.src = `/assets/weather/${getWeatherIcon(id)}`
    
    }
    
    
});

