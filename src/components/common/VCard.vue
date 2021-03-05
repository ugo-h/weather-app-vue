<template>
    <div className="card">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'VCard'
}
</script>

<style>
    .card{
        padding: 1rem;
        background: white;
        border-radius: 20px;
    }
</style>