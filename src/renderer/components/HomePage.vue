<template>
  <div>
    <el-container style="border: 1px solid #eee">
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
            <el-menu-item index="2-1">2.9.0_mmoaay_hello</el-menu-item>
            <el-menu-item index="2-2">2.8.0_mmoaay_fuck</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-upload"></i>Release</template>
            <el-menu-item index="3-1"><i class="el-icon-menu"></i>Modules</el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-mobile-phone"></i>Home</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-goods"></i>Toolbox</template>
            <el-menu-item index="4-1"><i class="el-icon-picture"></i>Images</el-menu-item>
            <el-menu-item index="4-2"><i class="el-icon-document"></i>Podfile</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px; display: flex;">

            <div style="flex: 1;">
              <el-input placeholder="Please input a name" v-model="input5" class="input-with-select" autosize="true">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                  <el-option label="Feature" value="1"></el-option>
                  <el-option label="Hotfix" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>

            <div style="flex: none; width: 110px;">
              <el-button type="primary" icon="el-icon-plus" circle></el-button>
              <el-button icon="el-icon-setting" circle></el-button>
            </div>

        </el-header>
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
export default {
  name: 'home-page',
  components: { ElementUI }
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


</style>
