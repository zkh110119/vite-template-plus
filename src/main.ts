import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import '~/styles/index.scss'
import App from './App.vue'

const pinia = createPinia()
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(pinia).use(router).mount('#app')
