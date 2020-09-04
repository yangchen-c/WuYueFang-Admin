<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.audit_status" placeholder="请选择审核状态" @change="changeCheckList">
        <el-option
          v-for="item in checkList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="提现金额">
        <template slot-scope="scope">
          <span>{{ scope.row.money }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="提现时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px" label="提现人">
        <template slot-scope="scope">
          <span>{{ scope.row.identity === 'staff' ? scope.row.staff.name : scope.row.student.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="提现人身份">
        <template slot-scope="scope">
          <span>{{ scope.row.identity === 'staff' ? '老师' : '学生' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="提现状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.auditStatus | statusFilter">{{ scope.row.auditStatus | statusTxtFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
        <template v-if="scope.row.auditStatus === 1" slot-scope="scope">
          <el-button type="success" size="mini" style="padding: 7px 0;" @click="handleCheck(scope.row, 3)">通过</el-button>
          <el-button type="danger" size="mini" style="padding: 7px 0;" @click="handleCheck(scope.row, 2)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { cashList, cashCheck } from '@/api/cash'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CashMgmt',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'warning',
        2: 'danger',
        3: 'success'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusTxtMap = {
        1: '审核中',
        2: '审核失败',
        3: '审核成功'
      }
      return statusTxtMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        audit_status: ''
      },
      checkList: [
        {
          id: 1,
          name: '审核中'
        },
        {
          id: 2,
          name: '审核失败'
        },
        {
          id: 3,
          name: '审核成功'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeCheckList(e) {
      this.listQuery.audit_status = e
      this.handleFilter()
    },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        user_id: 0,
        identity: '',
        audit_status: this.listQuery.audit_status ? this.listQuery.audit_status : 0
      }
      cashList(params).then(response => {
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
    handleCheck(row, status) {
      const tempData = Object.assign({}, row)
      const data = {
        id: tempData.id,
        userId: tempData.userId,
        identity: tempData.identity,
        auditStatus: status
      }
      cashCheck(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '审核成功'
        })
        this.getList()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message ? response.data.message : '审核失败'
        })
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
