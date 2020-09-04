<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>添加员工</h3>
      <el-form ref="service" :rules="rules" :model="dataForm" label-width="200px">
        <el-form-item label="员工名称" prop="name" style="width: 500px;">
          <el-input v-model="dataForm.name" placeholder="请输入员工名称" />
        </el-form-item>
        <el-form-item label="员工职位" prop="role" style="width: 500px;">
          <el-select v-model="dataForm.role" placeholder="请选择员工职位">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone" style="width: 500px;">
          <el-input v-model="dataForm.phone" placeholder="请输入员工联系方式" />
        </el-form-item>
        <el-form-item label="所属区域" prop="regionId">
          <el-select v-model="dataForm.regionId" placeholder="请选择所属区域" @change="changeRegionList">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="在职校区" prop="campusId" style="width: 500px;">
          <el-select v-model="dataForm.campusId" placeholder="请选择在职校区">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
import { schoolAllByRegionId } from '@/api/school'
import { areaAll } from '@/api/area'
import { employeeAdd } from '@/api/employee'
import { getToken } from '@/utils/auth'

export default {
  name: 'EmployeeAdd',
  data() {
    return {
      dataForm: {
        name: '',
        phone: '',
        role: '',
        campusId: ''
      },
      rules: {
        name: [{ required: true, message: '请输入员工名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入员工联系方式', trigger: 'blur' }],
        role: [{ required: true, message: '请输入员工职位', trigger: 'blur' }]
        // regionId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }]
        // campusId: [{ required: true, message: '请选择在职校区', trigger: 'blur' }]
      },
      areaList: [],
      schoolList: [],
      roleList: [
        // {
        //   id: 0,
        //   name: '超级管理员'
        // },
        {
          id: 4,
          name: '财务'
        },
        {
          id: 6,
          name: '校长'
        },
        {
          id: 7,
          name: '执行校长'
        },
        {
          id: 8,
          name: '课程顾问'
        },
        {
          id: 9,
          name: '招商专员'
        }
      ]
    }
  },
  computed: {
    headers() {
      return {
        'token': getToken()
      }
    }
  },
  created() {
    this.resetForm()
    this.getRegionList()
  },
  methods: {
    changeRegionList(e) {
      this.getSchoolList(e)
    },
    getSchoolList(regionId) {
      const params = {
        regionId
      }
      schoolAllByRegionId(params).then(res => {
        this.schoolList = res.data.data
      }).catch(() => {
        this.schoolList = []
      })
    },
    getRegionList() {
      areaAll().then(res => {
        this.areaList = res.data.data
      }).catch(() => {
        this.areaList = []
      })
    },
    resetForm() {
      this.dataForm = {
        name: '',
        phone: '',
        role: '',
        campusId: ''
      }
    },
    handleCancel() {
      this.$router.push({ path: '/employee/employeeList' })
    },
    handlePublish() {
      const data = Object.assign({}, this.dataForm)
      employeeAdd(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '添加成功'
        })
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '添加失败'
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

