<template>
  <Weather />
</template>

<script>
import Weather from "./components/Weather/Weather";
export default {
  name: "App",
  components: {
    Weather,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
body {
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
  background: #faf9f9;
  min-height: 100vh;
}
</style>
