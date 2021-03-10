<template>
  <li class="WeatherCard card">
    <span class="WeatherCard__control">
      <v-btn-update @click="$emit('update', weather)" />
      <v-btn-delete @click="$emit('delete')" />
    </span>
    <div class="WeatherCard__content">
      <h3 class="WeatherCard__location">{{ weather.location }}</h3>
      <h1 class="WeatherCard__temperature">{{ weather.temp.c }} °c</h1>
      <span class="WeatherCard__description">
        {{ weather.summary }}
        <img
          class="WeatherCard__img"
          :src="weather.icon"
          :alt="weather.summary"
        />
      </span>
      <ul class="WeatherCard__info">
        <li className="WeatherCard__info__item">
          Feels like: {{ this.weather.feelslike.c }} °c
        </li>
        <li className="WeatherCard__info__item">{{ wind }}</li>
        <li className="WeatherCard__info__item">
          Humidity: {{ this.weather.humidity }}%
        </li>
      </ul>
      <h5>
        Last Update:
        {{ new Date(this.weather.date).toLocaleString("ru-RU") }}
      </h5>
    </div>
  </li>
</template>

<script>
export default {
  name: "WeatherCard",
  props: ["weather"],
  emits: ["delete", "update"],
  computed: {
    wind: function () {
      return `Wind: ${this.weather.wind.vel}m/s (${this.weather.wind.dir})`;
    },
  },
};
</script>

<style>
.WeatherCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 240px;
  width: 90%;
  margin: 1rem;
}
.WeatherCard__control {
  align-self: flex-end;
  position: relative;
  right: 0;
  width: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.WeatherCard__description {
  display: flex;
  font-size: 1.3rem;
  color: #666;
  align-items: center;
  justify-content: center;
}
.WeatherCard__temperature {
  color: #666;
  font-size: 3rem;
}
.WeatherCard__info {
  text-align: left;
  padding: 0;
  list-style: none;
}
.WeatherCard__info__item {
  margin: 1rem 0;
}
@media (max-width: 700px) {
  .WeatherCard {
    max-width: unset;
  }
}
</style>