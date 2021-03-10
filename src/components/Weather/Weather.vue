<template>
  <div class="Container">
    <Search @select="add" />
    <ul v-if="weatherItems.length > 0" class="Weather">
      <WeatherCard
        v-for="(weatherItem, index) in weatherItems"
        :weather="weatherItem"
        :key="weatherItem.coordinates.toString() + weatherItem.date"
        @delete="() => deleteItem(index)"
        @update="(item) => update(index, item)"
      />
    </ul>
  </div>
</template>

<script>
import WeatherCard from "./WeatherCard";
import Search from "../Search/Search";
import { getLocation } from "../../lib/api/Geolocation/Geolocation";
import { getStringFromCoordinates } from "../../lib/api/GeocodingAPI";
import { getWeather } from "../../lib/api/WeatherAPI";
import storage from "../../lib/api/localStorage";
export default {
  name: "Weather",
  components: {
    WeatherCard,
    Search,
  },
  data() {
    return {
      weatherItems: [],
    };
  },
  async mounted() {
    const saved = storage.getLocations();
    const locationData = await getLocation();
    const location = await getStringFromCoordinates(locationData.coordinates, {
      language: "en",
    });
    if (saved)
      this.weatherItems = saved.filter((item) => location !== item.location);
    this.getWeatherByLocation({ ...locationData, location });
  },
  methods: {
    getWeatherByLocation(data) {
      const index = this.weatherItems.findIndex(
        (item) => item.location === data.location
      );
      if (index > -1) {
        this.update(index, data);
        return;
      }
      getWeather(data.coordinates, { language: "en" }).then((weatherItem) => {
        const { location, coordinates } = data;
        const date = Date.now();
        this.weatherItems.push({ ...weatherItem, location, coordinates, date });
        storage.saveLocations(this.weatherItems);
      });
    },
    add(data) {
      this.getWeatherByLocation(data);
    },
    update(index, { coordinates, location }) {
      getWeather(coordinates).then((data) => {
        const date = Date.now();
        this.weatherItems.splice(index, 1, {
          ...data,
          location,
          coordinates,
          date,
        });
        storage.saveLocations(this.weatherItems);
      });
    },
    deleteItem(index) {
      this.weatherItems.splice(index, 1);
      storage.saveLocations(this.weatherItems);
    },
  },
};
</script>

<style>
.Weather {
  margin-top: 2rem;
  max-width: 900px;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
}
.Container {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>