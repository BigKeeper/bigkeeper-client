<template>
  <el-dialog :title="title" :show-close=false :close-on-click-modal=false :close-on-press-escape=false :visible.sync="visible" width="80%" append-to-body>
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 30}"
      :disabled="true"
      v-model="message">
    </el-input>
    <el-button type="primary" style="margin-top: 10px; text-align: right;" round :loading="loading" @click="onCancel">{{loading? 'Processing' : 'Done'}}</el-button>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      cpvisible: Boolean,
      loading: Boolean,
      title: String,
      message: String
    },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.cpvisible
        },
        // setter
        set: function (newValue) {
          this.$emit('update:cpvisible', newValue)
        }
      }
    },
    data () {
      return {
      }
    },
    methods: {
      onCancel () {
        this.visible = false
      }
    }
  }
</script>
