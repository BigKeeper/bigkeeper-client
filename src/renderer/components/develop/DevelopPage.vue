<template>
  <el-container>
    <el-aside v-loading="loading" class="develop-aside">
      <ul class="develop-menu" id="branches">
        <li class="develop-menu-item" v-for="(value, index) in filteredBranches">
          <div class="develop-menu-item-background" v-bind:class="{ active: value.home_branch_name === activeBranch, selected: value.is_current === true }">
            <span class="develop-menu-item-title" @click="push(value)">{{ value.home_branch_name }}</span>
            <span>
              <el-badge :hidden="value.involve_modules.length === 0" :value="value.involve_modules.length.toString()" class="develop-menu-item-badge">
                <el-button :disabled="value.is_current === true" size="mini" icon="el-icon-sort" @click="switchTo(value)" round>{{value.is_current ? "HEAD" : "CheckOut"}}</el-button>
              </el-badge>
            </span>
          </div>
        </li>
      </ul>
      <el-header class="develop-header">
        <div class="develop-header-search">
          <el-input prefix-icon="el-icon-search" placeholder="Search" v-model="searchTitle" @input="change" clearable>
          </el-input>
        </div>
        <div class="develop-header-button">
          <el-button size="mini" icon="el-icon-refresh" @click="refresh()" circle></el-button>
          <el-button type="mini" icon="el-icon-plus" @click="dfvisible = true" circle></el-button>
        </div>
      </el-header>
    </el-aside>
    <router-view></router-view>
    <develop-form
      v-bind:dfvisible.sync="dfvisible">
    </develop-form>
    <console-page
      v-bind:cpvisible.sync="cpvisible"
      v-bind:params="console.params"
      v-bind:title="console.title">
    </console-page>
  </el-container>
</template>

<script>
  import DevelopInfoPage from './DevelopInfoPage'
  import DevelopForm from './DevelopForm'
  import CommandLine from '../../../util/CommandLine.js'
  import ConsolePage from '../common/console/ConsolePage'
  import ProjectService from '../../../service/ProjectService.js'

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
        cpvisible: false,
        console: {
          title: '',
          params: []
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
        filteredBranches: [],
        activeBranch: '',
        searchTitle: ''
      }
    },
    name: 'develop-page',
    components: { DevelopInfoPage, DevelopForm, ConsolePage },
    methods: {
      change (value) {
        this.searchTitle = value
        if (!value) {
          this.filteredBranches = this.branches
        } else {
          var reg = new RegExp(value)
          var arr = []
          for (var i = 0; i < this.branches.length; i++) {
            let branch = this.branches[i]
            if (reg.test(branch.home_branch_name)) {
              arr.push(branch)
            }
          }
          this.filteredBranches = arr
        }
      },
      push (branch) {
        this.$router.push('*')
        this.$router.push(
          {
            path: '/home/develop/info',
            name: 'develop-info-page',
            params: {
              branch: branch,
              project: this.project
            }
          }
        )
        this.activeBranch = branch.home_branch_name
      },
      switchTo (branch) {
        this.$confirm('Switch to branch: ' + branch.home_branch_name + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.console = {
            title: 'Switch to branch: ' + branch.home_branch_name,
            params: [
              '-u',
              this.project.user,
              '-p',
              this.project.path,
              this.project.type,
              'switch',
              branch.home_branch_name
            ]
          }
          this.cpvisible = true
        }).catch(() => {
        })
      },
      refresh () {
        this.project = ProjectService.current()

        this.filteredBranches = []
        this.branches = []
        this.loading = true
        console.log("big -u '" + this.project.user + "' -p '" + this.project.path + "' " + this.project.type + ' list json')

        this.get("big -l false -u '" + this.project.user + "' -p '" + this.project.path + "' " + this.project.type + ' list json', (data) => {
          if (data === null) {
            data = []
          }
          this.filteredBranches = data
          this.branches = data
          this.loading = false

          this.branches.forEach((branch, index) => {
            if (branch.is_current === true) {
              this.project.branch = branch.home_branch_name
              ProjectService.setCurrent(this.project)
              this.push(branch)
            }
          })
        })
      },
      get: CommandLine.get
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
    /* width: 300px; */
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
    /* width: 300px; */
    display: flex;
    border-top: #eeeeee 1px solid;
  }

  .develop-menu-item-background {
    width: 300px;
    display: flex;
    left: 0px;
    right: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .develop-menu-item-title {
    flex: 1;
    width: 210px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .develop-menu {
    /* width: 300px; */
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
    border: #eeeeee 1px solid;
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

  .active {
    color: #5aaffe;
    background-color: #ebf5ff;
  }
  .selected {
    color: white;
    background-color: #5aaffe;
  }

  /* #branches li:nth-of-type(odd){ background-color:#ffffff; }
  #branches li:nth-of-type(even){ background-color:#f1f1f1; } */
  #branches li:first-child {border-top: none;}
  #branches li:hover { background-color:#ebf5ff; }

</style>
