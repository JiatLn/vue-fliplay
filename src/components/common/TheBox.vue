<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template>
  <section flex="c col" p-8 shadow-md rounded-xl space-y-2>
    <p>{{ props.title }}</p>
    <slot />
  </section>
</template>

<style scoped lang="scss"></style>
