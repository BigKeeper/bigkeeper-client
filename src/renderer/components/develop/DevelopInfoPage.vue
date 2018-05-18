<template>
  <el-container>
    <el-main>
      <el-row class="row" v-for="(i, index) in branch.involve_modules.length" :key="i">
        <module-information></module-information>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  export default {
    name: 'develop-info-page',
    components: { ModuleInformation },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        branch: {
          'home_branche_name': '',
          'involve_modules': []
        }
      }
    },
    watch: {
      '$route' (to, from) {
        this.$router.go(0)

        if (to.name === 'develop-info-page') {
          this.refresh()
        }
      }
    },
    methods: {
      refresh () {
        console.log(this.$route.params)
        this.branch = JSON.parse(this.$route.params.branch)
        console.log(this.branch)
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .row {
    margin-bottom: 24px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
