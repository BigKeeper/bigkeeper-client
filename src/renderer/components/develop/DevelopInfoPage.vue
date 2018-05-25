<template>
  <el-container>
    <el-main>
      <el-row class="row" v-for="(value, index) in branch.involve_modules" :key="index">
        <module-information v-bind:module="value"></module-information>
      </el-row>
    </el-main>
    <el-footer style="height: 44px; background-color: #B3C0D1; padding-top:8px;">
      <el-col :span="10">
        <el-button :disabled="branch.is_current === false" icon="el-icon-edit" type="primary" size="mini" @click="update()" round></el-button>
        <el-button :disabled="branch.is_current === false" icon="el-icon-check" type="success" size="mini" @click="finish()" round></el-button>
        <el-button :disabled="branch.is_current === false" icon="el-icon-upload2" type="success" size="mini" @click="publish()" round></el-button>
      </el-col>

      <el-col :span="7">
        <el-button :disabled="branch.is_current === false" icon="el-icon-arrow-down" size="mini" @click="pull()" round></el-button>
        <el-button :disabled="branch.is_current === false" icon="el-icon-arrow-up" size="mini" @click="pushTo()" round></el-button>
      </el-col>
      <el-col :span="7">
        <el-button :disabled="branch.is_current === false" icon="el-icon-refresh" type="warning" size="mini" @click="rebase()" round></el-button>
        <el-button icon="el-icon-delete" type="danger" size="mini" @click="deleted()" round></el-button>
      </el-col>
    </el-footer>
    <console-page
      v-bind:cpvisible.sync="console.cpvisible"
      v-bind:loading="console.loading"
      v-bind:title="console.title"
      v-bind:message="console.message">
    </console-page>
    <develop-form
      v-bind:dfvisible.sync="dfvisible"
      v-bind:branch="branch">
    </develop-form>
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  import CommandLine from '../../../util/CommandLine.js'
  import ConsolePage from '../common/console/ConsolePage'
  import DevelopForm from './DevelopForm'
  import DevelopService from '../../../service/DevelopService.js'

  export default {
    name: 'develop-info-page',
    components: { ModuleInformation, ConsolePage, DevelopForm },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        dfvisible: false,
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
        branch: {
          is_current: false,
          is_remote: false,
          home_branch_name: '',
          involve_modules: []
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
        this.branch.involve_modules.forEach((module, index) => {
          module.status = 'normal'

          if (this.branch.is_current === true) {
            module.status = 'current'

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
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.console.cpvisible = true
          this.console.loading = true
          this.console.title = 'Finish the branch: ' + this.branch.home_branch_name
          this.console.message = ''

          this.post({
            name: 'big',
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'finish'
            ]
          }, (message) => {
            if (message === 'true' || message === 'false') {
              this.console.loading = false
              return
            }
            this.console.message += message + '\r\n'
          })
        }).catch(() => {
        })
      },
      publish () {
        this.$confirm('Publish this ' + this.project.type + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.console.cpvisible = true
          this.console.loading = true
          this.console.title = 'Publish the branch: ' + this.branch.home_branch_name
          this.console.message = ''

          this.post({
            name: 'big',
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'publish'
            ]
          }, (message) => {
            if (message === 'true' || message === 'false') {
              this.console.loading = false
              return
            }
            this.console.message += message + '\r\n'
          })
        }).catch(() => {
        })
      },
      pull () {
        this.console.cpvisible = true
        this.console.loading = true
        this.console.title = 'Pull changes from remote for the branch: ' + this.branch.home_branch_name
        this.console.message = ''

        this.post({
          name: 'big',
          params: [
            '-p',
            this.project.path,
            this.project.type,
            'pull'
          ]
        }, (message) => {
          if (message === 'true' || message === 'false') {
            this.console.loading = false
            return
          }
          this.console.message += message + '\r\n'
        })
      },
      pushTo () {
      },
      rebase () {
        this.console.cpvisible = true
        this.console.loading = true
        this.console.title = 'Rebase changes for the branch: ' + this.branch.home_branch_name
        this.console.message = ''

        this.post({
          name: 'big',
          params: [
            '-p',
            this.project.path,
            this.project.type,
            'rebase'
          ]
        }, (message) => {
          if (message === 'true' || message === 'false') {
            this.console.loading = false
            return
          }
          this.console.message += message + '\r\n'
        })
      },
      deleted () {
        this.$confirm('Delete this ' + this.project.type + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.console.cpvisible = true
          this.console.loading = true
          this.console.title = 'Delete the branch: ' + this.branch.home_branch_name
          this.console.message = ''

          this.post({
            name: 'big',
            params: [
              '-p',
              this.project.path,
              this.project.type,
              'delete',
              this.branch.home_branch_name
            ]
          }, (message) => {
            if (message === 'true' || message === 'false') {
              this.console.loading = false
              if (message === 'true') {
                this.push('/home')
              }
              return
            }
            this.console.message += message + '\r\n'
          })
        }).catch(() => {
        })
      },
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

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
