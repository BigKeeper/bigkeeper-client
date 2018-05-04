<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px; display: flex;">

        <div style="flex: 1;">
          <el-input placeholder="Please input a name" autosize="true">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div style="flex: none; width: 110px;">
          <el-button type="primary" icon="el-icon-plus" @click="showDialog" circle></el-button>
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
    <develop-form v-bind:developFormVisible.sync="visible"
              v-on:hideDialog="hideDialog"></develop-form>
  </el-container>
</template>

<script>
  import ModuleInformation from '../common/ModuleInformation'
  import DevelopForm from './DevelopForm'
  export default {
    data () {
      return {
        developFormVisible: false
      }
    },
    watch: {
      developFormVisible: function (val) {
        console.log('developFormVisible:' + val)
      }
    },
    name: 'feature-hotfix-page',
    components: { ModuleInformation, DevelopForm },
    methods: {
      push (link) {
        this.$router.push(link)
      },
      showDialog () {
        console.log('showDialog old:' + this.developFormVisible)
        this.developFormVisible = true
        console.log('showDialog:' + this.developFormVisible)
      },
      hideDialog (event) {
        console.log('hideDialog old:' + this.developFormVisible)
        this.developFormVisible = event
        console.log('hideDialog:' + this.developFormVisible)
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
