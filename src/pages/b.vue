<template lang="html">
    <div>
        bbb
        <p>{{ $store.state.bbb.content }}</p>
        <img :src="$store.state.bbb.pic" alt="pic">
    </div>
</template>

<script>
export default {
    asyncData({ store, route }) {
        if (!store.state.bbb.pic) {
            return store.dispatch('bbb');
        }
        return false;
    },
};
</script>

<style lang="sass" scoped>
    div
        color: blue
</style>
