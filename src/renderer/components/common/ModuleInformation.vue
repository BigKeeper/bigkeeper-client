<template lang="html">
  <el-card shadow="hover">
    <div slot="header" class="clearfix">
    <!-- <div slot="header" class="clearfix" style="background-color:#66b1ff"> -->
      <span>{{ module.module_name }}</span>
      <span class="row" style="float: right">
        <el-badge :value="6" class="item">
          <el-tooltip content="changes" placement="top">
            <el-button size="mini" class="el-icon-news" round></el-button>
          </el-tooltip>
        </el-badge>
        <el-badge :value="2" class="item">
          <el-tooltip content="commits" placement="top">
            <el-button size="mini" class="el-icon-arrow-up" round></el-button>
          </el-tooltip>
        </el-badge>
        <el-badge :value="12" class="item">
          <el-tooltip content="stashes" placement="top">
            <el-button size="mini" class="el-icon-goods" round></el-button>
          </el-tooltip>
        </el-badge>
      </span>
    </div>
    <div>
      {{ module.current_branch }}
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    module: Object
  }
}
</script>

<style lang="css">
  .item {
    margin-left: 10px;
  },

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
