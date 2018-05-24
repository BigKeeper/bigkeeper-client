<template>
  <el-dialog title="Start a Feature" :visible.sync="visible" width="80%">
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Version">
        <el-input v-model="form.version"></el-input>
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
        <el-button type="primary" @click="onSubmit">Start</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
    <console-page
      v-bind:cpvisible.sync="console.cpvisible"
      v-bind:loading="console.loading"
      v-bind:title="console.title"
      v-bind:message="console.message">
    </console-page>
  </el-dialog>
</template>

<script>
  import ProjectService from '../../../service/ProjectService.js'
  import CommandLine from '../../../util/CommandLine.js'
  import ConsolePage from '../common/console/ConsolePage'

  export default {
    props: {
      dfvisible: Boolean
    },
    watch: {
      dfvisible: function (val) {
        if (val === true) {
          this.project = ProjectService.current()
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

        this.console.cpvisible = true
        this.console.loading = true
        this.console.title = 'Start the branch: ' + this.form.version + '_' + this.project.user + '_' + this.form.name
        this.console.message = ''

        var params = [
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

        this.form.modules.forEach((module, index) => {
          params.push(module.module_name)
        })

        this.post({
          name: 'big',
          params: params
        }, (message) => {
          if (message === 'true' || message === 'false') {
            this.console.loading = false

            if (message === 'true') {
              this.visible = false
              this.push('/home')
            } else {

            }
            return
          }
          this.console.message += message + '\r\n'
        })
      },
      onCancel () {
        this.visible = false
      },
      push (link) {
        this.$router.push(link)
      },
      loadModules () {
        this.loading = true
        this.get("big -u '" + this.project.user + "' -p '" + this.project.path + "' module list", (data) => {
          if (data === null) {
            data = []
          }

          this.modules = data
          var sources = []
          data.forEach((module, index) => {
            sources.push({
              label: module.module_name,
              key: index
            })
          })
          this.sources = sources
          // this.results = modules
          this.loading = false
        })
      },
      get: CommandLine.get,
      post: CommandLine.post
    }
  }
</script>
