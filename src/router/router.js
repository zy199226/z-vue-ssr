import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const app = () => import('../pages/app.vue');
const a = () => import('../pages/a.vue');
const b = () => import('../pages/b.vue');
const c = () => import('../pages/c.vue');


export default new Router({
    routes: [
        {
            path: '/',
            component: app
        },
        {
            path: '/aaa',
            component: a
        },
        {
            path: '/bbb',
            component: b
        },
        {
            path: '/ccc',
            component: c
        }
    ]
});
