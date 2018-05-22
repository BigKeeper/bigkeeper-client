<template>
  <el-container>
    <el-aside v-loading="loading" class="develop-aside">
      <ul class="develop-menu" id="branches">
        <li class="develop-menu-item" v-for="(value, index) in filteredBranches">
          <span class="develop-menu-item-title" @click="push(index)">{{ value.home_branche_name }}</span>
          <span>
            <el-badge :hidden="value.involve_modules.length === 0" :value="value.involve_modules.length.toString()" class="develop-menu-item-badge">
              <el-button size="mini" icon="el-icon-sort" @click="switchTo(value.home_branche_name)" round></el-button>
            </el-badge>
          </span>
        </li>
      </ul>
      <el-header class="develop-header">
        <div class="develop-header-search">
          <el-input prefix-icon="el-icon-search" placeholder="Search" @input="change">
          </el-input>
        </div>
        <div class="develop-header-button">
          <el-button size="mini" icon="el-icon-refresh" @click="refresh()" circle></el-button>
          <el-button type="primary" icon="el-icon-plus" @click="dfvisible = true" circle></el-button>
        </div>
      </el-header>
    </el-aside>
    <router-view></router-view>
    <develop-form v-bind:dfvisible.sync="dfvisible"></develop-form>
    <console-page
      v-bind:cpvisible.sync="console.cpvisible"
      v-bind:loading="console.loading"
      v-bind:title="console.title"
      v-bind:message="console.message">
    </console-page>
  </el-container>
</template>

<script>
  import DevelopInfoPage from './DevelopInfoPage'
  import DevelopForm from './DevelopForm'
  import CommandLine from '../../../util/CommandLine.js'
  import ProjectService from '../../../service/ProjectService.js'
  import ConsolePage from '../common/console/ConsolePage'

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
        console: {
          cpvisible: false,
          loading: true,
          title: '',
          message: ''
        },
        project: {
          name: '',
          path: '',
          user: '',
          type: 'feature',
          branch: ''
        },
        dfvisible: false,
        loading: true,
        branches: [],
        filteredBranches: []
      }
    },
    name: 'develop-page',
    components: { DevelopInfoPage, DevelopForm, ConsolePage },
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
      switchTo (branch) {
        this.project.branch = branch
        this.$confirm('Switch to branch: ' + branch + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.console.cpvisible = true
          this.console.loading = true
          this.console.title = 'Switch to branch: ' + branch
          this.console.message = ''
          this.post({
            name: 'big',
            params: [
              '-u',
              this.project.user,
              '-p',
              this.project.path,
              this.project.type,
              'switch',
              this.project.branch
            ]
          }, (message) => {
            if (message === null) {
              this.console.loading = false
              return
            }
            this.console.message += message + '\r\n'
          })
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

  .develop-aside {
    width: 300px;
    background-color: #f5f7fa;
    position: relative;
    bottom: 0px;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  .develop-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    text-align: right;
    display: flex;
    position: absolute;
    width: 300px;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  .develop-header-search {
    flex: 1;
  }

  .develop-header-button {
    flex: none;
    width: 110px;
  }

  .develop-menu-item {
    width: 300px;
    left: 0px;
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .develop-menu-item-title {
    flex: 1;
    width: 200px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .develop-menu {
    width: 300px;
    overflow: auto;
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 60px;
    right: 0px;
    padding-left: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
  }

  .develop-menu-item-badge {
    margin-top: 6px;
    margin-right: 20px;
    margin-left: 10px;
  }

  .develop-menu-item-button {
    padding-left: 10px;
    width: 30px;
    height: 30px;
  }

  #branches li:nth-of-type(odd){ background:#ffffff; }
  #branches li:nth-of-type(even){ background:#f1f1f1; }
  #branches li:hover { background-color:#ebf5ff; }

</style>
