<script lang="ts" setup>
const props = defineProps<{
  icon: String
  class?: string | string[]
}>()
</script>

<template>
  <div inline-flex justify-center items-center cursor-pointer :class="props.class">
    <span class="iconify" :data-icon="props.icon" />
  </div>
</template>

<style lang="scss" scoped>
.iconify {
  color: inherit;
}
</style>
