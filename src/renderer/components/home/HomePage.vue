<template>
  <div>
    <el-container class="home-container">
      <el-aside width="63px" style="background-color:#545c64">
        <div style="height: 60px">
          <project-information></project-information>
        </div>
        <el-menu :collapse=true background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1" @click="push('/home/develop')">
            <i class="el-icon-view"></i>
            <span slot="title">Feature</span>
          </el-menu-item>
          <el-menu-item index="2" @click="push('/landing')">
            <i class="el-icon-bell"></i>
            <span slot="title">Hotfix</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-upload"></i></template>
            <el-menu-item index="3-1"><i class="el-icon-menu"></i>Modules</el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-mobile-phone"></i>Home</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-goods"></i></template>
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
import ProjectInformation from '../project/ProjectInformation'
export default {
  name: 'home-page',
  components: { ElementUI, ProjectInformation },
  methods: {
    push (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style scoped>
  .home-container {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: 100%; width: 100%;
  }

  .el-aside {
    color: #333;
  }
</style>
