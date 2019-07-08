<template>
  <el-dialog title="资源详情" :visible.sync="vis" :before-close="handleClose">
  <el-table :data="gridData">
    <el-table-column
      fixed
      type="index"
      label="序号"
      width="50"
      align="center">
    </el-table-column>
    <el-table-column property="pic" label="缩略图">
      <template slot-scope="{row}">
      <img :src="`file://${row.pic}`"  min-width="30" height="30" />
      </template>
    </el-table-column>
    <el-table-column
    property="module"
    label="模块名称"
     width="400"></el-table-column>
  </el-table>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      rdvisible: Boolean,
      params: Object,
      searchMode: String
    },
    data () {
      return {
        gridData: [],
        vis: false,
        formLabelWidth: '120px'
      }
    },
    watch: {
      searchMode (newValue) {
        this.searchMode = newValue
      },
      rdvisible (newValue, oldValue) {
        this.vis = newValue
      },
      params (newValue) {
        var arr = []
        for (var i = 0; i < newValue.path.length; i++) {
          if (this.searchMode === 'name') {
            arr.push({
              name: newValue.file_name,
              pic: newValue.path[i],
              module: newValue.module[i]
            })
          } else {
            arr.push({
              name: newValue.file_name,
              pic: newValue.path[i],
              module: newValue.path[i]
            })
          }
        }
        this.gridData = arr
      }
    },
    computed: {
      index: {
        // getter
        get: function () {
          return this.params.path.index
        }
      }
    },
    methods: {
      handleClose () {
        this.vis = false
        this.$emit('update:rdvisible', false)
      }
    }
  }
</script>

<style scoped>
  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
  }
  .el-table .current-row {
    background: #5aaffe;
    color: white;
  }
</style>
