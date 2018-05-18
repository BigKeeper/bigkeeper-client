<template>
  <el-container>
    <el-aside v-loading="loading" class="el-aside" style="width: 280px;">
      <el-menu class="el-menu">
        <el-menu-item class="el-menu-item" v-for="(value, index) in filteredBranches" :index=index.toString()>
          <el-col :span="16"><div class="el-menu-item-title" @click="push(index)">{{ value.home_branche_name }}</div></el-col>
          <el-col :span="8">
            <el-badge :value="value.involve_modules.length.toString()" class="el-menu-item-badge">
              <el-button size="mini" icon="el-icon-plus" class="el-menu-item-button" @click="switchTo()" circle></el-button>
            </el-badge>
          </el-col>
        </el-menu-item>
      </el-menu>
      <el-header class="el-header">
        <div class="el-header-search">
          <el-input prefix-icon="el-icon-search" placeholder="Search" @input="change">
          </el-input>
        </div>
        <div class="el-header-button">
          <el-button size="mini" icon="el-icon-refresh" @click="refresh()" circle></el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dfvisible = true" circle></el-button>
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
    mounted () {
      this.refresh()
    },
    watch: {
      '$route' (to, from) {
        this.$router.go(0)

        if (to.name === 'develop-page') {
          this.refresh()
        }
      }
    },
    data () {
      return {
        project: {
          name: '',
          path: '',
          user: '',
          type: 'feature',
          branch: ''
        },
        dfvisible: false,
        loading: true,
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
      push (index) {
        let branch = this.filteredBranches[index]
        console.log(branch)
        this.$router.push('*')
        this.$router.push(
          {
            path: '/home/develop/info',
            name: 'develop-info-page',
            params: {
              branch: JSON.stringify(branch)
            }
          }
        )
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
      refresh () {
        this.project = ProjectService.current()

        this.filteredBranches = []
        this.branches = []
        this.loading = true

        console.log("big -u '" + this.project.user + "' -p '" + this.project.path + "' " + this.project.type + ' list json')

        this.get("big -u '" + this.project.user + "' -p '" + this.project.path + "' " + this.project.type + ' list json', (data) => {
          if (data === null) {
            data = []
          }
          this.filteredBranches = data
          this.branches = data
          this.loading = false
        })
      },
      get: CommandLine.get,
      post: CommandLine.post
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

  .el-aside {
    background-color: #f5f7fa;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: right;
    display: flex;
    position: absolute;
    width:280px;
    top:0px
  }

  .el-header-search {
    flex: 1;
  }

  .el-header-button {
    flex: none;
    width: 110px;
  }

  .el-menu-item {
    /* display: flex; */
  }

  .el-menu-item-title {
    /* flex: 1; */
    /* width: 200px; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .el-menu {
    top: 64px;
    width: 278px;
  }

  .el-menu-item-badge {
    /* padding-top: 10px; */
    /* float:right; */
    /* flex: none; */
    text-align: right;
  }

  .el-menu-item-button {
    /* margin-top: 10px; */
    text-align: center;
    /* width: 30px;
    height: 30px; */
  }

  el-menu-item:nth-child(odd) {
    background-color:#ffffff;
  }

  el-menu-item:nth-child(even) {
    background-color:#eeeeee;
  }
</style>
