<template>
  <div class="m-4">
    <Title />
    <div class="px-1 py-4 mt-1 text-center">
      <form @submit.prevent="getWeatherData">
        <input v-model="cityName" type="text" placeholder="Search a city or location" class="pb-1 border-b-2 border-gray-500 outline-none focus:border-gray-700 2xl:w-3/6 xl:w-3/6 lg:w-3/6 md:w-3/6 w-full font-bold uppercase tracking-wider placeholder-white placeholder-opacity-50 text-center text-white bg-transparent">
      </form>
    </div>
      <p class="text-3xl inline-block relative font-bold text-white left-1/2 cursor-pointer" @click="changeUnit">&deg;{{ unitText }}</p>
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
import useData from './composables/useData'

export default {
  name: 'App',
  components: {
    Title,
    WeatherCard
  },
  setup() {
    const {
      icon,
      weatherData,
      cityName,
      unitMode,
      unitText,
      loading,
      loadingMessage,
      getWeatherData,
      changeUnit
    } = useData()

    return {
      icon,
      weatherData,
      cityName,
      unitMode,
      unitText,
      loading,
      loadingMessage,
      getWeatherData,
      changeUnit
    }
  }
}
</script>