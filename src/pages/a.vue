<template lang="html">
    <div class="hhh">
        aaa
        <img src="../assets/2.png" alt="">
        <span>{{ value }}</span>
        <button type="button" name="button" @click="abc">aaa</button>
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        return store.dispatch('inc');
    },

    methods: {
        abc() {
            console.log(this.$store.state);
        },
    },

    computed: {
        value() {
            return this.$store.state.count;
        }
    }
};
</script>

<style lang="sass" scoped>
    .hhh
        color: pink
</style>
