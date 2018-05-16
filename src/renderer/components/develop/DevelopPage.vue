<template>
  <el-container>
    <el-aside v-loading="loading" style="width: 280px; background-color: #f5f7fa;">
      <el-menu style="top: 64px; width: 278px;">
        <el-menu-item style="display: flex;" v-for="(value, index) in filteredBranches" :index=index.toString()>
          <div style="flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" @click="push('/home/develop/info')">{{ value.home_branche_name }}</div>
          <div style="flex: none; width: 40px; text-align: right;">
            <el-button size="mini" icon="el-icon-sort" @click="switchTo()" circle></el-button>
            <!-- <el-button style="width: 30px; height: 30px; text-align:center;" icon="el-icon-sort" @click="switchTo()" circle></el-button> -->
          </div>
        </el-menu-item>
      </el-menu>
      <el-header style="text-align: right; display: flex; position: absolute; width:280px; top:0px">
        <div style="flex: 1;">
          <el-input prefix-icon="el-icon-search" placeholder="Search" @input="change">
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
  import ProjectService from '../../../service/project_service.js'

  export default {
    data () {
      return {
        dfvisible: false,
        loading: true,
        project: {
          name: '',
          path: '',
          user: ''
        },
        command: {
          switchTo: {
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
        branches: [],
        filteredBranches: []
      }
    },
    name: 'develop-page',
    components: { DevelopInfoPage, DevelopForm },
    methods: {
      change (value) {
        if (!value) {
          this.filteredBranches = this.branches
        } else {
          var reg = new RegExp(value)
          var arr = []
          for (var i = 0; i < this.branches.length; i++) {
            let branch = this.branches[i]
            if (reg.test(branch.home_branche_name)) {
              arr.push(branch)
            }
          }
          this.filteredBranches = arr
        }
      },
      push (link) {
        console.log('push')
        this.$router.push(link)
      },
      switchTo () {
        console.log('switchTo')
        this.$confirm('Switch to branch?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.post(this.command.switchTo)
        }).catch(() => {
        })
      },
      loadData () {
        this.filteredBranches = []
        this.branches = []
        this.loading = true

        console.log("big -u '" + this.project.user + "' -p '" + this.project.path + "' feature list json")

        this.get("big -u '" + this.project.user + "' -p '" + this.project.path + "' feature list json", (data) => {
          this.filteredBranches = data
          this.branches = data
          this.loading = false
        })
      },
      get: CommandLine.get,
      post: CommandLine.post
    },
    mounted () {
      this.project = ProjectService.current
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

  el-menu-item:nth-child(odd) {
    background-color:#ffffff;
  }

  el-menu-item:nth-child(even) {
    background-color:#eeeeee;
  }
</style>
