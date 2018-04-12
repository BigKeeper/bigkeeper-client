<template>
  <div id="wrapper">
    <el-container style="height: 600px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-container style="height: 160px; border: 1px solid #eee">
        </el-container>
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-view"></i>Feature</template>
            <el-menu-item index="1-1">2.9.0_mmoaay_hello</el-menu-item>
            <el-menu-item index="1-2">2.8.0_mmoaay_fuck</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-bell"></i>Hotfix</template>
            <el-menu-item index="1-1">2.9.0_mmoaay_hello</el-menu-item>
            <el-menu-item index="1-2">2.8.0_mmoaay_fuck</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-upload"></i>Release</template>
            <el-menu-item index="1-1">Modules</el-menu-item>
            <el-menu-item index="1-2">Home</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>Toolbox</template>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-collum>
              <div class="left">
                <el-input placeholder="Please input a name" v-model="input5" class="input-with-select" autosize="true">
                  <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="Feature" value="1"></el-option>
                    <el-option label="Hotfix" value="2"></el-option>
                  </el-select>
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
              <div class="left">
                <el-button type="primary" icon="el-icon-plus"></el-button>
              </div>
          </el-collum>
        </el-header>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
export default {
  name: 'home-page',
  components: { ElementUI },
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.left {
    float: left;
}

</style>
