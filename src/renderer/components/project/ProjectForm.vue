<template>
  <el-dialog title="Add new project" :visible.sync="visible" :before-close="handleClose" width="80%">
    <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Path">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Type" style="margin-top: 20px">
        <el-radio-group v-model="radio.type" size="small">
          <el-radio-button label="Feature"></el-radio-button>
          <el-radio-button label="Hotfix"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动区域" style="margin-top: 20px">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      pfvisible: Boolean
    },
    computed: {
      visible: {
        // getter
        get: function () {
          return this.pfvisible
        },
        // setter
        set: function (newValue) {
          console.log('newValue')
          this.$emit('update:pfvisible', newValue)
        }
      }
    },
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        radio: {
          type: 'Feature'
        }
      }
    },
    methods: {
      handleClose (done) {
        done()
        this.visible = false
      },
      onSubmit () {
        this.visible = false
        this.push('/home/develop')
      },
      onCancel () {
        this.visible = false
      },
      push (link) {
        this.$router.push(link)
      }
    }
  }
</script>
