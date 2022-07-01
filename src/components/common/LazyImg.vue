<script setup lang="ts">
const props = defineProps<{
  src: string
  class?: string | string[]
}>()

const imgRef = ref<HTMLImageElement>()

let intersectionObserver: IntersectionObserver
onMounted(() => {
  intersectionObserver = new IntersectionObserver((entries) => {
    // If intersectionRatio is 0, the target is out of view
    // and we do not need to do anything.
    if (entries[0].intersectionRatio <= 0)
      return
    const imgEl = entries[0].target as HTMLImageElement
    const newImg = document.createElement('img')
    newImg.src = props.src
    newImg.onload = () => {
      imgEl.src = props.src
      imgEl.style.animation = 'c3 0.6s linear 0s 1 forwards'
    }
    intersectionObserver.unobserve(imgRef.value!)
    intersectionObserver.disconnect()
  })
  // start observing
  intersectionObserver.observe(imgRef.value!)
})

onUnmounted(() => {
  intersectionObserver && intersectionObserver.disconnect()
})
</script>

<template>
  <img ref="imgRef" :class="props.class" src="data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cpath d='M950.8 720.1c22.4 29.5 1.4 71.9-35.6 71.9H108.8c-36.7 0-57.8-41.8-36-71.4l163.7-221.9c17.9-24.2 54.1-24.2 72 0l95.3 129.2 208.1-261.3c18.2-22.8 52.9-22.4 70.5.8l268.4 352.7zm-594-308.9c-49.4 0-89.5-40.1-89.5-89.6s40.1-89.6 89.5-89.6 89.5 40.1 89.5 89.6-40 89.6-89.5 89.6z' fill='%23e6e6e6'/%3E%3C/svg%3E" alt="">
</template>

<style lang="scss">
::v-global(body) {
  @keyframes c3 {
    0% {
      opacity: 0;
    }

    50% {
      opacity: 0.5;
    }

    100% {
      opacity: 1;
    }
  }
}
</style>
