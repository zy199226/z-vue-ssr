import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store';
import App from './pages/app.vue';

sync(store, router);

const app = new Vue({
    router,
    store,
    render: h => h(App)
});

export { app, router, store };
