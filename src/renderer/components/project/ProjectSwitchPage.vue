<template>
  <el-dialog title="Switch project" :visible.sync="visible" :before-close="handleClose" width="80%">
    <el-header style="text-align: right; font-size: 12px; display: flex;">

        <div style="flex: 1;">
          <el-input placeholder="Please input a name">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div style="flex: none; width: 110px;">
          <el-button type="primary" icon="el-icon-plus" @click="dfvisible = true" circle></el-button>
          <el-tooltip content="Top center" placement="top">
            <el-button icon="el-icon-setting" circle></el-button>
          </el-tooltip>
        </div>
    </el-header>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      psgvisible: Boolean
    },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.psgvisible
        },
        // setter
        set: function (newValue) {
          console.log('newValue')
          this.$emit('update:psgvisible', newValue)
        }
      }
    },
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      handleClose (done) {
        done()
        this.visible = false
      },
      onSubmit () {
        this.visible = false
        this.push('/home/develop')
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      push (link) {
        this.$router.push(link)
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
</style>
