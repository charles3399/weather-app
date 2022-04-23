<template>
  <div class="m-4">
    <Title />
    <div class="px-1 py-4 mt-1 text-center">
      <form @submit.prevent="getWeatherData">
        <input v-model="cityName" type="text" placeholder="Search a city or location" class="pb-1 border-b-2 border-gray-500 outline-none focus:border-gray-700 2xl:w-3/6 xl:w-3/6 lg:w-3/6 md:w-3/6 w-full font-bold uppercase tracking-wider placeholder-white placeholder-opacity-50 text-center text-white bg-transparent">
      </form>
    </div>
      <p class="text-3xl font-bold text-white inline-block relative left-1/2 text-center cursor-pointer" v-if="weatherData != ''" @click="changeUnit">&nbsp;&deg;{{ unitText }}</p>
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
    const apiKey = ref(process.env.VUE_APP_KEY)
    const loading = ref(true)
    const loadingMessage = ref('Ang buhay ay weather weather lang')

    const getWeatherData = async () => {
      if(cityName.value == '' || cityName.value == null) {
        alert('Please input a city')
        location.reload()
      }
      else {
        loading.value = true
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
        if(response.status >= 200 && response.status <= 299) {
          const data = await response.json()
          weatherData.value =  data
          loadingMessage.value = 'Updating..'
          icon.value = 'fa-solid fa-magnifying-glass-location'
          loading.value = false
          console.log(data)
        }
        else {
          alert('No such city found or spelling error')
          location.reload()
        }
      }
    }

    const changeUnit = async () => {
      if (cityName.value == '') {
        alert('Please type a city before changing unit of measurement')
        location.reload()
      }
      else {
        loading.value = true

        unitMode.value === 'metric' ? [unitMode.value = 'imperial', unitText.value = 'F'] : [unitMode.value = 'metric', unitText.value = 'C']

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
        const data = await response.json()
        weatherData.value = data
        icon.value = 'fa-solid fa-temperature-half'
        loading.value = false
      }
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