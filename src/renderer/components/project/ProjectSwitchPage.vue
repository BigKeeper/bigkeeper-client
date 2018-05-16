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
    style="width: 100%">
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
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" round></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" round></el-button>
      </template>
    </el-table-column>
  </el-table>
  <project-form v-bind:pfvisible.sync="pfvisible"></project-form>
  </el-dialog>
</template>

<script>
  import ProjectService from '../../../service/project_service.js'
  import ProjectForm from './ProjectForm'
  export default {
    mounted () {
      this.projects = ProjectService.projects
    },
    props: {
      psgvisible: Boolean
    },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.psgvisible
        },
        // setter
        set: function (newValue) {
          console.log('newValue')
          this.$emit('update:psgvisible', newValue)
        }
      }
    },
    data () {
      return {
        projects: [],
        pfvisible: false
      }
    },
    components: { ProjectForm },
    methods: {
      onSubmit () {
        this.visible = false
        this.push('/home/develop')
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
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
</style>
