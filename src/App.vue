<template>
  <div class="container">
    <Weather v-bind:location="location" />
    <LocationsSidebar v-on:setLocation="setLocation" />
  </div>
</template>

<script>
import Weather from './components/Weather';
import LocationsSidebar from './components/LocationsSidebar';
import { getLocation } from './lib/api/Geolocation/Geolocation';
export default {
  name: 'App',
  components: {
    Weather,
    LocationsSidebar
  },
  data() {
    return {
      location: null
    }
  },
  mounted() {
    getLocation().then(data => this.location = data)
  },
  methods: {
    setLocation({ location, coordinates}) {
      this.location = { city: location, coordinates }
    }
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
body{
  margin: 0;
}
#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  align-items: center;
  flex-direction: column;
  background:#faf9f9;
  min-height: 100vh;
}
.container{
  margin-top: 3rem;
  width: 100%;
  max-width: 650px;
  display: flex;
  align-items: center;
}
@media (max-width: 700px) {
  .container{
    flex-direction: column;
  }
}
</style>
