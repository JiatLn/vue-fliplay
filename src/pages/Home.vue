<script setup lang="ts">
import useUserStore from '@/store/modules/useUserStore'

const userStore = useUserStore()
</script>

<template>
  <div h-full w-full flex="c col">
    <div flex items-start gap-2>
      <TheBox title="unocss">
        <div text-brand-primary uppercase>
          Home Page
        </div>
      </TheBox>
      <TheBox title="Vue-router">
        <div flex justify-between space-x-4>
          <router-link btn :to="{ name: 'Login' }">
            Login
          </router-link>
          <router-link btn :to="{ name: 'Register' }">
            Register
          </router-link>
        </div>
      </TheBox>
      <TheBox title="iconify">
        <div flex-c gap-12px text-xl>
          <AppIcon icon="flat-color-icons:home" />
          <a i-akar-icons:github-fill cursor-pointer color-gray-600 hover:color-brand-primary href="https://github.com/JiatLn/vvtt" target="_blank" />
        </div>
      </TheBox>
      <TheBox title="Pinia">
        <div>
          isLogin: <span font-bold>{{ userStore.isLogin }}</span>
        </div>
      </TheBox>
      <TheBox title="TSX support" />
    </div>
    <p mt-8 text-gray-400>
      This is a demo page, you can clear it and start coding~ :)
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>
