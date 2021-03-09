<template>
    <div class="Location-item">
        <button class="Location-container" v-on:click="$emit('setLocation')">
            <h4>{{ item.location }}</h4>
        </button>
        <v-btn-delete class="btn-delete" v-on:click="$emit('removeLocation')" />
    </div>
</template>

<script>
export default {
    name: 'LocationItem',
    props: ['item'],
    emits: ['setLocation']
}
</script>

<style scoped>
.Location-item{
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.Location-container{
    border: none;
    background: none;
    width: 80%;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 20px
}
.Location-container:hover{
    background: #f1faee;
}
.btn-delete{
    width: 20%;
}
.btn-delete:focus{
    outline-color: #777
}
</style>