<template>
  <div class="app-container">

    <!-- 统计信息 -->
    <div class="filter-container">
      <el-select v-model="financeQuery.regionId" clearable placeholder="请选择所属区域" @change="changeFinanceRegionList">
        <el-option
          v-for="item in regionList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select v-model="financeQuery.campusId" clearable placeholder="请选择校区" @change="changeFinanceSchoolList">
        <el-option
          v-for="item in financeSchoolList"
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

    <div class="finance-sum" style="height: 60px; line-height: 60px; background-color: #d3dce6; margin-bottom: 50px; border-radius: 10px; padding: 0 10px;">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple">总课时： {{ financeSum.num_total }}</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light">剩余课时： {{ financeSum.num_remain }}</div></el-col>
      </el-row>
    </div>

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-if="(userRole != 3) && (userRole != 6) && (userRole != 7)" class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入校区名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="校区名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="300px" label="校区地址">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="所属区域">
        <template slot-scope="scope">
          <span>{{ scope.row.region.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="100px" label="消课二维码">
        <template slot-scope="scope">
          <img :src="scope.row.campus_xiaoke_qrcode" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="成立时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="执行校长">
        <template slot-scope="scope">
          <span>{{ scope.row.executive_headmaster ? scope.row.executive_headmaster.name : '' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="执行校长联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.executive_headmaster ? scope.row.executive_headmaster.phone : '' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="校长">
        <template slot-scope="scope">
          <span>{{ scope.row.headmaster ? scope.row.headmaster.name : '' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="校长联系方式">
        <template slot-scope="scope">
          <span>{{ scope.row.headmaster ? scope.row.headmaster.phone : '' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="(userRole != 3) && (userRole != 6) && (userRole != 7)" type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="(userRole != 3) && (userRole != 6) && (userRole != 7)" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          <el-button v-permission="['校区班级管理']" type="success" size="mini" @click="handleDetail(scope.row)">班级</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="校区名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入校区名称" />
        </el-form-item>
        <el-form-item label="所属区域" prop="regionId">
          <el-select v-model="dataForm.regionId" placeholder="请选择所属区域">
            <el-option
              v-for="item in regionList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="dataForm.address" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="执行校长" prop="campus_executive_headmaster_id">
          <el-select v-model="dataForm.campus_executive_headmaster_id" clearable placeholder="请选择执行校长">
            <el-option
              v-for="item in realLeaderList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
            <!-- <el-option :label="'测试1'" :value="1" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="校长" prop="campus_headmaster_id">
          <el-select v-model="dataForm.campus_headmaster_id" clearable placeholder="请选择校长">
            <el-option
              v-for="item in leaderList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
            <!-- <el-option :label="'测试2'" :value="2" /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="成立时间" prop="time">
          <el-date-picker
            v-model="dataForm.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择成立日期"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="请输入备注" />
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
import { areaAll } from '@/api/area'
import { schoolList, schoolAdd, schoolUpdate, schoolDelete, employeeAll, schoolCourseSum, schoolAllByRegionId } from '@/api/school'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils/index'

export default {
  name: 'School',
  components: { Pagination },
  data() {
    return {
      userRole: this.$store.state.user.roles[0],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: ''
      },
      dataForm: {
        id: undefined,
        sort: undefined,
        name: undefined,
        regionId: undefined,
        address: undefined,
        time: undefined,
        campus_headmaster_id: undefined,
        // leaderPhone: undefined,
        campus_executive_headmaster_id: undefined,
        // realLeaderPhone: undefined,
        remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改校区',
        create: '添加校区'
      },
      rules: {
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        regionId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        address: [{ required: true, message: '请输入区域详细地址', trigger: 'blur' }],
        // campus_executive_headmaster_id: [{ required: true, message: '请选择执行校长', trigger: 'blur' }],
        // realLeaderPhone: [{ required: true, message: '请输入执行校长联系方式', trigger: 'blur' }],
        // campus_headmaster_id: [{ required: true, message: '请选择校长', trigger: 'blur' }],
        // leaderPhone: [{ required: true, message: '请输入校长联系方式', trigger: 'blur' }],
        time: [{ required: true, message: '请选择成立时间', trigger: 'blur' }]
      },
      regionList: [],
      realLeaderList: [],
      leaderList: [],

      // areaList: [],
      // schoolList: [],
      financeSum: {
        total: '',
        remain: ''
      },
      financeQuery: {
        dateRange: [new Date(), new Date()],
        campusId: '',
        regionId: ''
      },
      financeSchoolList: []
    }
  },
  created() {
    this.getList()
    this.getRegionList()
    this.getEmployeeList(6)
    this.getEmployeeList(7)
    this.getSchoolCourseSum()
  },
  methods: {
    changeFinanceSchoolList(e) {
      this.financeQuery.campusId = e
      this.handleFinanceFilter()
    },
    changeFinanceRegionList(e) {
      this.financeQuery.regionId = e
      if (e) {
        this.getSchoolList(e)
      }
    },
    changeDateRange(e) {
      this.financeQuery.dateRange = e
      this.handleFinanceFilter()
    },
    handleFinanceFilter() {
      this.getSchoolCourseSum()
    },
    getSchoolCourseSum() {
      const params = {
        startString: parseTime(this.financeQuery.dateRange[0], ''),
        endString: parseTime(this.financeQuery.dateRange[1]),
        campus_id: this.financeQuery.campusId ? this.financeQuery.campusId : 0
      }
      schoolCourseSum(params).then(res => {
        this.financeSum = res.data.data
      }).catch(() => {
        this.financeSum = {
          total: '',
          remain: ''
        }
      })
    },
    getSchoolList(regionId) {
      const params = {
        regionId
      }
      schoolAllByRegionId(params).then(res => {
        this.financeSchoolList = res.data.data
      }).catch(() => {
        this.financeSchoolList = []
      })
    },
    // getRegionList() {
    //   areaAll().then(res => {
    //     this.areaList = res.data.data
    //   }).catch(() => {
    //     this.areaList = []
    //   })
    // },
    getEmployeeList(role) {
      const params = {
        role
      }
      employeeAll(params).then(res => {
        if (role === 6) {
          this.leaderList = res.data.data
        } else if (role === 7) {
          this.realLeaderList = res.data.data
        }
      }).catch(() => {
        if (role === 6) {
          this.leaderList = []
        } else if (role === 7) {
          this.realLeaderList = []
        }
      })
    },
    getRegionList() {
      areaAll().then(res => {
        this.regionList = res.data.data
      }).catch(() => {
        this.regionList = []
      })
    },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        name: this.listQuery.name,
        campus_id: (this.userRole === '7' || this.userRole === '6') ? this.$store.state.user.campusId[0] : 0,
        regionId: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : 0
      }
      schoolList(params).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        sort: undefined,
        name: undefined,
        regionId: undefined,
        address: undefined,
        time: undefined,
        campus_headmaster_id: undefined,
        campus_executive_headmaster_id: undefined,
        remark: undefined
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
          const data = {
            sort: this.dataForm.sort,
            name: this.dataForm.name,
            address: this.dataForm.address,
            regionId: this.dataForm.regionId,
            remark: this.dataForm.remark,
            campus_set_time: this.dataForm.time,
            campus_headmaster_id: this.dataForm.campus_headmaster_id,
            campus_executive_headmaster_id: this.dataForm.campus_executive_headmaster_id
          }
          schoolAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '创建失败'
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
          const data = {
            // campus_id: this.dataForm.id,
            id: this.dataForm.id,
            sort: this.dataForm.sort,
            name: this.dataForm.name,
            address: this.dataForm.address,
            regionId: this.dataForm.regionId,
            remark: this.dataForm.remark,
            campus_set_time: this.dataForm.time.substring(0, 10),
            campus_headmaster_id: this.dataForm.campus_headmaster_id,
            campus_executive_headmaster_id: this.dataForm.campus_executive_headmaster_id
          }
          schoolUpdate(data).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '更新成功'
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
      schoolDelete(params).then(response => {
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
    },
    handleDetail(row) {
      this.$router.push({ path: '/school/classList', query: { id: row.id }})
    }
  }
}
</script>
