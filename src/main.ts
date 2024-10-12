import { createApp } from 'vue';
import pinia from '@/store/index';
import App from './App.vue';
import router from './router/index';
import { i18n } from '@/languages/index';
import '@/assets/style.less';
import "@/assets/rem"
// import IWebsocket from '@/net/Net1'
// IWebsocket.conectWebsocket()
const app = createApp(App);
app.use(router).use(pinia).use(i18n);
app.mount('#app');