<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <!-- <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        style="margin-right: 100px;"
      /> -->
      <!-- <el-select v-model="orderInfo" placeholder="请选择">
        <el-option
          v-for="item in orderInfoList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
      <el-select v-model="listQuery.status" placeholder="请选择订单状态" @change="changeOrderStatus">
        <el-option
          v-for="item in statusList"
          :key="item.name"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-input v-model="listQuery.num" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleBatchExport">批量导出</el-button> -->
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号">
        <template slot-scope="scope">
          <span>{{ scope.row.order_num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.order_paytime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.curriculum.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.curriculum.curriculum_photo" width="60">
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="秒杀数量">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="秒杀价格">
        <template slot-scope="scope">
          <span>{{ scope.row.order_price }}元</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="总金额">
        <template slot-scope="scope">
          <span>{{ scope.row.order_price }}元</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="订单状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.order_status | orderStatusFilter">{{ scope.row.order_status | orderStatusTxtFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
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
import { secondKillOrderList } from '@/api/secondKill'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'

export default {
  name: 'SecondKillMgmt',
  components: { BackToTop, Pagination },
  filters: {
    orderStatusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
    },
    orderStatusTxtFilter(status) {
      const statusMap = {
        0: '待付款',
        1: '付款成功'
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
      tab: 'all',
      listQuery: {
        page: 1,
        limit: 20,
        num: '',
        status: 9
      },
      multipleSelection: [],
      // orderInfoList: ['订单编号', '商品标题', '校区名称', '订单状态'],
      // orderInfo: '',
      dateRange: [],
      statusList: [
        {
          id: 9,
          name: '全部'
        },
        {
          id: 0,
          name: '待付款'
        },
        {
          id: 1,
          name: '付款成功'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeOrderStatus(e) {
      console.log(e)
      this.listQuery.status = e
      this.handleFilter()
    },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        status: this.listQuery.status,
        campusId: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId) ? this.$store.state.user.campusId[0] : '',
        regionId: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : 0,
        num: this.listQuery.num
      }
      secondKillOrderList(params)
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

<style>
.filter-container .filter-item {
  margin-bottom: 0;
}
</style>
