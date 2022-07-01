<script setup lang="ts">
import { shuffle } from 'lodash-es'
import type { StyleValue } from 'vue'

const LIST = Array.from({ length: 25 }, (_, idx) => idx + 1)
const list = ref<number[]>(LIST)

function shuffleList() {
  list.value = shuffle(list.value)
}

function addEl() {
  list.value = ([list.value.length + 1]).concat(list.value)
}

const size = ref(32)
const styles = computed((): StyleValue => {
  return { width: `${size.value}px`, height: `${size.value}px` }
})

function reset() {
  list.value = LIST
  size.value = 32
}

function enlarge() {
  size.value += 2
}
</script>

<template>
  <div flex="c col" gap-4 h-full w-full>
    <div flex="c gap-4">
      <button btn @click="shuffleList">
        shuffle
      </button>
      <button btn @click="addEl">
        addEl
      </button>
      <button btn @click="reset">
        reset
      </button>
      <button btn @click="enlarge">
        enlarge
      </button>
    </div>
    {{ list }}
    <Flipper :watcher="{ list, size }" w-40 h-80 flex="~ wrap" content-start>
      <div v-for="item in list" :key="item" :style="styles" flex="c" border="1px solid black">
        {{ item }}
      </div>
    </Flipper>
  </div>
</template>

<style scoped lang="scss"></style>
