<template>
  <div>
    <div class="console">
      <console-page v-on:updateList="updateList"></console-page>
    </div>
    <el-table ref="table" stripe :data="imagelist" class="el-table-filter"
      highlight-current-row @current-change="handleCurrentChange">
        <el-table-column
          fixed
          type="index"
          label="序号"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="file_name"
          label="文件名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="pic"
          label="缩略图"
          width="150"
          align="center">
          <template slot-scope="{row}">
          <img :src="`file://${row.pic}`"  min-width="30" height="30" />
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="数量"
          width="70"
          align="center">
        </el-table-column>
        <el-table-column
          prop="path"
          label="文件地址">
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import ConsolePage from './ConsolePage'
  import CommandLine from '../../../util/CommandLine.js'
  export default {
    name: 'image-page',
    components: {
      ConsolePage
    },
    data () {
      return {
        project: {
          name: '',
          path: '',
          user: '',
          type: 'image',
          branch: ''
        },
        imagelist: []
      }
    },
    methods: {
      updateList: function (dataList) {
        console.log(dataList)
        this.imagelist = dataList
        this.loading = false
      },

      handleCurrentChange (val) {
        this.$message({
          message: val.file_name,
          type: 'warning'
        })
      },

      onCancel () {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      get: CommandLine.get
    }
  }
</script>

<style scoped>

.console {
  width: 100%;
  height: 160px;
  position: fixed;
}

.el-table-filter {
  width: 100%;
  height: 100%;
  top: 160px;
  position: fixed;
  overflow-y: scroll;
  overflow-x: scroll;
}

.image-console-container {
  width: 100vw;
  height: 140px;
  background-color: #f5f7fa;
}

.image-menu-item-background {
  width: 120px;
  display: flex;
  left: 0px;
  right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.image-menu-item-title {
  flex: 1;
  width: 210px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
