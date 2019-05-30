<template>
  <el-dialog :title="branch !== undefined ? 'Update the ' + project.type + ': ' + branch.home_branch_name : 'Start a ' + project.type" :visible.sync="visible" width="80%">
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="Name">
        <el-input v-model="form.name" :disabled="branch !== undefined" placeholder="Please input a name"></el-input>
      </el-form-item>
      <el-form-item label="Version">
        <el-input v-model="form.version" :disabled="branch !== undefined" placeholder="Please input the current development version"></el-input>
      </el-form-item>
      <el-form-item label="Full name">
        <div>{{ form.version + '_' + project.user + '_' + form.name }}<el-button class="el-icon-info" style="margin-left: 10px" type="text"></el-button></div>
      </el-form-item>
      <el-form-item label="Modules" style="margin-top: 20px">
        <el-transfer
          filterable
          :filter-method="filterModules"
          filter-placeholder="Please input a name"
          v-model="results"
          :data="sources"
          :titles="['Remain Modules', 'Added Modules']">
        </el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{branch !== undefined ? "Update" : "Start"}}</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <console-page
      v-bind:cpvisible.sync="cpvisible"
      v-bind:params="console.params"
      v-bind:title="console.title">
    </console-page>
  </el-dialog>
</template>

<script>
  import ProjectService from '../../../service/ProjectService.js'
  import CommandLine from '../../../util/CommandLine.js'
  import ConsolePage from '../common/console/ConsolePage'

  export default {
    props: {
      dfvisible: Boolean,
      branch: Object
    },
    watch: {
      dfvisible: function (val) {
        if (val === true) {
          this.project = ProjectService.current()
          this.form.version = ProjectService.getCurrentVersion(this.project.path)
          this.loadModules()
        }
      }
    },
    components: { ConsolePage },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.dfvisible
        },
        // setter
        set: function (newValue) {
          console.log('newValue')
          this.$emit('update:dfvisible', newValue)
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
        form: {
          name: '',
          version: '',
          modules: []
        },
        modules: [],
        sources: [],
        results: [],
        filterModules (query, item) {
          return item.label.indexOf(query) > -1
        }
      }
    },
    methods: {
      onSubmit () {
        if (this.form.name === '') {
          this.$message.error(this.project.type + ' name is required!')
          return
        }

        if (this.form.version === '') {
          this.$message.error(this.project.type + ' version is required!')
          return
        }

        var modules = []
        this.results.forEach((result, index) => {
          console.log(result)
          let module = this.modules[result]
          modules.push(module)
        })
        this.form.modules = modules
        console.log(this.form)

        var params = []
        if (this.branch !== undefined) {
          this.console.title = 'Update the branch: ' + this.branch.home_branch_name
          params = [
            '-p',
            this.project.path,
            this.project.type,
            'update'
          ]
        } else {
          this.console.title = 'Start the branch: ' + this.form.version + '_' + this.project.user + '_' + this.form.name
          params = [
            '-v',
            this.form.version,
            '-u',
            this.project.user,
            '-p',
            this.project.path,
            this.project.type,
            'start',
            this.form.name
          ]
        }
        this.form.modules.forEach((module, index) => {
          params.push(module.module_name)
        })

        this.console.params = params
        this.cpvisible = true
      },
      onCancel () {
        this.visible = false
      },
      push (link) {
        this.$router.push(link)
      },
      loadModules () {
        if (this.branch !== undefined) {
          var fullName = this.branch.home_branch_name
          this.form.version = fullName.substr(0, fullName.indexOf('_'))
          fullName = fullName.substr(fullName.indexOf('_') + 1)
          fullName = fullName.substr(fullName.indexOf('_') + 1)
          this.form.name = fullName
        }

        this.loading = true
        this.get("big -l false -u '" + this.project.user + "' -p '" + this.project.path + "' spec list", (data) => {
          if (data === null) {
            data = []
          }

          this.modules = data
          var sources = []
          var results = []
          data.forEach((module, index) => {
            sources.push({
              label: module.module_name,
              key: index
            })

            if (this.branch !== undefined) {
              this.branch.involve_modules.forEach((tmpModule, tmpIndex) => {
                if (tmpModule.module_name === module.module_name) {
                  results.push(index)
                }
              })
            }
          })
          this.sources = sources
          this.results = results
          this.loading = false
        })
      },
      get: CommandLine.get
    }
  }
</script>
