import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initStore } from '@/app/initStore'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@purge-icons/generated'
import '@/assets/styles/_global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia)

app.mount('#app')

initStore()
