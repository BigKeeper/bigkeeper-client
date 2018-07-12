<!-- <template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/resources_filter.png" alt="electron-vue">
    <main>
      <div>
        <div class="title alt">资源检测</div>
        <el-button @click="clear" round>Start</el-button>
      </div>
    </main>
  </div>
</template>

<script>
  import ProjectService from '../../../service/ProjectService.js'

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
            message: 'Clear success'
          })
          this.$router.push('/landing')
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
        rgba(100, 100, 111, 1) 40%,
        rgba(70, 70, 83, .9) 100%
      );
    height: 100vh;
    /* padding: 60px 80px; */
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
</style> -->
