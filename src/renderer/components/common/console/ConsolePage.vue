<template>
  <el-dialog :title="title" :show-close=false :close-on-click-modal=false :close-on-press-escape=false :visible.sync="visible" width="80%" append-to-body>
    <el-input
      type="textarea"
      :rows=10
      :disabled="true"
      v-model="message" class="console-page">
    </el-input>
    <el-button type="primary" style="margin-top: 10px; text-align: right;" round :loading="loading" @click="onCancel">{{loading? 'Processing' : 'Done'}}</el-button>
  </el-dialog>
</template>

<script>
  import CommandLine from '../../../../util/CommandLine.js'
  export default {
    props: {
      cpvisible: Boolean,
      params: Array,
      title: String
    },
    watch: {
      params: function (val) {
        this.loading = true
        this.message = ''

        this.post({
          name: 'big',
          params: this.params
        }, (message) => {
          if (message === 'true' || message === 'false') {
            this.loading = false
            this.result = (message === 'true')
            return
          }
          this.message += message + '\r\n'
        })
      }
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
        loading: true,
        message: '',
        result: false
      }
    },
    methods: {
      onCancel () {
        if (this.result === true) {
          this.push('/home')
        }
        this.visible = false
      },
      push (link) {
        this.$router.push(link)
      },
      post: CommandLine.post
    }
  }
</script>
