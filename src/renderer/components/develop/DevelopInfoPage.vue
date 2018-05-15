<template>
  <el-container>
    <el-main>
      <el-row :gutter="12" v-for="(i, index) in 2" :key="i">
        <el-col :span="24" v-for="(j, index) in 8" :key="j" class="row">
          <module-information></module-information>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  export default {
    name: 'develop-info-page',
    components: { ModuleInformation }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .row {
    margin-bottom: 24px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
