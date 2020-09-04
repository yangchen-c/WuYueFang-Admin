<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>佣金设置</h3>
      <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="200px">
        <el-form-item label="佣金" prop="money" style="width: 500px;">
          <el-input v-model="dataForm.money" type="number" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">提交</el-button>
    </div>

  </div>
</template>

<script>
import { commissionList, commissionUpdate } from '@/api/commission'

export default {
  name: 'CommissionMgmt',
  data() {
    return {
      dataForm: {
        money: ''
      },
      rules: {
        money: [{ required: true, message: '请输入佣金', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getBV()
  },
  methods: {
    getBV() {
      commissionList().then(res => {
        const data = res.data.data[0]
        this.dataForm = data
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '获取信息失败'
        })
      })
    },
    handleCancel() {
      this.$router.push({ path: '' })
    },
    handlePublish() {
      const data = Object.assign({}, this.dataForm)

      commissionUpdate(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '设置成功'
        })
        this.getBV()
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '设置失败'
        })
      })
    }
  }
}
</script>

<style>
  .el-card {
    margin-bottom: 10px;
  }
</style>

