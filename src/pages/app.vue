<template lang="html">
    <div>
        <ul>
            <li><router-link to="/aaa">aaa</router-link></li>
            <li><router-link to="/bbb">bbb</router-link></li>
            <li><router-link to="/ccc">ccc</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import 'normalize.css';

export default {
};
</script>

<style lang="sass">
    a
        color: cyan
    p
        color: pink
</style>
