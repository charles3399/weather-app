<template>
  <div class="p-3 flex justify-center">
      <figure class="p-2 border-4 border-white rounded-xl w-6/12 shadow-2xl bg-transparent text-white tracking-wide">
        <span class="float-right text-2xl font-bold cursor-pointer"><i class="fa-solid fa-gear"></i></span>
          <div class="text-center mb-3">
              <h3 class="text-xl font-bold tracking-wider">{{weatherData.city}}, {{weatherData.countryName}}</h3>
          </div>
          <div class="text-center mb-3">
            <h3 class="text-6xl font-bold">{{weatherData.temperature}}&#176;C</h3>
            <p class="text-2xl">{{weatherData.weather_description}}</p>
          </div>
          <div class="text-center text-lg m-5 flex flex-row justify-center gap-8">
            <p>Highest: <span class="font-bold">{{weatherData.max_temperature}}&#176;C</span></p>
            <p>Lowest: <span class="font-bold">{{weatherData.min_temperature}}&#176;C</span></p>
          </div>
          <div class="text-center m-2 flex flex-row justify-center gap-8">
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
      weatherData: {
        countryName: this.weather.sys.country,
        city: this.weather.name,
        temperature: Math.round(this.weather.main.temp * 10) / 10,
        weather_description: this.weather.weather[0].description,
        max_temperature: Math.round(this.weather.main.temp_max * 10) / 10,
        min_temperature: Math.round(this.weather.main.temp_min * 10) / 10,
        sunrise_time: moment(this.weather.sys.sunrise * 1000).format('LT'),
        sunset_time: moment(this.weather.sys.sunset * 1000).format('LT')
      }
    }
  }
}
</script>

<style scoped>
</style>
