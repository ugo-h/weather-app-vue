<template>
  <button>
    <svg
      width="72px"
      height="72px"
      viewBox="0 0 72 72"
      id="emoji"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="color" />
      <g id="hair" />
      <g id="skin" />
      <g id="skin-shadow" />
      <g id="line">
        <line
          x1="17.5"
          x2="54.5"
          y1="17.5"
          y2="54.5"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
        <line
          x1="54.5"
          x2="17.5"
          y1="17.5"
          y2="54.5"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </g>
    </svg>
  </button>
</template>

<script>
export default {
  name: "VBtnDelete",
};
</script>

<style scoped>
button {
  --size: 1rem;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  width: var(--size);
  height: var(--size);
}
svg {
  fill: red;
  width: var(--size);
  height: var(--size);
}
button:hover svg {
  fill: rgb(199, 0, 0);
}
</style>