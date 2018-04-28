<template>
  <div>
    <el-container style="position:fixed; top: 0; left: 0; right: 0; height: 100%">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <div style="height: 160px; border: 1px solid #eee">
          <project-information></project-information>
        </div>
        <el-menu>
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
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import ProjectInformation from './HomePage/ProjectInformation'
export default {
  name: 'home-page',
  components: { ElementUI, ProjectInformation }
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
