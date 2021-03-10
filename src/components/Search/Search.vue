<template>
  <div class="Search" ref="search">
    <v-btn-search disabled class="Search__icon" />
    <input
      class="Search__input"
      placeholder="Example: New York"
      v-model="value"
      @input="onChange"
      @focus="onFocus"
    />
    <ul class="Search__results" v-if="results">
      <li
        class="Search__result"
        v-for="result in results"
        :key="result.formatted"
        @click="() => onSelect(result)"
      >
        {{ result.formatted }}
      </li>
    </ul>
    <div class="Search__spinner" v-else-if="isLoading">
      <v-spinner size="sm" />
    </div>
  </div>
</template>

<script>
import { getLocationList } from "../../lib/api/GeocodingAPI";
export default {
  name: "Search",
  emits: ["select"],
  data() {
    return {
      value: "",
      timer: null,
      results: null,
      isLoading: false,
    };
  },
  mounted() {
    document.addEventListener("click", this.onClose);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.onClose);
  },
  methods: {
    onChange() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.isLoading = true;
        this.results = null;
        getLocationList(this.value, { language: "en" }).then((data) => {
          this.results = data;
        });
      }, 500);
    },
    onSelect(result) {
      this.$emit("select", result);
      this.onClose();
      this.value = "";
    },
    onClose() {
      this.results = null;
      this.isLoading = false;
    },
    onFocus() {
      if (this.value.trim().length > 1) this.onChange();
    },
  },
};
</script>

<style>
.Search {
  display: flex;
  margin-top: 3rem;
  position: relative;
  width: 350px;
}
.Search__icon {
  margin-right: 1rem;
}
.Search__input {
  width: 300px;
  padding: 0.5rem;
  border: #ccc solid 1px;
  border-radius: 20px;
}
.Search__input:focus {
  outline: none;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1);
}
.Search__results {
  left: 3rem;
  top: 1.5rem;
  z-index: 100;
  background: white;
  position: absolute;
  list-style: none;
  padding: 0;
  width: 270px;
  max-height: 300px;
  overflow: auto;
}
.Search__result {
  padding: 1rem;
  cursor: pointer;
}
.Search__result:hover {
  background: #666;
}
.Search__spinner {
  position: absolute;
  top: 50%;
  right: 0;
}
</style>