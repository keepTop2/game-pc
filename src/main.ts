import { createApp } from 'vue';
import pinia from '@/store/index';
import App from './App.vue';
import router from './router/index';
import { i18n } from '@/languages/index';
import '@/assets/style.less';
import "@/assets/rem"
const app = createApp(App);
app.use(router).use(pinia).use(i18n);
app.mount('#app');