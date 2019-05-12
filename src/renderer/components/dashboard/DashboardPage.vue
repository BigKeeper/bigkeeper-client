<template>
<el-container>
  <el-aside width="500px">
    <el-card shadow="always">
      <ve-bar :data="gramChartData"></ve-bar>
      </el-card>
    <el-card shadow="always">
      <ve-pie :data="pieChartData"></ve-pie>
    </el-card>
  </el-aside>
  <el-main>
    <el-card height="400px">
      <el-row class="line-info-row">
      <el-col :span="8">
          <img src="../../assets/coffee.png" class="image">
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">
        <div>共计节省约开发时间 6000+ 分钟</div>
      </div>
      </el-col>
      </el-row>
      <el-row class="line-info-row">
      <el-col :span="8"><div>
          <img src="../../assets/computer.png" class="image">
      </div>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">
        <div>共计执行任务 1200+ 次</div>
      </div>
      </el-col>
      </el-row>
      </el-card>
    <el-card shadow="always">
      <ve-line :data="lineChartData"></ve-line>
    </el-card>
  </el-main>
  </el-container>
</template>

<script>
import VePie from 'v-charts/lib/pie.common'
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'dashboard-page',
  components: { VePie, VeLine },
  data () {
    return {
      pieChartData: {
        columns: ['Conmand', 'times'],
        rows: [
          { 'Conmand': 'feature/start', 'times': 209 },
          { 'Conmand': 'feature/finish', 'times': 86 },
          { 'Conmand': 'feature/switch', 'times': 170 },
          { 'Conmand': 'feature/update', 'times': 261 },
          { 'Conmand': 'feature/list', 'times': 59 },
          { 'Conmand': 'feature/push', 'times': 89 },
          { 'Conmand': 'feature/rebase', 'times': 45 },
          { 'Conmand': 'feature/publish', 'times': 31 },
          { 'Conmand': 'feature/delete', 'times': 40 },
          { 'Conmand': 'feature/pull', 'times': 11 }
        ]
      },
      lineChartData: {
        columns: ['版本号', '执行任务次数', '人均次数'],
        rows: [
          { '版本号': '3.7.5', '执行任务次数': 2, '人均次数': 1 },
          { '版本号': '4.7.0', '执行任务次数': 228, '人均次数': 22 },
          { '版本号': '4.8.0', '执行任务次数': 3, '人均次数': 1 },
          { '版本号': '5.0.0', '执行任务次数': 1, '人均次数': 1 },
          { '版本号': '5.1.0', '执行任务次数': 419, '人均次数': 41 },
          { '版本号': '5.2.0', '执行任务次数': 5, '人均次数': 1 },
          { '版本号': '5.4.0', '执行任务次数': 1, '人均次数': 1 },
          { '版本号': '5.5.0', '执行任务次数': 118, '人均次数': 11 },
          { '版本号': '5.6.0', '执行任务次数': 219, '人均次数': 22 }
        ]
      },
      gramChartData: {
        columns: ['用户', '用户使用次数'],
        rows: [
          { '用户': 'yinyibo', '用户使用次数': 30 },
          { '用户': 'xujinyang', '用户使用次数': 28 },
          { '用户': 'yongguanglyg', '用户使用次数': 16 },
          { '用户': 'serenar', '用户使用次数': 82 },
          { '用户': 'sfm', '用户使用次数': 84 },
          { '用户': 'wankunpan', '用户使用次数': 151 },
          { '用户': 'zly', '用户使用次数': 163 },
          { '用户': 'mmoaay', '用户使用次数': 355 }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .el-header{
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  .line-info-row {
    font-size: 14px;
    height: 40;
  }
</style>
