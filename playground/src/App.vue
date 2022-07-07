<script setup lang="ts">
import { shuffle } from 'lodash-es'
import type { StyleValue } from 'vue'
import { FlipItem, FlipWarpper } from 'vue-fliplay'

const LIST = Array.from({ length: 24 }, (_, idx) => idx + 1)
const list = ref<number[]>(LIST)

function shuffleList() {
  list.value = shuffle(list.value)
}

function addEl() {
  list.value = ([list.value.length + 1]).concat(list.value)
}

const size = ref(4)
const styles = computed((): StyleValue => {
  return { width: `${size.value}rem`, height: `${size.value}rem` }
})

function reset() {
  list.value = LIST
  size.value = 4
}

function enlarge() {
  size.value += 1
}
</script>

<template>
  <div flex="~ col" gap-4 h-full mx-auto w="5/6">
    <FlipWarpper :flip-key="{ list, size }" mt-8>
      <div flex-c gap-4>
        <h3 font="mono bold" text="2xl" text-center>
          Vue-Fliplay
        </h3>
        <a i-akar-icons:github-fill cursor-pointer color-gray-600 hover:color-brand-primary href="https://github.com/JiatLn/vue-fliplay" target="_blank" />
      </div>
      <div text="center" my-4>
        data: {{ list }}
      </div>
      <div flex="c gap-4" my-4>
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
      <div w="3/4" mx-auto h-80 flex="~ wrap gap-2" content-start>
        <FlipItem v-for="item in list" :key="item" flex="c">
          <TheBox :style="styles" :title="`${item}`" />
        </FlipItem>
      </div>
    </FlipWarpper>
  </div>
</template>

<style scoped lang="scss"></style>
