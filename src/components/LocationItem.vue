<template>
    <div>
        <h4 v-on:click="$emit('setLocation')">{{ item.location }}</h4>
        <v-btn-delete className="btn-delete" v-on:click="$emit('removeLocation')" />
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
div{
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.btn-delete{

}
.btn-delete:focus{
    outline-color: #777
}
</style>