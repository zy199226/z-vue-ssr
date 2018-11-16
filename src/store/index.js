import Vue from 'vue';
import Vuex from 'vuex';
import { test1 } from '../controller/test1';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        list: {},
        count: 0,
        bbb: {}
    },
    mutations: {
        inc: state => state.count++,
        bbb(a, b) {
            a.bbb = b;
        }
    },
    actions: {
        inc: ({ commit }) => commit('inc'),
        bbb: async (a) => {
            try {
                const res = await test1();
                a.commit('bbb', res);
            } catch (e) {
                console.log(e);
            }
        }
    }
});

export default store;
