<template>
  <div :class="classObject">
    <div class="flex weather-card text-black mb-3 animate__animated animate__bounceIn">
      <input placeholder="Input your city"
             class="outline-0 border-0 rounded p-1 w-full"
             @change="onLocationChange"
             @keyup.enter="onClickFind"
             value="Ho Chi Minh"/>
      <button @click="onClickFind"
              class="ml-2 bg-blue-400 rounded px-3 text-white"
      >Find</button>
    </div>
    <div v-if="weatherResult"
         class="flex flex-col justify-center items-center weather-card animate__animated animate__flipInX">
      <h1 class="text-center text-3xl mb-4">{{weatherResult.address}}</h1>
      <img :src="required('./src/assets/images/' + weatherResult.currentConditions.icon + '.png')" :alt="weatherResult.currentConditions.icon"/>
      <p class="mt-4 text-lg text-center">Timezone: {{weatherResult.timezone}}</p>

    </div>

    <div v-if="weatherResult" class="weather-card mt-4 flex justify-around   animate__animated animate__flipInX">
      <div class="flex justify-center items-center">
        <img src="/src/assets/images/001-warm.png" alt="temp"/>
        <span class="pl-2 text-2xl">
          {{weatherResult.currentConditions.temp}}℃
        </span>
      </div>
      <div class="flex justify-center items-center">
        <img src="/src/assets/images/002-humidity.png" alt="temp"/>
        <span class="pl-2 text-2xl">
          {{weatherResult.currentConditions.humidity}}%
        </span>
      </div>
      <div class="flex justify-center items-center">
        <img src="/src/assets/images/003-windy.png" alt="temp"/>
        <span class="pl-2 text-2xl">
          {{weatherResult.currentConditions.windspeed}}mph
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WeatherCard",
  data() {
    return {
      weatherResult: null,
      vmLocation: 'Ho Chi Minh'
    }
  },
  computed: {
    classObject: function () {
      return {
        ['bg-' + this.weatherResult?.currentConditions.icon]: true,
        bg: true,
        ['weather-card-wrapper']: true
      }
    }
  },
  mounted: function () {
    this.fetchData();
  },
  methods: {
    fetchData: function (locale) {
      axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locale || this.vmLocation}`, {
        params: {
          unitGroup: 'metric',
          key: 'F5L63DV845CY9AZG2AHKYMUGL',
          contentType: 'json'
        }
      }).then((res) => {
        this.weatherResult = res.data;
      })
    },
    onClickFind: function () {
      this.fetchData()
    },
    onLocationChange: function (e) {
      this.vmLocation = e.target.value;
    }
  }
}


</script>

<style scoped>

</style>