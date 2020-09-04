<template>
  <div class="app-container">

    <div class="filter-container">
      <el-select v-model="financeQuery.regionId" clearable placeholder="请选择所属区域" @change="changeFinanceRegionList">
        <el-option
          v-for="item in areaList"
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
        <el-col :span="4"><div class="grid-content bg-purple">收入： {{ financeSum.shou }}元</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light">支出： {{ financeSum.zhi }}元</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple">利润： {{ financeSum.lirun }}元</div></el-col>
      </el-row>
    </div>

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-select v-model="listQuery.type" clearable placeholder="请选择收支类型" @change="changeType">
        <el-option label="收入" :value="1" />
        <el-option label="支出" :value="2" />
      </el-select>

      <el-select v-if="userRole === '0'" v-model="listQuery.regionId" clearable placeholder="请选择所属区域" @change="changeRegionList">
        <el-option
          v-for="item in areaList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select v-if="userRole === '0' || userRole === '1' || userRole === '2' || userRole === '3'" v-model="listQuery.campusId" clearable placeholder="请选择校区" @change="changeSchoolList">
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <!-- <el-date-picker
        v-model="listQuery.dateRange"
        type="daterange"
        formt="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      /> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="项目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="收支类型">
        <template slot-scope="scope">
          <span>{{ scope.row.finance_list_type | typeFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="金额">
        <template slot-scope="scope">
          <span>{{ scope.row.finance_list_money }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.finance_time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="项目" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入项目" />
        </el-form-item>
        <el-form-item label="类型" prop="finance_list_type">
          <el-select v-model="dataForm.finance_list_type" placeholder="请选择收支类型">
            <el-option label="收入" :value="1" />
            <el-option label="支出" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="finance_list_money">
          <el-input v-model="dataForm.finance_list_money" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="日期" prop="finance_time">
          <el-date-picker
            v-model="dataForm.finance_time"
            type="date"
            formt="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" />
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
import { financeList, financeAdd, financeUpdate, financeDelete, financeSum } from '@/api/finance'
import { schoolAllByRegionId } from '@/api/school'
import { areaAll } from '@/api/area'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { parseTime } from '@/utils/index'

export default {
  name: 'FinanceMgmt',
  components: { Pagination },
  filters: {
    typeFilter(status) {
      const statusMap = {
        1: '收入',
        2: '支出'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 8课程顾问
      // isCampus: this.$store.state.user.campusId.length,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        type: '',
        // dateRange: ''
        name: '',
        campusId: ''
      },
      dataForm: {
        id: undefined,
        name: undefined,
        finance_list_money: undefined,
        finance_list_type: undefined,
        staff_id: this.$store.state.user.userId,
        finance_time: undefined,
        remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        finance_list_type: [{ required: true, message: '请选择收支类型', trigger: 'blur' }],
        finance_list_money: [{ required: true, message: '请输入缴费金额', trigger: 'blur' }],
        finance_time: [{ required: true, message: '请选择时间', trigger: 'blur' }]
      },
      areaList: [],
      schoolList: [],
      financeSum: {
        shou: '',
        zhi: '',
        lirun: ''
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
    if (this.userRole === '0') {
      this.getRegionList()
    } else {
      this.getSchoolList(this.$store.state.user.regionId)
    }
    this.getFinanceSum()
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
      this.getFinanceSum()
    },
    getFinanceSum() {
      const params = {
        startString: parseTime(this.financeQuery.dateRange[0], ''),
        endString: parseTime(this.financeQuery.dateRange[1]),
        campus_id: this.financeQuery.campusId ? this.financeQuery.campusId : 0
      }
      financeSum(params).then(res => {
        this.financeSum = res.data.data
      }).catch(() => {
        this.financeSum = {
          shou: '',
          zhi: '',
          lirun: ''
        }
      })
    },
    changeSchoolList(e) {
      this.listQuery.campusId = e
      this.handleFilter()
    },
    changeRegionList(e) {
      if (e) {
        this.getSchoolList(e)
      }
    },
    getSchoolList(regionId) {
      const params = {
        regionId
      }
      schoolAllByRegionId(params).then(res => {
        if (this.listQuery.regionId) {
          this.schoolList = res.data.data
        } else if (this.financeQuery.regionId) {
          this.financeSchoolList = res.data.data
        }
      }).catch(() => {
        this.schoolList = []
        this.financeSchoolList = []
      })
    },
    getRegionList() {
      areaAll().then(res => {
        this.areaList = res.data.data
      }).catch(() => {
        this.areaList = []
      })
    },
    changeType(e) {
      this.listQuery.type = e
      this.handleFilter()
    },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        type: this.listQuery.type || 0,
        // dateRange: this.listQuery.dateRange
        name: this.listQuery.name,
        campus_id: (this.userRole === '6' || this.userRole === '7' || this.userRole === '4') ? this.$store.state.user.campusId[0] : (this.listQuery.campusId ? this.listQuery.campusId : 0)
        // campus_id: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : (this.listQuery.campusId ? this.listQuery.campusId : 0)
      }
      financeList(params).then(response => {
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
        name: undefined,
        finance_list_money: undefined,
        finance_list_type: undefined,
        staff_id: this.$store.state.user.userId,
        finance_time: undefined,
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
          const data = Object.assign({}, this.dataForm)
          financeAdd(data).then(response => {
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
          financeUpdate(data).then(() => {
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
      financeDelete(params).then(response => {
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
</script>
