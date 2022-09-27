<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world msg="Welcome to Your Vue.js App - Topizera das galixias"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
