<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.student_avatar" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.student_nick_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="绑定手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="用户身份">
        <template slot-scope="scope">
          <span>{{ scope.row.role | roleFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px" label="签到时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="获得积分">
        <template slot-scope="scope">
          <span>+{{ scope.row.integral }}分</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" style="padding: 7px 0;" @click="handleDetail(scope.row)">签到记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 对话框 -->
    <el-dialog title="签到记录" :visible.sync="dialogFormVisible">
      <div>
        <el-table v-loading="qianListLoading" :data="qianList" element-loading-text="正在查询中。。。" border fit highlight-current-row style="width: 100%;">
          <el-table-column
            align="center"
            prop="time"
            label="签到时间"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.signintime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="credits"
            label="获得积分"
          >
            <template slot-scope="scope">
              <span>+{{ scope.row.integral }}分</span>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="qianTotal>0" :total="qianTotal" :page.sync="qianListQuery.page" :limit.sync="qianListQuery.limit" @pagination="handleDetail" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { userList, qianListByUserId } from '@/api/user'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'QianMgmt',
  components: { Pagination },
  filters: {
    roleFilter(status) {
      const statusMap = {
        0: '未注册',
        1: '未分配',
        2: '学员'

      }
      return statusMap[status]
    }
  },
  data() {
    return {
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 8课程顾问
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        phone: '',
        appointment_status: 9,
        role: 9,
        class_id: 0,
        nickname: ''
      },
      dialogFormVisible: false,
      // rowData: [],

      qianList: [],
      qianTotal: 0,
      qianListLoading: true,
      qianListQuery: {
        page: 1,
        limit: 20
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
        name: this.listQuery.name,
        phone: this.listQuery.phone,
        role: this.listQuery.role,
        class_id: this.listQuery.class_id,
        appointment_status: this.listQuery.appointment_status,
        nickname: this.listQuery.nickname,
        campus_id: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId.length) ? this.$store.state.user.campusId[0] : ''
      }
      userList(params).then(response => {
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
    handleDetail(row) {
      this.dialogFormVisible = true
      const params = {
        offset: this.qianListQuery.page,
        limit: this.qianListQuery.limit,
        userId: row.id
      }
      qianListByUserId(params).then(res => {
        this.qianList = res.data.data.currentList
        this.qianTotal = res.data.data.totalRecords
        this.qianListLoading = false
      }).catch(() => {
        this.qianList = []
        this.qianTotal = 0
        this.qianListLoading = false
      })
    }
  }
}
</script>

<style>
.filter-container .filter-item {
  margin-bottom: 0;
}
</style>
