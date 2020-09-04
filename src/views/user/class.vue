<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button> -->
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="100" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级名称" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总课时" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.total_times }}</span>
        </template>
      </el-table-column>
      <el-table-column label="剩余课时" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remain_times }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="userRole === '0'" label="所属区域" prop="regionId">
          <el-select v-model="dataForm.regionId" placeholder="请选择所属区域" @change="changeRegionList">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="userRole === '0' || userRole === '1' || userRole === '2'" label="所属校区" prop="campusId">
          <el-select v-model="dataForm.campusId" placeholder="请选择所属校区" @change="changeSchoolList">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属班级" prop="class_id">
          <el-select v-model="dataForm.class_id" placeholder="请选择所属班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="总课时" prop="total_times">
          <el-input v-model="dataForm.total_times" type="textarea" />
        </el-form-item> -->
        <!-- <el-form-item label="剩余课时" prop="remain_times">
          <el-input v-model="dataForm.remain_times" type="textarea" />
        </el-form-item> -->
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { schoolAllByRegionId, classAllBySchoolId } from '@/api/school'
import { areaAll } from '@/api/area'
import { studentClassList, studentClassDelete, studentClassAdd, studentClassUpdate } from '@/api/user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'StudentClassMgmt',
  components: { Pagination },
  data() {
    return {
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
        name: '',
        studentName: '',
        staffName: ''
      },
      dataForm: {
        id: undefined,
        remark: undefined,
        class_id: undefined
        // total_times: undefined,
        // remain_times: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        // total_times: [{ required: true, message: '请输入总课时', trigger: 'blur' }],
        class_id: [{ required: true, message: '请选择所属班级', trigger: 'blur' }],
        regionId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        campusId: [{ required: true, message: '请选择所属校区', trigger: 'blur' }]
      },
      areaList: [],
      schoolList: [],
      classList: []
    }
  },
  created() {
    this.getList()
    if (this.userRole === '0') {
      this.getRegionList()
    }
    if (this.userRole === '1' || this.userRole === '2') {
      this.getSchoolList(this.$store.state.user.regionId)
    }
    if (this.userRole === '6' || this.userRole === '7') {
      this.getClassList(this.$store.state.user.campusId[0])
    }
  },
  methods: {
    changeSchoolList(e) {
      this.getClassList(e)
    },
    getClassList(campus_id) {
      const params = {
        campus_id
      }
      classAllBySchoolId(params).then(res => {
        this.classList = res.data.data
      }).catch(() => {
        this.classList = []
      })
    },
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      // const userId = this.$route.params.id
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        studentId: this.$route.params.id,
        staffId: 0,
        classId: 0,
        studentName: this.listQuery.studentName,
        name: this.listQuery.name,
        staffName: this.listQuery.staffName
      }
      studentClassList(params).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        remark: undefined,
        class_id: undefined
        // total_times: undefined,
        // remain_times: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.dataForm)
          data.student_id = this.$route.params.id
          data.staff_id = 2
          studentClassAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '添加成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '添加失败'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.dataForm)
          data.student_id = this.$route.params.id
          data.staff_id = 2
          studentClassUpdate(data).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '修改失败'
            })
          })
        }
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      if (row.remain_times > 0) {
        this.$confirm('该学员还有剩余课时，确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          studentClassDelete(params).then(response => {
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '删除失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        studentClassDelete(params).then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
        }).catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.message ? response.data.message : '删除失败'
          })
        })
      }
    }
  }
}
</script>
