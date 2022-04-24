import moment from 'moment'
import { ref, onMounted } from 'vue'

export default function useWeatherData(props) {
    const bg = ref('')
    const main = ref('')
    const tempConvert = (temp) => {
      return Math.round(temp * 10) / 10
    }
    const weatherData = ref({
      countryName: props.weather.sys.country,
      city: props.weather.name,
      feelslike: tempConvert(props.weather.main.feels_like),
      temperature: tempConvert(props.weather.main.temp),
      weather_description: props.weather.weather[0].description,
      max_temperature: tempConvert(props.weather.main.temp_max),
      min_temperature: tempConvert(props.weather.main.temp_min),
      sunrise_time: moment.utc(props.weather.sys.sunrise, 'X').add(props.weather.timezone, 'seconds').format('LT'),
      sunset_time: moment.utc(props.weather.sys.sunset, 'X').add(props.weather.timezone, 'seconds').format('LT')
    })

    onMounted(() => {
      let weatherstatus = props.weather.weather[0].main
      if(weatherstatus.includes('Clouds')) {
        main.value = 'fa-solid fa-cloud text-gray-700'
        bg.value = 'bg-gray-500 text-white'
      }
      if(weatherstatus.includes('Thunderstorm') || weatherstatus.includes('Rain')) {
        main.value = 'fa-solid fa-cloud-showers-heavy text-gray-300'
        bg.value = 'bg-gray-600 text-white'
      }
      if(weatherstatus.includes('Clear')) {
        main.value = 'fa-solid fa-sun text-yellow-400'
        bg.value = 'bg-blue-500 text-white'
      }
      if(weatherstatus.includes('Snow')) {
        main.value = 'fa-solid fa-snowflake'
        bg.value = 'bg-slate-200 text-gray-500'
      }
      if(weatherstatus.includes('Haze') || weatherstatus.includes('Fog') || weatherstatus.includes('Mist')) {
        main.value = 'fa-solid fa-smog'
        bg.value = 'bg-gray-400 text-gray-800'
      }
      if(weatherstatus.includes('Dust')) {
        main.value = 'fa-solid fa-wind'
        bg.value = 'bg-yellow-600 text-gray-800'
      }
    })

    return {
      bg,
      main,
      weatherData
    }
}