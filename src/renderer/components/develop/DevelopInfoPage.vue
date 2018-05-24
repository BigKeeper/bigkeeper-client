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
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  import CommandLine from '../../../util/CommandLine.js'
  import ConsolePage from '../common/console/ConsolePage'

  export default {
    name: 'develop-info-page',
    components: { ModuleInformation, ConsolePage },
    mounted () {
      this.refresh()
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
      },
      push (link) {
        this.$router.push(link)
      },
      update () {
      },
      finish () {
      },
      publish () {
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
