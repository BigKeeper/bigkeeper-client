<template>
  <div id="wrapper">
    <main>
      <div class="left-side">
        <div class="doc">
          <div class="title">Settings</div>
          <el-button type="warning" @click="clear" round>Clear all cache</el-button>
        </div>
      </div>
      <div class="right-side">
        <div class="doc">
          <div class="title">About us</div>
          <el-button icon="el-icon-star-on" type="success" @click="open('https://github.com/eleme/bigkeeper')" round>Star</el-button>
          <el-button @click="open('https://github.com/orgs/BigKeeper/people')" round>Team</el-button>
        </div>
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
        this.$confirm('This operation will reset all the data, including projects, are you sure?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
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

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .right-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 18px;
    margin-bottom: 50px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }
</style>
