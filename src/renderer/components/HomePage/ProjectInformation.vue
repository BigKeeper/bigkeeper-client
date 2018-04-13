<template>
  <div>
    <div style="text-align: center; margin-top:20px">
      <img width="100" height="100" style="border-radius: 50%" src="~@/assets/project_icon_ios.png">
      <div>LPDTeam</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: this.$route.name
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
