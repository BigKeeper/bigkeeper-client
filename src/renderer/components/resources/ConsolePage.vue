<template>
  <el-container>
  <div class="console-container">
    <el-form ref="form" :model="form" label-width="100px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="检索模式">
          <el-select v-model="form.mode" placeholder="选择检索模式" @change="changeType">
            <el-option label="同名资源" value="name"></el-option>
            <el-option label="相似资源" value="content"></el-option>
            <el-option label="大图检索" value="size"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="过滤重复">
          <el-switch v-model="form.isFilter"></el-switch>
        </el-form-item>
      </el-col>
    </el-row>
      <el-form-item label="图片格式">
        <el-row>
          <el-col :span="14" style="text-align: center;">
           <el-checkbox-group v-model="form.type" style="text-align: left;">
              <el-checkbox label="PNG" name="type"></el-checkbox>
              <el-checkbox label="JPEG" name="type"></el-checkbox>
              <el-checkbox label="PDF" name="type"></el-checkbox>
              <el-checkbox label="GIF" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="10" style="text-align: left;">
            <el-button type="primary" @click="onSubmit">检索</el-button>
            <el-button @click="onCancel">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
  </el-container>
</template>

<script>
  import CommandLine from '../../../util/CommandLine.js'
  import ProjectService from '../../../service/ProjectService.js'
  export default {
    name: 'image-console-page',
    data () {
      return {
        project: {
          name: '',
          path: '',
          user: '',
          type: 'image',
          branch: ''
        },
        form: {
          loading: false,
          name: '',
          mode: 'name',
          isFilter: false,
          type: [],
          resource: '',
          imagelist: []
        },
        loading: false
      }
    },
    methods: {
      changeType (newValue) {
        console.log(newValue)
        this.mode = newValue
        this.$emit('updateType', newValue)
      },
      onSubmit () {
        this.loading = true
        this.project = ProjectService.current()
        console.log("cd /Users/serenar/Desktop/github/bigkeeper/bin && ./big -u '" + this.project.user + "' -p '" + this.project.path + "' " + this.project.type + ' ' + this.form.mode)
        this.get("cd /Users/serenar/Desktop/github/bigkeeper/bin && ./big -u '" + this.project.user + "' -p '" + this.project.path + "' " + this.project.type + ' ' + this.form.mode, (data) => {
          if (data === null) {
            data = []
            console.log('null')
          }
          var arrs = []
          if (this.form.mode === 'name') {
            data.forEach((item, index) => {
              item.pic = item.path[0]
              if (item.count > 1) {
                arrs.push(item)
              }
            })
          } else if (this.form.mode === 'content') {
            data.forEach((item, index) => {
              item.pic = item.path[0]
              if (item.count > 1) {
                arrs.push(item)
              }
            })
          }

          this.imagelist = arrs
          this.$emit('updateList', data)
        })
      },
      onCancel () {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      get: CommandLine.get
    }
  }
</script>

<style scoped>

.line{
  text-align: center;
}
.console-container {
  padding: 20px;
  width: 100vw;
  height: 120px;
  background-color: #f5f7fa;
}

.develop-menu-item-background {
  width: 120px;
  display: flex;
  left: 0px;
  right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.develop-menu-item-title {
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
