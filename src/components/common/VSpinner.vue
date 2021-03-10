<template>
  <div :class="spinnerClass"></div>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    size: String,
  },
  computed: {
    spinnerClass() {
      if (!this.size) return "Spinner";
      return `Spinner--${this.size}`;
    },
  },
};
</script>

<style>
.Spinner::before,
.Spinner--sm::before,
.Spinner--lg::before,
.Spinner--xl::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30px;
  height: 30px;
  margin-top: -15px;
  margin-left: -15px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-top-color: black;
  animation: spinner 0.7s linear infinite;
}

.Spinner--sm::before {
  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-left: -8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-top-color: black;
}
.Spinner--lg::before {
  width: 50px;
  height: 50px;
  margin-top: -25px;
  margin-left: -25px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: black;
}
.Spinner--xl::before {
  width: 10rem;
  height: 10rem;
  margin-top: -5rem;
  margin-left: -5rem;
  border: 1rem solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>