<template>
  <div>
    <el-container class="home-container">
      <el-aside class="el-aside" style="width:62px">
        <div class="information">
          <project-information></project-information>
        </div>
        <el-menu class="el-menu" :collapse=true active-text-color="#ffd04b" :default-active="menuIndex" :active="menuIndex">
          <el-menu-item index="1" @click="push('/home', 'feature')">
            <i class="el-icon-view"></i>
            <span slot="title">Feature</span>
          </el-menu-item>
          <el-menu-item index="2" @click="push('/home', 'hotfix')">
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
            <el-menu-item index="4-1"  @click="push('/home', 'images')"><i class="el-icon-picture"></i>Images</el-menu-item>
            <el-menu-item index="4-2"  @click="push('/home', 'podfile')"><i class="el-icon-document"></i>Podfile</el-menu-item>
          </el-submenu>
          <el-menu-item index="5" @click="push('/home', 'settings')">
            <i class="el-icon-setting"></i>
            <span slot="title">Feature</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
  import ElementUI from 'element-ui'
  import ProjectInformation from '../project/ProjectInformation'
  import ProjectService from '../../../service/ProjectService.js'

  export default {
    name: 'home-page',
    watch: {
      '$route' (to, from) {
        this.$router.go(0)

        if (to.name === 'home-page') {
          this.refresh()
        }
      }
    },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        project: {
          name: '',
          path: '',
          user: '',
          type: 'feature',
          branch: ''
        },
        menuIndex: '1'
      }
    },
    components: { ElementUI, ProjectInformation },
    methods: {
      push (link, type) {
        this.project.type = type
        ProjectService.update(this.project)
        ProjectService.setCurrent(this.project)

        this.$router.push(link)
      },
      refresh () {
        this.project = ProjectService.current()
        console.log(this.project.type)
        if (this.project.type === 'feature') {
          this.menuIndex = '1'
          this.$router.push('/home/develop')
        } else if (this.project.type === 'hotfix') {
          this.menuIndex = '2'
          this.$router.push('/home/develop')
        } else if (this.project.type === 'images') {
          console.log('toolbox-images')
          this.menuIndex = '4-1'
          this.$router.push('/home/toolbox-images')
        } else {
          this.menuIndex = '5'
          this.$router.push('/home/settings')
        }
      }
    }
  }
</script>

<style scoped>
  .home-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }

  .el-aside {
    color: #333;
    width: 62px;
    background-color:#545c64;
  }

  .el-menu {
    background-color: #545c64;
    width: 63px;
    text-color: #fff;
  }

  .information {
    height: 60px;
    width: 62px;
  }
</style>
