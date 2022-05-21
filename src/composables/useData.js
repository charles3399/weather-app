import { ref } from 'vue'
import axios from 'axios'

export default function useData() {
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
      }
      else {
        loading.value = true
        cityName.value.trim().length
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey.value}&units=${unitMode.value}`)
        if(response.status >= 200 && response.status <= 299) {
          const data = await response.data
          weatherData.value =  data
          loadingMessage.value = 'Searching...'
          icon.value = 'fa-solid fa-magnifying-glass-location'
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