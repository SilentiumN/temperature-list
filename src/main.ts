import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { vOnClickOutside } from '@vueuse/components';
import App from './App.vue';
import router from './router';
import './assets/styles/main.scss';

const pinia = createPinia();

createApp(App)
  .directive('on-click-outside', vOnClickOutside)
  .use(pinia)
  .use(router)
  .mount('#app');
