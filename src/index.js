import Vue from 'vue';
import 'normalize.css';
import router from './router/router';
import App from './pages/app.vue';

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
