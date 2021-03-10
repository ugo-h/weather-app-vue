<template>
    <div>
    <v-card class="weather-block" v-if="location && weather">
        <p class="weather__location card__text">{{ location.city }}</p>
        <div class="weather__temperature card__text">{{ weather.temp.c }} °c</div>
        <div class="group weather__description">
            <img class="weather__icon" v-bind:src="weather.icon" v-bind:alt="weather.summary" />
            <p class="weather__summary card__text">{{ weather.summary }}</p>
        </div>
    </v-card>
    <div v-else class="weather-block">
        <div class="weather__spinner"><v-spinner /></div>
    </div>
    </div>
</template>

<script>
import { getWeather } from '../lib/api/WeatherAPI';
export default {
    name: 'Weather',
    props: ['location'],
    data() {
        return {
            weather: null
        }
    },
    watch: {
        location: function() {
            if (this.location) {
                this.weather = null;
                getWeather(this.location.coordinates, { language: 'en' })
                    .then(data => this.weather = data);
            }
        }
    }
}
</script>

<style scoped>
.weather-block{
    width: 60%;
    position: relative;
    height: 300px;
    margin-right: 2rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.weather__description{
    display: flex;
    font-size: 1.4rem;
    color: #666;
    justify-content: center;
}
.weather__temperature{
    color: #666;
    font-size: 5rem;
}
.weather__spinner{
    top: 50%;
    left: 50%;
}
@media (max-width: 700px) {
  .weather-block{
    margin-right: 0;
    width: 90%;
    margin-bottom: 3rem;
  }
}
</style>