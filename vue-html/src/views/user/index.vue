<template>
    <div style="margin: 0px 10px">
        <h3>用户管理</h3>
        <hr>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.$store.dispatch('group/getGroups', this)
        },
    }
</script>
<style>

</style>