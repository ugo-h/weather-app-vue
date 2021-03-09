<template>
    <div class="card">
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
        box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        background: #faf9f9;
        border-radius: 20px;
    }
</style>