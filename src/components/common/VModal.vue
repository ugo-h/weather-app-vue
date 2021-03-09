<template>
    <div class="backdrop" v-show="showModal" v-on:click="$emit('close')"></div>
    <div class="modal" v-show="showModal">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: ['showModal'],
    emits: ['close']
}
</script>

<style scoped>
    .backdrop{
        position: fixed;
        z-index: 50;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.1);
    }
    .modal{
        position: fixed;
        z-index: 100;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
    }
</style>