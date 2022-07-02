<script setup lang="ts">
import { shuffle } from 'lodash-es'
import type { StyleValue } from 'vue'
import { FlipItem, FlipWarpper } from '@/components/Flipper'

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
  size.value += 8
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
    <FlipWarpper :flip-key="{ list, size }">
      <h3 font="mono bold" text="2xl" mb-4 text-center>
        Flip
      </h3>
      <div w-40 h-80 flex="~ wrap" content-start>
        <FlipItem v-for="item in list" :key="item" :style="styles" flex="c" border="1px solid black">
          <div>{{ item }}</div>
        </FlipItem>
      </div>
    </FlipWarpper>
  </div>
</template>

<style scoped lang="scss"></style>
