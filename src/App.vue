<template>
  <div class="m-4">
    <Title />
    <div class="p-4 mt-1 text-center">
      <form @submit.prevent="getWeatherData">
        <input v-model="cityName" type="text" placeholder="Search a city" class="p-4 rounded-full w-3/6 shadow-xl">
      </form>
    </div>
    <div v-if="!loading">
      <div class="text-center p-2" v-if="cityFound == false">
        <h3 class="text-white font-bold text-4xl">There's no such city</h3>
      </div>
      <div v-else>
        <WeatherCard :weather="weatherData" />
      </div>
    </div>
    <div class="text-center p-2" v-else>
      <h3 class="text-white font-bold text-4xl">{{loadingMessage}} <i :class="icon"></i></h3>
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
    const icon = ref('fa-solid fa-cloud-sun-rain')
    const weatherData = ref([])
    const cityFound = ref(false)
    const cityName = ref(null)
    const apiKey = ref(process.env.VUE_APP_API_KEY)
    const loading = ref(true)
    const loadingMessage = ref('Ang buhay ay weather weather lang')

    const getWeatherData = async () => {
      try {
        loading.value = true
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=metric`)
        const data = await response.json()
        weatherData.value =  data
        loading.value = false
        cityFound.value = true
        loadingMessage.value = 'Searching city'
        icon.value = 'fa-solid fa-magnifying-glass-location'
      }
      catch(error) {
        alert(error.message)
        cityFound.value = false
      }
    }

    return {
      icon,
      weatherData,
      cityFound,
      cityName,
      apiKey,
      loading,
      loadingMessage,
      getWeatherData
    }
  }
}
</script>

<style>
</style>
