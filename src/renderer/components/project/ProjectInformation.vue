<template>
  <div>
    <div style="text-align: center;" @click="psgvisible = true">
      <el-button type="text" @click>
        <img width="36px" height="36px" style="border-radius: 50%" src="~@/assets/project_icon_ios.png">
      </el-button>
    </div>
    <project-switch-page v-bind:psgvisible.sync="psgvisible"></project-switch-page>
  </div>
</template>

<script>
  import ProjectSwitchPage from './ProjectSwitchPage'

  export default {
    components: { ProjectSwitchPage },
    data () {
      return {
        psgvisible: false,
        name: this.$route.name,
        gridData: [{
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
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
