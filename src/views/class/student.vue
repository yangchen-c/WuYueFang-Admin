<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <!-- <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入真实名称" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button v-if="tab == 'student'" class="filter-item" type="primary" icon="el-icon-download" @click="handleBatchExport">批量导出</el-button>
    </div> -->

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生名称">
        <template slot-scope="scope">
          <span>{{ scope.row.student_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="60">
        </template>
      </el-table-column>
      <el-table-column align="center" label="总课时">
        <template slot-scope="scope">
          <span>{{ scope.row.total_times }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="剩余课时">
        <template slot-scope="scope">
          <span>{{ scope.row.remain_times }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>
  </div>
</template>

<script>
import { studentClassList } from '@/api/user'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'

export default {
  name: 'ClassStudentMgmt',
  components: { BackToTop, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        0: 'warning'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        1: '邀约成功',
        2: '邀约失败',
        0: '未邀约'
      }
      return statusMap[status]
    },
    homeworkStatusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'warning',
        2: 'success'
      }
      return statusMap[status]
    },
    homeworkTxtStatusFilter(status) {
      const statusMap = {
        0: '未完成',
        1: '已完成',
        2: '已点评'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 20,
        studentName: '',
        name: '',
        staffName: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        studentId: 0,
        staffId: 0,
        classId: this.$route.params.id,
        studentName: this.listQuery.studentName,
        name: this.listQuery.name,
        staffName: this.listQuery.staffName
      }
      studentClassList(params)
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
    handleBatchExport() {

    }
  }
}
</script>
