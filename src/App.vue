<template>
  <div class="m-4">
    <Title />
    <div class="p-4 mt-1 text-center">
      <input type="text" placeholder="Search a city" class="p-4 rounded-full w-3/6 shadow-xl">
    </div>
    <div v-if="!loading">
      <WeatherCard :weather="weatherData" />
    </div>
    <div class="text-center p-2" v-else>
      <h3 class="text-white font-bold text-4xl">{{ loadingMessage + '...' }}</h3>
    </div>
  </div>
</template>

<script>
import Title from './components/Title.vue'
import WeatherCard from './components/WeatherCard.vue'
import {ref} from 'vue'

export default {
  name: 'App',
  components: {
    Title,
    WeatherCard
  },
  setup() {
    const weatherData = ref([])
    const cityName = ref('guindulman')
    const apiKey = ref('fdd7b594a9c25f2b77bf2df3cb47f644')
    const baseURL = ref(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=metric`)
    const loading = ref(true)
    const loadingMessage = ref('Updating')

    const getWeatherData = async () => {
      loading.value = true
      const response = await fetch(baseURL.value)
      const data = await response.json()
      cityName.value = data
      weatherData.value = data
      loading.value = false
    }

    getWeatherData()

    return {
      weatherData,
      cityName,
      apiKey,
      baseURL,
      loading,
      loadingMessage,
      getWeatherData
    }
  }
}
</script>

<style>
</style>
