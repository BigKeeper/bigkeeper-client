<template>
  <el-dialog title="Start a Feature" :visible.sync="visible" width="80%">
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Full name">
        <div>2.9.5_mmoaay_heiheihei<el-button class="el-icon-info" style="margin-left: 10px" type="text"></el-button></div>
      </el-form-item>
      <el-form-item label="Modules" style="margin-top: 20px">
        <el-transfer
          filterable
          :filter-method="filterModules"
          filter-placeholder="Please input a name"
          v-model="results"
          :data="modules"
          :titles="['Remain Modules', 'Added Modules']">
        </el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Start</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      dfvisible: Boolean
    },
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
      const generateModules = _ => {
        const data = []
        const modules = ['LPDOrderModule', 'LPDOrderService', 'LPDUserService', 'LPDUserModule']
        modules.forEach((module, index) => {
          data.push({
            label: module,
            key: index
          })
        })
        return data
      }
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
          type: 'Feature'
        },
        modules: generateModules(),
        results: [],
        filterModules (query, item) {
          return item.label.indexOf(query) > -1
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
