<template>
    <div>
        <h4 v-on:click="$emit(setLocation)">{{ item.location }}</h4>
        <v-btn-delete />
    </div>
</template>

<script>
export default {
    name: 'LocationItem',
    props: ['item'],
    emits: ['setLocation']
}
</script>

<style>
div{
    display: flex;
    justify-content: space-between;
}
</style>