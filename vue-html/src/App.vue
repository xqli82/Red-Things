<template>
  <div id="app">
    <layout>
    </layout>
  </div>
</template>
<script>
  import layout from '@/layout/main.vue'
  export default {
    components: {
      layout
    }
  }
</script>
<style>
  body,html{
    margin: 0;
    padding: 0;
  }
  #app{
    height: 100vh;
  }
  a{
    color: #303133;
  }
</style>