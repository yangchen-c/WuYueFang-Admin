<template>
  <div class="app-container">

    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane v-if="(userRole != 6 && userRole != 7)" label="教师" name="teacher" />
      <el-tab-pane v-if="(userRole != 3 && userRole != 6 && userRole != 7)" label="教务组长" name="group_leader" />
      <el-tab-pane v-if="(userRole != 3 && userRole != 2 && userRole != 6 && userRole != 7)" label="督导" name="supervision" />
      <el-tab-pane v-if="(userRole != 3 && userRole != 1 && userRole != 6 && userRole != 7)" label="管理员" name="admins" />
      <el-tab-pane v-if="userRole == 0" label="超级管理员" name="super_admin" />
      <el-tab-pane v-if="userRole != 3 && userRole != 6 && userRole != 7" label="财务" name="account" />
      <el-tab-pane v-if="(userRole != 3 && userRole != 6)" label="校长" name="schoolmaster" />
      <el-tab-pane v-if="(userRole != 3 && userRole != 7)" label="执行校长" name="real_schoolmaster" />
      <el-tab-pane v-if="userRole != 3" label="课程顾问" name="course_adviser" />
      <el-tab-pane v-if="userRole != 3" label="招商专员" name="business_invitation" />
    </el-tabs>

    <!-- 统计信息 -->
    <div v-if="tab === 'teacher'" class="filter-container">

      <el-select v-model="financeQuery.teacherId" clearable placeholder="请选择老师" @change="changeTeacherList">
        <el-option
          v-for="item in teacherList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-date-picker
        v-model="financeQuery.dateRange"
        type="datetimerange"
        formt="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeDateRange"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFinanceFilter">查找</el-button>
    </div>

    <div v-if="tab === 'teacher'" class="finance-sum" style="height: 60px; line-height: 60px; background-color: #d3dce6; margin-bottom: 50px; border-radius: 10px; padding: 0 10px;">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">总课时： {{ financeSum.num }}</div></el-col>
      </el-row>
    </div>

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-if="(tab === 'teacher' || tab === 'group_leader' || tab === 'supervision' || tab === 'admins') && (userRole != 3)" class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <!-- <el-select v-model="value" placeholder="请选择所属区域">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="请选择所属校区">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select> -->
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- <div class="operator-container">
      <el-button v-permission="['GET /admin/aftersale/batch-recept']" class="filter-item" type="success" icon="el-icon-info" @click="handleBatchRecept">批量通过</el-button>
      <el-button v-permission="['GET /admin/aftersale/batch-reject']" class="filter-item" type="danger" icon="el-icon-delete" @click="handleBatchReject">批量拒绝</el-button>
    </div> -->

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab === 'group_leader' || tab === 'supervision' || tab === 'admins'" align="center" label="所属区域">
        <template slot-scope="scope">
          <span>{{ scope.row.region ? scope.row.region.name : '' }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="tab === 'admins'" align="center" label="职位">
        <template slot-scope="scope">
          <span>{{ scope.row }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="tab === 'teacher'" align="center" label="出勤率">
        <template slot-scope="scope">
          <span>{{ '出勤率' }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="操作" min-width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="userRole != 3" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="userRole != 3" type="danger" size="mini" style="margin-left: 0;" @click="handleDelete(scope.row)">删除</el-button>
          <router-link v-if="tab === 'teacher'" v-permission="['学生佣金管理']" :to="'/user/cashMgmt/' + scope.row.id + '/staff'">
            <el-button type="success" size="mini" style="padding: 7px 0;">
              佣金管理
            </el-button>
          </router-link>
          <router-link v-if="tab === 'teacher'" v-permission="['教师班级列表']" :to="'/employee/teacherClassList/' + scope.row.id">
            <el-button type="success" size="mini" style="padding: 7px 0;">
              代课班级
            </el-button>
          </router-link>
          <el-button v-if="userRole == 0" type="danger" size="mini" style="padding: 7px 0; margin-left: 0;" @click="handleResetPwd(scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="dataForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item v-if="tab !== 'super_admin' && tab !== 'teacher'" label="所属区域" prop="regionId">
          <el-select v-model="dataForm.regionId" placeholder="请选择所属区域" @change="changeRegionList">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="tab === 'schoolmaster' || tab === 'real_schoolmaster' || tab === 'course_adviser'" label="所属校区" prop="campusId">
          <el-select v-model="dataForm.campusId" placeholder="请选择所属校区">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="tab !== 'super_admin'" label="职位" prop="role">
          <el-select v-model="dataForm.role" placeholder="请选择职位">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<script>
import { passwordReset } from '@/api/login'
import { employeeAdd, employeeList, employeeUpdate, employeeDelete, teacherCourseSum } from '@/api/employee'
import { schoolAllByRegionId, teacherAll } from '@/api/school'
import { areaAll } from '@/api/area'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'
import { parseTime } from '@/utils/index'

export default {
  name: 'EmployeeMgmt',
  components: { BackToTop, Pagination },
  data() {
    return {
      userRole: this.$store.state.user.roles[0],
      list: [],
      total: 0,
      listLoading: true,
      tab: 'teacher',
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        phone: '',
        role: 5
        // campusId: '',
        // regionId: ''
      },
      dataForm: {
        id: undefined,
        name: undefined,
        regionId: undefined,
        campusId: undefined,
        role: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        regionId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        campusId: [{ required: true, message: '请选择所属校区', trigger: 'blur' }],
        role: [{ required: true, message: '请选择职位', trigger: 'blur' }]
      },
      multipleSelection: [],

      areaList: [],
      schoolList: [],

      roleList: [
        {
          id: 1,
          name: '管理员'
        },
        {
          id: 2,
          name: '督导'
        },
        {
          id: 3,
          name: '教务组长'
        },
        {
          id: 4,
          name: '财务'
        },
        {
          id: 5,
          name: '教师'
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
      ],
      financeQuery: {
        teacherId: '',
        dateRange: [new Date(), new Date()]
      },
      financeSum: {
        num: ''
      },
      teacherList: []
    }
  },
  created() {
    const userRole = this.$store.state.user.roles[0]
    if (userRole === '6') {
      this.tab = 'real_schoolmaster'
      this.listQuery.role = 7
    } else if (userRole === '7') {
      this.tab = 'schoolmaster'
      this.listQuery.role = 6
    }
    this.getList()
    this.getRegionList()
    this.getTeacherCourseSum()
    this.getTeacherList()
  },
  methods: {
    getTeacherList() {
      teacherAll().then(res => {
        this.teacherList = res.data.data
      }).catch(() => {
        this.teacherList = []
      })
    },
    changeTeacherList(e) {
      this.financeQuery.teacherId = e
      this.handleFinanceFilter()
    },
    changeDateRange(e) {
      this.financeQuery.dateRange = e
      this.handleFinanceFilter()
    },
    handleFinanceFilter() {
      this.getTeacherCourseSum()
    },
    getTeacherCourseSum() {
      const params = {
        startString: parseTime(this.financeQuery.dateRange[0], ''),
        endString: parseTime(this.financeQuery.dateRange[1]),
        staff_id: this.financeQuery.teacherId ? this.financeQuery.teacherId : 0
      }
      teacherCourseSum(params).then(res => {
        this.financeSum = res.data.data
      }).catch(() => {
        this.financeSum = {
          num: ''
        }
      })
    },
    changeRegionList(e) {
      if (this.tab === 'schoolmaster' || this.tab === 'real_schoolmaster' || this.tab === 'course_adviser') {
        this.getSchoolList(e)
      }
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
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        name: this.listQuery.name,
        phone: this.listQuery.phone,
        role: this.listQuery.role,
        campusId: (this.userRole === '6' || this.userRole === '7') ? this.$store.state.user.campusId[0] : 0,
        regionId: (this.userRole === '3' || this.userRole === '2' || this.userRole === '1') ? this.$store.state.user.regionId : 0
      }
      if (this.tab === 'teacher') {
        // params.campusId = 0
        params.regionId = 0
      }
      employeeList(params)
        .then(response => {
          this.list = response.data.data.currentList
          this.total = response.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClick() {
      if (this.tab === 'teacher') {
        this.listQuery.role = 5
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      } else if (this.tab === 'group_leader') {
        this.listQuery.role = 3
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = this.$store.state.user.regionId
      } else if (this.tab === 'supervision') {
        this.listQuery.role = 2
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = this.$store.state.user.regionId
      } else if (this.tab === 'admins') {
        this.listQuery.role = 1
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = this.$store.state.user.regionId
      } else if (this.tab === 'super_admin') {
        this.listQuery.role = 0
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      } else if (this.tab === 'account') {
        this.listQuery.role = 4
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      } else if (this.tab === 'schoolmaster') {
        this.listQuery.role = 6
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      } else if (this.tab === 'real_schoolmaster') {
        this.listQuery.role = 7
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      } else if (this.tab === 'course_adviser') {
        this.listQuery.role = 8
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      } else if (this.tab === 'business_invitation') {
        this.listQuery.role = 9
        // this.listQuery.campusId = ''
        // this.listQuery.regionId = ''
      }
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        regionId: undefined,
        campusId: undefined,
        role: undefined
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
          const tempData = Object.assign({}, this.dataForm)
          tempData.role = this.listQuery.role
          employeeAdd(tempData).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '添加成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message || '添加失败'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.getSchoolList(this.dataForm.regionId)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          employeeUpdate(this.dataForm).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message || '修改失败'
            })
          })
        }
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      employeeDelete(params).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        this.getList()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message || '删除失败'
        })
      })
    },
    handleResetPwd(row) {
      const data = {
        id: row.id
      }
      passwordReset(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '重置成功'
        })
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message || '重置失败'
        })
      })
    }
  }
}
</script>
