<template lang="html">
  <el-card shadow="hover" :body-style="{ padding: '0px' }">
    <div slot="header" class="clearfix">
      <span>{{ module.module_name }}</span>
      <span class="row" style="float: right">
        <el-badge :hidden=true :value="6" class="item">
          <el-tooltip content="changes" placement="top">
            <el-button size="mini" class="el-icon-news" round></el-button>
          </el-tooltip>
        </el-badge>
        <el-badge :hidden=true :value="2" class="item">
          <el-tooltip content="commits" placement="top">
            <el-button size="mini" class="el-icon-arrow-up" round></el-button>
          </el-tooltip>
        </el-badge>
        <el-badge :hidden=true :value="12" class="item">
          <el-tooltip content="stashes" placement="top">
            <el-button size="mini" class="el-icon-goods" round></el-button>
          </el-tooltip>
        </el-badge>
      </span>
    </div>
    <div style="padding-left: 20px; padding-top: 30px; padding-right: 20px; padding-bottom: 30px;" v-bind:style="statusStyle">
      {{ module.current_branch + ' - ' + module.status}}
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    module: Object
  },
  computed: {
    statusStyle: function () {
      if (this.module.status === 'error') {
        return {
          'color': 'white',
          'background': '#F56C6C'
        }
      } else if (this.module.status === 'deleted') {
        return {
          'color': 'white',
          'background': '#E6A23C'
        }
      } else if (this.module.status === 'finished') {
        return {
          'color': 'white',
          'background': '#67C23A'
        }
      } else if (this.module.status === 'current') {
        return {
          'color': '#67C23A',
          'background': 'white'
        }
      } else {
        return {
          'color': 'black',
          'background': 'white'
        }
      }
    }
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
