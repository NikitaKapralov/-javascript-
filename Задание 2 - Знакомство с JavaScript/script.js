async function getCurrentWeatherByCity(city) {
    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=da173a104fc8427690d173724252212&q=${city}&aqi=no`)
    const currentWeather = await data.json()
    console.log(currentWeather)
    return currentWeather
}

async function getForecastByCity(city) {
    const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=da173a104fc8427690d173724252212&q=${city}&days=1&aqi=no&alerts=no`)
    const forecast = await data.json()
    console.log(forecast)
    return forecast
}

const locationInput = document.querySelector('.location-input')
const locationButton = document.querySelector('.location-button')


locationButton.addEventListener('click', async () => {
    const locationInputValue = locationInput.value

        const currentWeather = await getCurrentWeatherByCity(locationInputValue)

        const currentWeatherIcon = `https:${currentWeather.current.condition.icon}`
        const currentWeatherTemperature = currentWeather.current.temp_c
        const currentWeatherStatus = currentWeather.current.condition.text

        resetWeatherApp()
        renderCurrentWeather(currentWeatherIcon, currentWeatherTemperature, currentWeatherStatus)

        const forecast = await getForecastByCity(locationInputValue)
        renderForecast(forecast.forecast.forecastday[0].hour)
})

function renderCurrentWeather(iconSrc, temperature, status) {
    const currentWeatherEl = document.querySelector('.current-weather')
    
    currentWeatherEl.innerHTML = ''
    
    const currentWeatherIconEl = document.createElement('img')
    currentWeatherIconEl.setAttribute('class', "current-weather-icon")
    currentWeatherIconEl.setAttribute('src', iconSrc)
    currentWeatherIconEl.setAttribute('alt', status) 
    
    const currentWeatherTemperatureEl = document.createElement('p')
    currentWeatherTemperatureEl.setAttribute('class', "current-weather-temperature")
    currentWeatherTemperatureEl.innerHTML = `${temperature}°C`
    
    const currentWeatherStatusEl = document.createElement('p')
    currentWeatherStatusEl.setAttribute('class', "current-weather-status")
    currentWeatherStatusEl.innerHTML = status
    
    currentWeatherEl.appendChild(currentWeatherIconEl)
    currentWeatherEl.appendChild(currentWeatherTemperatureEl)
    currentWeatherEl.appendChild(currentWeatherStatusEl)
}

function createForecastElement(iconSrc, time, temperature) {
    const forecastElement = document.createElement('div')
    forecastElement.setAttribute('class', "forecast-element")
    
    const forecastTime = document.createElement('p')
    forecastTime.setAttribute('class', "forecast-time")
    forecastTime.innerHTML = time.slice(11)
    
    const forecastIcon = document.createElement('img')
    forecastIcon.setAttribute('class', "forecast-icon")
    forecastIcon.setAttribute('src', `https:${iconSrc}`)
    
    const forecastTemperature = document.createElement('p')
    forecastTemperature.setAttribute('class', "forecast-temperature")
    forecastTemperature.innerHTML = temperature
    
    forecastElement.appendChild(forecastTime)
    forecastElement.appendChild(forecastIcon)
    forecastElement.appendChild(forecastTemperature)

return forecastElement
}

function renderForecast(forecast) {
    const forecastContainer = document.querySelector(".forecast")

    forecast.forEach(forecastItem => {
        const forecastElement = createForecastElement(forecastItem.condition.icon, forecastItem.time, forecastItem.temp_c)
        forecastContainer.appendChild(forecastElement)
    })
}

function resetWeatherApp() {
    const currentWeather = document.querySelector('.current-weather')
    currentWeather.innerHTML = ''

    const forecastContainer = document.querySelector(".forecast")
    forecastContainer.innerHTML = ''
}

