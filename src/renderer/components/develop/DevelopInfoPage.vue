<template>
  <el-container>
    <el-main style="display: inline-block;">
      <el-row class="list-item" v-for="(value, index) in branch.involve_modules" :key="index">
        <module-information style="width:100%" v-bind:module="value"></module-information>
      </el-row>
    </el-main>
    <el-footer style="background-color: #B3C0D1; margin-bottom:0px; height: autosize">
      <el-row style="padding: 10px;">
        <el-col :span="10" style="text-align: center;">
          <el-button :disabled="branch.is_current === false" icon="el-icon-edit" type="primary" size="mini" @click="update()" round>Update</el-button>
          <el-button :disabled="branch.is_current === false || branch.status === 'finished' || branch.status === 'published'" icon="el-icon-check" type="success" size="mini" @click="finish()" round>Finish</el-button>
          <el-button :disabled="branch.is_current === false || branch.status === 'published' || branch.status === 'developing'" icon="el-icon-upload2" type="success" size="mini" @click="publish()" round>Publish</el-button>
        </el-col>

        <el-col :span="7" style="text-align: center;">
          <el-button :disabled="branch.is_current === false" icon="el-icon-arrow-down" size="mini" @click="pull()" round>Pull</el-button>
          <el-button :disabled="branch.is_current === false" icon="el-icon-arrow-up" size="mini" @click="pushTo()" round>Push</el-button>
        </el-col>
        <el-col :span="7" style="text-align: center;">
          <el-button :disabled="branch.is_current === false" icon="el-icon-refresh" type="warning" size="mini" @click="rebase()" round>Rebase</el-button>
          <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleted()" round>Delete</el-button>
        </el-col>
      </el-row>
    </el-footer>
    <console-page
      v-bind:cpvisible.sync="cpvisible"
      v-bind:params="console.params"
      v-bind:title="console.title">
    </console-page>
    <develop-form
      v-bind:dfvisible.sync="dfvisible"
      v-bind:branch="branch">
    </develop-form>
    <develop-push-form
      v-bind:dpfvisible.sync="dpfvisible"
      v-bind:branch="branch"
      v-bind:project="project">
    </develop-push-form>
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  import ConsolePage from '../common/console/ConsolePage'
  import DevelopForm from './DevelopForm'
  import DevelopPushForm from './DevelopPushForm'
  import DevelopService from '../../../service/DevelopService.js'

  export default {
    name: 'develop-info-page',
    components: { ModuleInformation, ConsolePage, DevelopForm, DevelopPushForm },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        dfvisible: false,
        dpfvisible: false,
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
        branch: {
          is_current: false,
          is_remote: false,
          home_branch_name: '',
          involve_modules: [],
          status: 'normal'
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
        this.branch = this.$route.params.branch
        this.project = this.$route.params.project

        let modules = DevelopService.getCurrentModules(this.project.path)

        if (this.branch.is_current === true) {
          if (modules === null) {
            this.branch.status = 'published'
          } else if (modules.path.all.length === 0) {
            this.branch.status = 'finished'
          } else {
            this.branch.status = 'developing'
          }
        }

        this.branch.involve_modules.forEach((module, index) => {
          module.status = 'normal'

          if (this.branch.is_current === true) {
            module.status = 'current'

            if (modules === null) {
              module.status = 'published'
            } else {
              modules.path.all.forEach((moduleName, index) => {
                if (module.module_name === moduleName && module.current_branch.indexOf(this.branch.home_branch_name) === -1) {
                  module.status = 'error'
                }
              })
              modules.path.del.forEach((moduleName, index) => {
                if (module.module_name === moduleName) {
                  module.status = 'deleted'
                }
              })
              modules.git.all.forEach((moduleName, index) => {
                if (module.module_name === moduleName) {
                  module.status = 'finished'
                }
              })
            }
          }
        })

        console.log(this.branch)
      },
      push (link) {
        this.$router.push(link)
      },
      update () {
        this.dfvisible = true
      },
      finish () {
        this.$confirm('Finish this ' + this.project.type + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.console = {
            title: 'Finish the branch: ' + this.branch.home_branch_name,
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'finish'
            ]
          }
          this.cpvisible = true
        }).catch(() => {
        })
      },
      publish () {
        this.$confirm('Publish this ' + this.project.type + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.console = {
            title: 'Publish the branch: ' + this.branch.home_branch_name,
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'publish'
            ]
          }
          this.cpvisible = true
        }).catch(() => {
        })
      },
      pull () {
        this.console = {
          title: 'Pull changes from remote for the branch: ' + this.branch.home_branch_name,
          params: [
            '-p',
            this.project.path,
            this.project.type,
            'pull'
          ]
        }
        this.cpvisible = true
      },
      pushTo () {
        this.dpfvisible = true
      },
      rebase () {
        this.$confirm('Rebase this ' + this.project.type + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          this.console = {
            title: 'Rebase changes for the branch: ' + this.branch.home_branch_name,
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'rebase'
            ]
          }
          this.cpvisible = true
        }).catch(() => {
        })
      },
      deleted () {
        this.$confirm('Delete this ' + this.project.type + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.console = {
            title: 'Delete the branch: ' + this.branch.home_branch_name,
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'delete',
              this.branch.home_branch_name
            ]
          }
          this.cpvisible = true
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .list-item {
    margin-bottom: 12px;
    margin-top: 12px;
    flex-basis: 100%;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
