<template>
  <div>Dashboard  </div>
</template>

<script>
  export default {
    name: 'dashboard-page'
  }
</script>

<style scoped>

.console {
  width: 100%;
  height: 160px;
  position: fixed;
}

.el-table-filter {
  width: 100%;
  height: 100%;
  top: 160px;
  position: fixed;
  overflow-y: scroll;
  overflow-x: scroll;
}

.image-console-container {
  width: 100vw;
  height: 140px;
  background-color: #f5f7fa;
}

.image-menu-item-background {
  width: 120px;
  display: flex;
  left: 0px;
  right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.image-menu-item-title {
  flex: 1;
  width: 210px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
