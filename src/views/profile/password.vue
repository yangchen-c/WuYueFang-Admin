<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="dataForm.phone" />
      </el-form-item>
      <el-form-item label="原密码" prop="oldPwd">
        <el-input v-model="dataForm.oldPwd" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <el-input v-model="dataForm.newPwd" type="password" auto-complete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="newPwd2">
        <el-input v-model="dataForm.newPwd2" type="password" auto-complete="off" />
      </el-form-item>
    </el-form>
    <div style="margin-left:100px;">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="change">确定</el-button>
    </div>
  </div>
</template>

<script>
import { passwordUpdate } from '@/api/login'

export default {
  name: 'ChangePassword',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        phone: '',
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        oldPwd: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.dataForm = {
        phone: '',
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    change() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return
        }
        passwordUpdate(this.dataForm).then(response => {
          this.$notify.success({
            title: '成功',
            message: '修改密码成功'
          })
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.message
          })
        })
      })
    }
  }
}
</script>
