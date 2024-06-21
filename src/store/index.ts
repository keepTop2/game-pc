
import { createPinia } from 'pinia';
// import { registerPiniaPersistPlugin } from '@/store/plugin/persist';

const store = createPinia();
// registerPiniaPersistPlugin(store);

export default store;

export { User } from './user';
export { Wallet } from './wallet';
