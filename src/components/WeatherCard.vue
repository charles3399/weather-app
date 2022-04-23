<template>
  <div class="p-3 flex justify-center items-center">
      <figure :class="bg" class="p-2 rounded-xl 2xl:w-6/12 xl:w-6/12 lg:w-6/12 md:w-6/12 w-full shadow-2xl tracking-wide">
          <div class="text-center mb-3">
              <h3 class="text-xl font-bold tracking-wider">{{weatherData.city}}, {{weatherData.countryName}}</h3>
          </div>
          <div class="text-center mb-3">
            <h3 class="text-6xl font-bold">&#176;{{weatherData.temperature}}</h3>
            <p class="text-2xl"><i :class="main"></i> {{weatherData.weather_description}}</p>
            <p class="text-lg">Feels like: &#176;{{weatherData.feelslike}}</p>
          </div>
          <div class="text-center text-lg m-5 flex flex-row justify-center gap-8">
            <p>Highest: <span class="font-bold">&#176;{{weatherData.max_temperature}}</span></p>
            <p>Lowest: <span class="font-bold">&#176;{{weatherData.min_temperature}}</span></p>
          </div>
          <div class="text-center m-1 flex flex-row justify-center gap-8">
            <div>
                <h4 class="text-2xl font-bold">Sunrise</h4>
                <img class="mb-3" src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-sunrise-weather-tulpahn-outline-color-tulpahn.png"/>
                <p class="font-bold">{{weatherData.sunrise_time}}</p>
            </div>
            <div>
                <h4 class="text-2xl font-bold">Sunset</h4>
                <img class="mb-3" src="https://img.icons8.com/external-tulpahn-outline-color-tulpahn/64/000000/external-sunrise-weather-tulpahn-outline-color-tulpahn-1.png"/>
                <p class="font-bold">{{weatherData.sunset_time}}</p>
            </div>
          </div>
      </figure>
  </div>
</template>

<script>
import moment from 'moment'
import { ref, onMounted } from 'vue'

export default {
  name: 'WeatherCard',
  props: {
    weather: {
      type: Object
    }
  },
  setup(props) {
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
        main.value = 'fa-solid fa-cloud'
        bg.value = 'bg-gray-500 text-white'
      }
      if(weatherstatus.includes('Thunderstorm') || weatherstatus.includes('Rain')) {
        main.value = 'fa-solid fa-cloud-showers-heavy'
        bg.value = 'bg-gray-600 text-white'
      }
      if(weatherstatus.includes('Clear')) {
        main.value = 'fa-solid fa-sun'
        bg.value = 'bg-blue-500 text-white'
      }
      if(weatherstatus.includes('Snow')) {
        main.value = 'fa-solid fa-snowflake'
        bg.value = 'bg-slate-200 text-gray-500'
      }
      if(weatherstatus.includes('Haze') || weatherstatus.includes('Fog') || weatherstatus.includes('Mist')) {
        main.value = 'fa-solid fa-smog'
        bg.value = 'bg-gray-300 text-gray-700'
      }
      if(weatherstatus.includes('Dust')) {
        main.value = 'fa-solid fa-wind'
        bg.value = 'bg-orange-300 text-gray-200'
      }
    })

    return {
      bg,
      main,
      weatherData
    }
  }
}
</script>
