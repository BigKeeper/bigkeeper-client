<template>
  <el-container>
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
    <el-main>
      <el-row :gutter="12" v-for="(i, index) in 2" :key="i">
        <el-col :span="24" v-for="(j, index) in 4" :key="j" class="row">
          <module-information></module-information>
        </el-col>
      </el-row>
    </el-main>
    <develop-form v-bind:dfvisible.sync="dfvisible"></develop-form>
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  import DevelopForm from './DevelopForm'
  export default {
    data () {
      return {
        dfvisible: false
      }
    },
    name: 'feature-hotfix-page',
    components: { ModuleInformation, DevelopForm },
    methods: {
      push (link) {
        this.$router.push(link)
      },
      update (dfvisible) {
        console.log(dfvisible)
        this.dfvisible = dfvisible
      }
    }
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
