<template>
  <div class="p-3 flex justify-center">
      <figure class="p-2 border-4 border-white rounded-xl 2xl:w-6/12 xl:w-6/12 lg:w-6/12 md:w-6/12 w-full shadow-2xl bg-transparent text-white tracking-wide">
          <div class="text-center mb-3">
              <h3 class="text-xl font-bold tracking-wider">{{weatherData.city}}, {{weatherData.countryName}}</h3>
          </div>
          <div class="text-center mb-3">
            <h3 class="text-6xl font-bold">{{weatherData.temperature}}&#176;C</h3>
            <p class="text-2xl"><i :class="main"></i> {{weatherData.weather_description}}</p>
            <p class="text-lg">Feels like: {{weatherData.feelslike}}&#176;C</p>
          </div>
          <div class="text-center text-lg m-5 flex flex-row justify-center gap-8">
            <p>Highest: <span class="font-bold">{{weatherData.max_temperature}}&#176;C</span></p>
            <p>Lowest: <span class="font-bold">{{weatherData.min_temperature}}&#176;C</span></p>
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

export default {
  name: 'WeatherCard',
  props: ['weather'],
  data() {
    return {
      main: '',
      weatherData: {
        countryName: this.weather.sys.country,
        city: this.weather.name,
        feelslike: Math.round(this.weather.main.feels_like * 10) / 10,
        temperature: Math.round(this.weather.main.temp * 10) / 10,
        weather_description: this.weather.weather[0].description,
        max_temperature: Math.round(this.weather.main.temp_max * 10) / 10,
        min_temperature: Math.round(this.weather.main.temp_min * 10) / 10,
        sunrise_time: moment(this.weather.sys.sunrise * 1000).format('LT'),
        sunset_time: moment(this.weather.sys.sunset * 1000).format('LT')
      }
    }
  },
  mounted() {
    let weatherstatus = this.weather.weather[0].main
    if(weatherstatus.includes('Clouds')) {
      this.main = 'fa-solid fa-cloud'
    }
    if(weatherstatus.includes('Thunderstorm') || weatherstatus.includes('Rain')) {
      this.main = 'fa-solid fa-cloud-showers-heavy'
    }
    if(weatherstatus.includes('Clear')) {
      this.main = 'fa-solid fa-sun'
    }
    if(weatherstatus.includes('Snow')) {
      this.main = 'fa-solid fa-snowflake'
    }
    if(weatherstatus.includes('Haze')) {
      this.main = 'fa-solid fa-smog'
    }
  }
}
</script>

<style scoped>
</style>
