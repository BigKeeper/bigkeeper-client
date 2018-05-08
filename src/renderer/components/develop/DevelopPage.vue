<template>
  <el-container>
    <el-aside style="width:280px; background-color:#f5f7fa">
      <el-header style="text-align: right; display: flex;">
          <div style="flex: 1; font-size:12px;">
            <el-input prefix-icon="el-icon-search" placeholder="Searcher">
            </el-input>
          </div>
          <div style="flex: none; width: 55px;">
            <el-button type="primary" icon="el-icon-plus" @click="dfvisible = true" circle></el-button>
          </div>
      </el-header>
      <el-menu>
        <el-menu-item index="1" @click="push('/home/develop/info')">2.8.8_mmoaay_hello_world</el-menu-item>
      </el-menu>
    </el-aside>
    <router-view></router-view>
    <develop-form v-bind:dfvisible.sync="dfvisible"></develop-form>
  </el-container>
</template>

<script>
  import DevelopInfoPage from './DevelopInfoPage'
  import DevelopForm from './DevelopForm'
  export default {
    data () {
      return {
        dfvisible: false
      }
    },
    name: 'develop-page',
    components: { DevelopInfoPage, DevelopForm },
    methods: {
      push (link) {
        this.$router.push(link)
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
