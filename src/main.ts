import { createApp } from 'vue'

import App from './App.vue'

import 'uno.css'
import '@unocss/reset/tailwind.css'
import '@/assets/styles/_global.scss'

const app = createApp(App)

app.mount('#app')

