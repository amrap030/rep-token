<template>
    <h1 class="mb-6 text-3xl font-extrabold">Home</h1>
    <p>{{ name }}</p>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const name = computed(() => {
    return store.state.user.name
})
</script>
