import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        list: {},
        count: 0
    },
    actions: {
        inc: ({ commit }) => commit('inc')
    },
    mutations: {
        inc: state => state.count++
    }
});

export default store;
