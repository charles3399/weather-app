import moment from 'moment'
import { ref, onMounted } from 'vue'

export default function useWeatherData(props: { weather: any }) {
  const bg = ref('')
  const main = ref('')
  const weather = props.weather

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
    const weatherstatus = weather.weather[0].main

    if(weatherstatus.includes('Clouds')) {
      cardDesign('fa-solid fa-cloud text-gray-700', 'bg-gray-500 text-white')
    }
    if(weatherstatus.includes('Thunderstorm') || weatherstatus.includes('Rain')) {
      cardDesign('fa-solid fa-cloud-showers-heavy text-gray-300', 'bg-gray-600 text-white')
    }
    if(weatherstatus.includes('Clear')) {
      cardDesign('fa-solid fa-sun text-yellow-400', 'bg-blue-500 text-white')
    }
    if(weatherstatus.includes('Snow')) {
      cardDesign('fa-solid fa-snowflake', 'bg-white')
    }
    if(weatherstatus.includes('Haze') || weatherstatus.includes('Fog') || weatherstatus.includes('Mist')) {
      cardDesign('fa-solid fa-smog', 'bg-gray-400 text-gray-800')
    }
    if(weatherstatus.includes('Dust')) {
      cardDesign('fa-solid fa-wind', 'bg-yellow-600 text-gray-800')
    }
  })

  return {
    bg,
    main,
    weatherData
  }
}