<template>
  <el-dialog title="Add new project" :visible.sync="visible" width="80%">
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="Type" style="margin-top: 20px">
        <el-radio-group v-model="radio.type" size="small">
          <el-radio-button label="Local"></el-radio-button>
          <el-radio-button label="Remote"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Path">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Config">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
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
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        radio: {
          type: 'Local'
        }
      }
    },
    methods: {
      onSubmit () {
        this.visible = false
        this.push('/home/develop')
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
