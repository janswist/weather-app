<template lang="pug">
div
  h1 Welcome to the weather report app
  
  div(v-if="prompt == 'granted'")
    h2 The weather today is:
    
    div(v-if='fetching')
      p Fetching crispy fresh data...please wait
    
    div(v-else)
      img(:src='weatherIconURL')
      p#temp {{weather.tempInCelsius}} &deg;C
      p {{weather.weatherDescription}}
  
  div(v-else-if="prompt == 'denied'")
    p Can't fetch any weather data - please allow geolocation to make it great again
  
  div(v-else-if="prompt == 'prompt'")
    p To provide weather data we need your location. Please grant us access

</template>

<script>
import { getData, extractDataFromResponse } from '@/httpClient.js'

export default {
  name: 'WeatherComp',

  mounted () {
    this.handlePermission()
  },

  computed: {
    weatherIconURL: vm => `https:${vm.weather.weatherIcon}`
  },

  data () {
    return {
      prompt: 'prompt',
      fetching: false,
      weather: {
        tempInCelsius:      null,
        weatherIcon:        '',
        weatherDescription: ''
      }
    }
  },

  methods: {
    async handlePermission () {
      const result = await navigator.permissions.query({name:'geolocation'})
      this.prompt = result.state
    
      const getPositionOrAsk = () => navigator.geolocation.getCurrentPosition(
        position => {
          this.prompt = 'granted'
          const { coords: { latitude, longitude }} = position
          this.queryWeather(latitude, longitude)
        },
        () => {
          handleDenial()
        })

      const handleDenial = () => {
        this.prompt = 'denied'
        alert('Weather data can not be retrieved due to denied location access')
      }

      const action = {
        prompt:  () => getPositionOrAsk(),
        granted: () => getPositionOrAsk(),
        denied:  () => handleDenial()
      }
      action[result.state]()
    },

    async queryWeather (latitude, longitude) {
      this.fetching = true

      try {
        const response = await getData(
          `https://api.weatherapi.com/v1/current.json`
           + `?key=${import.meta.env.VITE_WEATHERAPI_KEY}` // ofc, .env should never be pushed to the repo, but for simplicity it is here
           + `&q=${latitude},${longitude}`
        )

        const { 
          current: { 
            temp_c: tempInCelsius,
            condition: {
              icon: weatherIcon,
              text: weatherDescription
            }}} = await extractDataFromResponse(response) //await response.json()

        this.setWeatherData({tempInCelsius, weatherIcon, weatherDescription})
        
      } catch (error) {
        alert(`There was an error: ${error}. Please refresh the page.`)
        // we could also add more checks like navigator.onLine...
      }

      this.fetching = false
    },

    setWeatherData (weatherData) {
      this.weather = weatherData
    }
  }
}

</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#temp {
  margin: 0;
  font-size: 100px
}
</style>
