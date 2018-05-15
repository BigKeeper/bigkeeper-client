<template>
  <el-container>
    <el-aside v-loading="loading" style="width: 280px; background-color: #f5f7fa;">
      <el-menu style="top: 64px; width: 278px;">
        <el-menu-item style="display: flex;" v-for="(value, index) in branches" :index=index.toString() @click="push('/home/develop/info')">
          <div style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ value.home_branche_name }}</div>
          <div style="flex: none; width: 60px; text-align: right;">
            <el-button style="width: 30px; height: 30px; text-align:center;" icon="el-icon-sort" @click="switch_to()" circle></el-button>
          </div>
        </el-menu-item>
      </el-menu>
      <el-header style="text-align: right; display: flex; position: absolute; width:280px; top:0px">
        <div style="flex: 1;">
          <el-input prefix-icon="el-icon-search" placeholder="Search">
          </el-input>
        </div>
        <div style="flex: none; width: 110px;">
          <el-button size="mini" icon="el-icon-refresh" @click="loadData()" circle></el-button>
          <el-button type="primary" size="mini" icon="el-icon-plus" @click="dfvisible = true" circle></el-button>
        </div>
      </el-header>
    </el-aside>
    <router-view></router-view>
    <develop-form v-bind:dfvisible.sync="dfvisible"></develop-form>
  </el-container>
</template>

<script>
  import DevelopInfoPage from './DevelopInfoPage'
  import DevelopForm from './DevelopForm'
  import CommandLine from '../../../util/command_line.js'

  export default {
    data () {
      return {
        dfvisible: false,
        loading: true,
        command: {
          list: "big -p '/Users/mmoaay/Documents/eleme/LPDTeamiOS' feature list json",
          switch_to: {
            name: 'big',
            params: [
              '-p',
              '/Users/mmoaay/Documents/eleme/LPDTeamiOS',
              'feature',
              'switch',
              'hahaha'
            ]
          }
        },
        branches: [
        ]
      }
    },
    name: 'develop-page',
    components: { DevelopInfoPage, DevelopForm },
    methods: {
      push (link) {
        console.log('push')
        this.$router.push(link)
      },
      switch_to () {
        console.log('switch_to')
        this.$confirm('Switch to branch?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.post(this.command.switch_to)
        }).catch(() => {
        })
      },
      loadData () {
        this.branches = []
        this.loading = true
        this.get(this.command.list, (data) => {
          this.branches = data
          this.loading = false
        })
      },
      get: CommandLine.get,
      post: CommandLine.post
    },
    mounted () {
      this.loadData()
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
