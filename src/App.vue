<template>
  <div class="m-4">
    <Title />
    <div class="px-1 py-4 mt-1 text-center">
      <form @submit.prevent="getWeatherData">
        <input v-model="cityName" type="text" placeholder="Search a city" class="p-4 rounded-full 2xl:w-3/6 xl:w-3/6 lg:w-3/6 md:w-3/6 w-full shadow-xl">
      </form>
    </div>
    <div class="text-center p-1">
        <i class="text-2xl text-white fa-solid fa-temperature-half cursor-pointer" @click="changeUnit">&nbsp;{{ unitText }}</i>
    </div>
    <div v-if="!loading">
      <WeatherCard :weather="weatherData" />
    </div>
    <div class="text-center p-2" v-else>
      <h3 class="text-white font-bold 2xl:text-4xl xl:text-4xl lg:text-xl text-lg">{{loadingMessage}} <i :class="icon"></i></h3>
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
    const cityName = ref(null)
    const unitMode = ref('metric')
    const unitText = ref('C')
    const apiKey = ref('fdd7b594a9c25f2b77bf2df3cb47f644')
    const loading = ref(true)
    const loadingMessage = ref('Ang buhay ay weather weather lang')

    const getWeatherData = async () => {
      try {
        loading.value = true
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
        if(response.status >= 200 && response.status <= 299) {
          const data = await response.json()
          weatherData.value =  data
          loading.value = false
          loadingMessage.value = 'Updating..'
          icon.value = 'fa-solid fa-magnifying-glass-location'
        }
        else {
          alert('No such city found')
          location.reload()
        }
      }
      catch(error) {
        alert(error.message)
      }
    }

    const changeUnit = async () => {
      loading.value = true

      unitMode.value === 'metric' ? [unitMode.value = 'imperial', unitText.value = 'F'] : [unitMode.value = 'metric', unitText.value = 'C']

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
      const data = await response.json()
      weatherData.value = data
      icon.value = 'fa-solid fa-temperature-half'
      loading.value = false
    }

    return {
      icon,
      weatherData,
      cityName,
      unitMode,
      unitText,
      apiKey,
      loading,
      loadingMessage,
      getWeatherData,
      changeUnit
    }
  }
}
</script>

<style>
</style>
