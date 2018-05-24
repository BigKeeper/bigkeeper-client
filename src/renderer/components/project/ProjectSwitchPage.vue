<template>
  <el-dialog title="Switch project" :visible.sync="visible" width="80%">
    <el-header style="text-align: right; font-size: 12px; display: flex;">
        <div style="flex: 1;"></div>
        <div style="flex: none; width: 55px;">
          <el-button type="primary" icon="el-icon-plus" @click="pfvisible = true" circle></el-button>
        </div>
    </el-header>
    <el-table
    :data="projects"
    style="width: 100%"
    :row-class-name="projectRow">
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="user"
      label="User"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="Path">
    </el-table-column>
    <el-table-column label="Operation">
      <template slot-scope="scope">
        <el-button
          size="mini"
          :disabled="current.path === scope.row.path"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-sort" round></el-button>
        <el-button
          size="mini"
          :disabled="current.path === scope.row.path"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" round></el-button>
      </template>
    </el-table-column>
  </el-table>
  <project-form v-bind:pfvisible.sync="pfvisible"></project-form>
  </el-dialog>
</template>

<script>
  import ProjectService from '../../../service/ProjectService.js'
  import ProjectForm from './ProjectForm'
  export default {
    props: {
      psgvisible: Boolean
    },
    watch: {
      psgvisible: function (val) {
        if (val === true) {
          this.projects = ProjectService.projects()
          this.current = ProjectService.current()
        }
      },
      pfvisible: function (val) {
        if (val === false) {
          this.projects = ProjectService.projects()
          this.current = ProjectService.current()
        }
      }
    },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.psgvisible
        },
        // setter
        set: function (newValue) {
          this.$emit('update:psgvisible', newValue)
        }
      }
    },
    data () {
      return {
        current: {
          name: '',
          path: '',
          user: '',
          type: 'feature',
          branch: ''
        },
        projects: [],
        pfvisible: false
      }
    },
    components: { ProjectForm },
    methods: {
      projectRow ({row, rowIndex}) {
        if (this.current.path === row.path) {
          return 'current-row'
        }
        return ''
      },
      handleEdit (index, row) {
        console.log('handleEdit')
        var project = this.projects[index]
        ProjectService.setCurrent(project)
        this.push('/home')

        this.visible = false
      },
      handleDelete (index, row) {
        this.$confirm('Delete project: ' + row.name + '?', 'Notice', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          if (ProjectService.delete(index) === false) {
            this.$message({
              message: 'You can not delete current project',
              type: 'warning'
            })
            return
          }
          this.projects = ProjectService.projects()
        }).catch(() => {
        })
      },
      push (link) {
        this.$router.push(link)
      }
    }
  }
</script>

<style scoped>
  .el-header {
    /* background-color: #B3C0D1; */
    color: #333;
    line-height: 60px;
  }
  .el-table .current-row {
    background: #5aaffe;
    color: white;
  }
</style>
