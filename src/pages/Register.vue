<script setup lang="ts">
const router = useRouter()
const backHome = () => router.push({ name: 'Home' })
</script>

<template>
  <div flex="c col" h-full>
    <div mb-10px>
      Register Page
    </div>
    <div btn w-200px @click="backHome">
      back home
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
