<template>
  <el-dialog title="Add comment for the push operation" :visible.sync="visible" width="80%">
    <el-form ref="form" :model="form" style="margin-top: 20px">
      <el-form-item>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 30}"
          v-model="form.comment">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Push</el-button>
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
  import ConsolePage from '../common/console/ConsolePage'

  export default {
    props: {
      project: Object,
      branch: Object,
      dpfvisible: Boolean
    },
    components: { ConsolePage },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.dpfvisible
        },
        // setter
        set: function (newValue) {
          console.log('newValue')
          this.$emit('update:dpfvisible', newValue)
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
        form: {
          comment: ''
        }
      }
    },
    methods: {
      onSubmit () {
        if (this.form.comment === '') {
          this.$message.error('Comment is required!')
          return
        }
        this.console = {
          title: 'Push local changes to remote for the branch: ' + this.branch.home_branch_name,
          params: [
            '-p',
            this.project.path,
            this.project.type,
            'push',
            this.form.comment
          ]
        }
        this.cpvisible = true
      },
      onCancel () {
        this.visible = false
      },
      push (link) {
        this.$router.push(link)
      }
    }
  }
</script>
