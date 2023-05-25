import moment from 'moment'
import { ref, onMounted } from 'vue'

export default function useWeatherData({ weather }: {weather: any}) {
  const bg = ref('')
  const main = ref('')

  const tempConvert = (temp: number) => {
    return Math.round(temp * 10) / 10
  }

  const cardDesign = (mainColor: string, bgColor: string) => {
    main.value = mainColor
    bg.value = bgColor
  }

  const weatherData = ref({
    countryName: weather.sys.country,
    city: weather.name,
    feelslike: tempConvert(weather.main.feels_like),
    temperature: tempConvert(weather.main.temp),
    weather_description: weather.weather[0].description,
    max_temperature: tempConvert(weather.main.temp_max),
    min_temperature: tempConvert(weather.main.temp_min),
    sunrise_time: moment.utc(weather.sys.sunrise, 'X').add(weather.timezone, 'seconds').format('LT'),
    sunset_time: moment.utc(weather.sys.sunset, 'X').add(weather.timezone, 'seconds').format('LT')
  })

  onMounted(() => {
    const weatherStatus = weather.weather[0].main

    switch (weatherStatus) {
      case 'Clouds':
        cardDesign('fa-solid fa-cloud text-gray-700', 'bg-gray-500 text-white')
        break
      case 'Thunderstorm':
      case 'Rain':
        cardDesign('fa-solid fa-cloud-showers-heavy text-gray-300', 'bg-gray-600 text-white')
        break
      case 'Dust':
        cardDesign('fa-solid fa-wind', 'bg-yellow-600 text-gray-800')
        break
      case 'Snow':
        cardDesign('fa-solid fa-snowflake', 'bg-white')
        break
      case 'Haze':
      case 'Fog':
      case 'Mist':
        cardDesign('fa-solid fa-smog', 'bg-gray-400 text-gray-800')
        break;
      default:
        // Clear
        cardDesign('fa-solid fa-sun text-yellow-400', 'bg-blue-500 text-white')
    }
  })

  return {
    bg,
    main,
    weatherData
  }
}