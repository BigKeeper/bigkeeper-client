<template>
  <div id="wrapper">
    <el-container id="container">
      <el-header class="develop-header">
        <div class="develop-header-search">
          <el-input prefix-icon="el-icon-search" placeholder="Resources Filter" @input="change">
          </el-input>
        </div>
        <div class="develop-header-title">资源检查器</div>
        <el-button icon="el-icon-download" @click="refresh()" circle>Start</el-button>
        <div class="develop-header-button">
        <el-button size="mini" icon="el-icon-sort" @click="refresh()" circle></el-button>
        <el-button size="mini" icon="el-icon-refresh" @click="refresh()" circle></el-button>
        <el-button size="mini" icon="el-icon-download" @click="refresh()" circle></el-button>
        <el-button size="mini" icon="el-icon-download" @click="refresh()" circle></el-button>
        </div>
      </el-header>
      <el-container id="bottom-page">
        <el-aside>
          <ul class="develop-menu" id="imagenames">
            <li class="develop-menu-item" v-for="(value, index) in imagenames">
              <div class="develop-menu-item-background" v-bind:class="{ active: value.home_branch_name === activeBranch, selected: value.is_current === true }">
                <span class="develop-menu-item-title" @click="push(value)">{{ value.home_branch_name }}</span>
                <span>
                  <el-badge :hidden="value.involve_modules.length === 0" :value="value.involve_modules.length.toString()" class="develop-menu-item-badge">
                    <el-button :disabled="value.is_current === true" size="mini" icon="el-icon-sort" @click="switchTo(value)" round></el-button>
                  </el-badge>
                </span>
              </div>
            </li>
          </ul>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
      <router-view></router-view>
      <develop-form
        v-bind:dfvisible.sync="dfvisible">
      </develop-form>
      <console-page
        v-bind:cpvisible.sync="cpvisible"
        v-bind:params="console.params"
        v-bind:title="console.title">
      </console-page>
    </el-container>
  </div>
</template>

<script>
  import ProjectService from '../../../../service/ProjectService.js'

  export default {
    name: 'setting-page',
    methods: {
      data () {
        return {
          imagenames: ['/service/ProjectService1.png',
                       '/service/ProjectService2.png'],
          filteredBranches: ['/service/ProjectService1.png',
                       '/service/ProjectService2.png']
        }
      },
      startSearch () {
        this.$confirm('Start search resources of the same name?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          ProjectService.loading()
          this.$message({
            type: 'success',
            message: 'Search success!'
          })
          // this.$router.push('/landing')
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  #container {
    height: 100vh;
    width: 100vw;
  }

  #bottom-page {
    width: 100%;
    height: calc(100% - 60px);
    background-color:pink;
  }
  #startbutton {
    width:200px;
    height: 50px;
    padding: 10px 80px;

  }

  #el-menu-demo {
    padding: 1px;
    height: 30px;
    margin-left: 0px;
    margin-right: 0px;
    position:absolute;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 30px;
  }

  .develop-header {
    width: 100vw;
    height:60px;
    line-height:60px;
    background-color:rgba(128, 128, 128, 1);
    color: lightgray;
    font-size: 15px;
  }

   .develop-header-search {
    width: 250px;
    display: inline-block;
  }

  .develop-header-title {
    text-align: center;
    display: inline-block;
    margin: 0px 20px;
    /* width: calc(100% - 550px); */
  }

  .develop-header-button {
    flex: 4;
    display: inline-block;
    margin-left: 20px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    /* text-align: center; */
    height: 10vh;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: 160px;
  }

  .develop-menu-item {
    width: 300px;
    display: flex;
    border-top: #eeeeee 1px solid;
  }

  .develop-menu-item-background {
    width: 300px;
    display: flex;
    left: 0px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .develop-menu-item-title {
    flex: 1;
    width: 200px;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .develop-menu {
    width: 300px;
    overflow: auto;
    border: #eeeeee 1px solid;
  }

  .develop-menu-item-badge {
    margin-top: 6px;
    margin-right: 20px;
    margin-left: 10px;
  }

  .develop-menu-item-button {
    padding-left: 10px;
    width: 30px;
    height: 30px;
  }

  #imagenames li:first-child {border-top: none;}
  #imagenames li:hover { background-color:#ebf5ff; }

  /* body > .el-container {
    height: 100%;
  } */

  /* .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
</style>
