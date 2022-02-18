<template>
  <div class="m-4">
    <Title />
    <SearchCity />
    <WeatherCard />
  </div>
</template>

<script>
import Title from './components/Title.vue'
import SearchCity from './components/SearchCity.vue'
import WeatherCard from './components/WeatherCard.vue'

export default {
  name: 'App',
  components: {
    Title,
    SearchCity,
    WeatherCard
  }
}
</script>

<style>
</style>
