<template>
  <el-dialog title="Add new project" :visible.sync="visible" width="80%" append-to-body>
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="Type" style="margin-top: 20px">
        <el-radio-group v-model="radio.type" size="small">
          <el-radio-button label="Local"></el-radio-button>
          <el-radio-button disabled label="Remote"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Path">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item label="User">
        <el-input v-model="form.user">mmoaay</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import ProjectService from '../../../service/project_service.js'
  export default {
    props: {
      pfvisible: Boolean
    },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.pfvisible
        },
        // setter
        set: function (newValue) {
          console.log('newValue')
          this.$emit('update:pfvisible', newValue)
        }
      }
    },
    data () {
      return {
        form: {
          name: 'LPDTeamiOS',
          path: '/Users/mmoaay/Documents/eleme/LPDTeamiOS',
          user: 'mmoaay',
          type: 'feature',
          branch: ''
        },
        radio: {
          type: 'Local'
        }
      }
    },
    methods: {
      onSubmit () {
        if (ProjectService.add(this.form) === false) {
          this.$message({
            message: 'There is already a project with path: ' + this.form.path,
            type: 'warning'
          })
          return
        }

        ProjectService.setCurrent(this.form)
        this.push('/home')

        this.visible = false
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
