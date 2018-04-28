<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px; display: flex;">

        <div style="flex: 1;">
          <el-input placeholder="Please input a name" autosize="true">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>

        <div style="flex: none; width: 110px;">
          <el-button type="primary" icon="el-icon-plus" @click="push('/home/add_feature_hotfix')" circle></el-button>
          <el-button icon="el-icon-setting" circle></el-button>
        </div>
    </el-header>
    <el-main>
      <el-card class="box-card" shadow="hover">
        <el-badge :value="12" class="item">
          <el-button size="small" round>changes</el-button>
        </el-badge>
        <el-badge :value="12" class="item">
          <el-button size="small" round>commits</el-button>
        </el-badge>
        <el-badge :value="12" class="item">
          <el-button size="small" round>stash</el-button>
        </el-badge>
        <div slot="header" class="clearfix">
          <span>LPDOrderModule</span>
          <el-button style="float: right; padding: 3px 0" type="text">Pull request</el-button>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'feature-hotfix-page',
    methods: {
      push (link) {
        this.$router.push(link)
      }
    }
  }
</script>
