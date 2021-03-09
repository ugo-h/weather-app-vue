<template>
    <div className="Weather-block" v-if="location && weather">
        <p className="weather__location card__text">{{ location.city }}</p>
        <div className="weather__temperature card__text">{{ weather.temp.c }} °c</div>
        <div className="group weather__description">
            <img className="weather__icon" v-bind:src="weather.icon" v-bind:alt="weather.summary" />
            <p className="weather__summary card__text">{{ weather.summary }}</p>
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
                getWeather(this.location.coordinates, 'en')
                    .then(data => this.weather = data);
            }
        }
    }
}
</script>

<style scoped>
.Weather-block{
    width: 70%;
    max-height: 300px;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas: "location date"
                         "temperature time"
                         "temperature items"
                         "summary items";
    align-items: center;
    justify-content: center;
}
.weather__description{
    display: flex;
    grid-column: 1;
    grid-row: 4;
    grid-area: summary;
    font-size: 1.4rem;
    color: #666;
    justify-content: center;
}
.weather__temperature{
    color: #666;
    font-size: 5rem;
    grid-area: temperature;
}

@media(max-width: 900px){
    .weather{
        margin: 0;
        width: 90%;
        max-width: 500px;
        justify-items: center;
        height: auto;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: auto;
        grid-template-areas: "location date"
                            "time time"
                            "temperature temperature"
                            "summary summary"
                            "items items"
    }
    .main-weather{
        flex-flow: column;
    }
    .weather__location{
        font-size: 0.8rem;
    }
    .weather__temperature{
        text-align: center;
        margin-top: 1rem;
    }

}
</style>