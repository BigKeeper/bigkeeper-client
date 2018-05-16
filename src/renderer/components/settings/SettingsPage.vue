<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div>
        <div class="title alt">Settings</div>
        <el-button @click="clear" round>Clear all caches</el-button>
      </div>
    </main>
  </div>
</template>

<script>
  import ProjectService from '../../../service/project_service.js'

  export default {
    name: 'setting-page',
    methods: {
      clear () {
        this.$confirm('Clear all caches?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel'
        }).then(() => {
          ProjectService.clear()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.$router.push('/landing')
        }).catch(() => {
        })
      }
    }
  }
</script>

<style>
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }
</style>
