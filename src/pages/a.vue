<template lang="html">
    <div class="hhh">
        aaa
        <img src="../assets/2.png" alt="">
        <span>{{ $store.state.count }}</span>
        <button type="button" name="button" @click="abc">aaa</button>
    </div>
</template>

<script>
export default {
    asyncData(obj) { return this.methods.asyncData(obj); },

    mounted() {
        if (!this.$store.state.count) {
            this.asyncData({ store: this.$store, route: this.$route });
        }
    },

    methods: {
        asyncData({ store, route }) {
            return store.dispatch('inc');
        },

        abc() {
            console.log(this.$store.state);
        },
    },
};
</script>

<style lang="sass" scoped>
    .hhh
        color: pink
</style>
