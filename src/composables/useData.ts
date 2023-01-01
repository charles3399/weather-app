import { ref, watch } from 'vue'
import axios from 'axios'

export default function useData() {
    const icon = ref('fa-solid fa-cloud-sun-rain')
    const weatherData = ref([])
    const cityName = ref('')
    const unitMode = ref('metric')
    const unitText = ref('C')
    const apiKey = ref(process.env.VUE_APP_KEY)
    const loading = ref(true)
    const loadingMessage = ref('What\'s the weather look like? Type a country, city, or town!')

    const getWeatherData = () => {
      if(!cityName.value || !weatherData.value) {
        cityName.value = ''
        weatherData.value = []
      }
      else {
        setTimeout(() => {
          loading.value = true
          icon.value = 'fa-solid fa-magnifying-glass-location'
          loadingMessage.value = 'Searching...'
          cityName.value.trim().length

          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
            .then((response) => {
              setTimeout(() => {
                weatherData.value = response.data
                loading.value = false
              }, 1000);
            })
            .catch((error) => {
              setTimeout(() => {
                cityName.value = ''
                weatherData.value = []
                icon.value = ''
                loadingMessage.value = 'Sorry we can\'t find the place you\'re looking for...'
              }, 1000);
            })
        }, 2000);
      }
    }

    const changeUnit = () => {
      if(!cityName.value || !weatherData.value) {
        cityName.value = ''
        weatherData.value = []
      }
      else {
        setTimeout(() => {
          loading.value = true
          unitMode.value === 'metric' ? [unitMode.value = 'imperial', unitText.value = 'F'] : [unitMode.value = 'metric', unitText.value = 'C']
          loadingMessage.value = 'Updating...'

          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
            .then((response) => {
              weatherData.value = response.data
              icon.value = 'fa-solid fa-temperature-half'
              loading.value = false
            })
            .catch((error) => {
              cityName.value = ''
              weatherData.value = []
              loading.value = false
          })
        }, 100);
      }
    }

    watch(()=> cityName.value,
      () => {
        getWeatherData()
      },
      { deep: true }
    )

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