import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createMemoryHistory, createRouter } from 'vue-router'
import '../src/assets/main.css'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'residents', component: { template: '<div />' } },
    { path: '/resident/:id', name: 'resident-detail', component: { template: '<div />' } },
  ],
})

setup((app) => {
  app.use(createPinia())
  app.use(VueQueryPlugin)
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
}

export default preview
