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
    const loadingMessage = ref('What\'s the weather like? Type a country, city, or town!')

    const getWeatherData = async () => {
      if(cityName.value == '' || cityName.value == null) {
        cityName.value = ''
        loadingMessage.value = 'What\'s the weather like? Type a country, city, or town!'
      }
      else {
        loading.value = true
        icon.value = 'fa-solid fa-magnifying-glass-location'
        loadingMessage.value = 'Searching...'
        cityName.value.trim().length
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
        if(response.status >= 200 && response.status <= 299) {
          const data = await response.data
          weatherData.value =  data
          loading.value = false
        }
        else {
          alert('No such city found or spelling error')
        }
      }
    }

    const changeUnit = async () => {
      if (cityName.value == '') {
        alert('Please type a city before changing unit of measurement')
      }
      else {
        loading.value = true

        unitMode.value === 'metric' ? [unitMode.value = 'imperial', unitText.value = 'F'] : [unitMode.value = 'metric', unitText.value = 'C']

        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
        const data = await response.data
        weatherData.value = data
        loadingMessage.value = 'Updating...'
        icon.value = 'fa-solid fa-temperature-half'
        loading.value = false
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