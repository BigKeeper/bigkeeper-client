<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import ProjectService from '../service/project_service.js'
  export default {
    name: 'bigkeeper',
    mounted () {
      if (ProjectService.projects().length !== 0) {
        this.$router.push('/home')
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
