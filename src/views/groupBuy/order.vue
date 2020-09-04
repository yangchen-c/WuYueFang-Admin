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
      <!-- <el-select v-model="orderInfo" placeholder="请选择" @change="changeSearchFiled">
        <el-option
          v-for="item in orderInfoList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select> -->
      <el-input v-model="listQuery.num" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleBatchExport">批量导出</el-button> -->
    </div>

    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="拼团中" name="groupbuying" />
      <el-tab-pane label="拼团成功" name="groupbuysuccess" />
      <el-tab-pane label="拼团失败" name="groupbuyfail" />
    </el-tabs>

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" label="ID">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号">
        <template slot-scope="{row}">
          <span>{{ row.order_num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="{row}">
          <span>{{ row.order_paytime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称">
        <template slot-scope="{row}">
          <span>{{ row.curriculum.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品图片">
        <template slot-scope="{row}">
          <img :src="row.curriculum.curriculum_photo" width="60">
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.order_status | statusFilter">{{ row.order_status | statusTxtFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="拼团金额">
        <template slot-scope="{row}">
          <span>{{ row.order_price }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="总金额">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="备注">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
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
import { groupbuyOrderList } from '@/api/groupbuy'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'

export default {
  name: 'GroupbuyOrder',
  components: { BackToTop, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'warning',
        5: 'success',
        6: 'danger',
        0: '',
        2: '',
        4: ''
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        1: '拼团中',
        5: '拼团成功',
        6: '拼团失败',
        0: '待付款',
        2: '已消课',
        4: '部分课程已消课'
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
      // orderInfoList: ['订单编号', '商品名称'],
      // orderInfo: '',
      dateRange: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // changeSearchFiled(e) {
    //   this.orderInfo = e
    // },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        status: this.listQuery.status,
        campusId: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId) ? this.$store.state.user.campusId[0] : '',
        regionId: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : 0,
        userId: 0,
        num: this.listQuery.num
      }
      // switch (this.orderInfo) {
      //   case '订单编号':
      //     params.num = this.listQuery.search
      //     break
      //   case '商品名称':
      //     params.name = this.listQuery.search
      //     break
      // }
      groupbuyOrderList(params)
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

    },
    handleClick() {
      if (this.tab === 'all') {
        this.listQuery.status = 9
      } else if (this.tab === 'groupbuying') {
        this.listQuery.status = 1
      } else if (this.tab === 'groupbuysuccess') {
        this.listQuery.status = 5
      } else if (this.tab === 'groupbuyfail') {
        this.listQuery.status = 6
      }
      this.getList()
    }
  }
}
</script>

<style>
.filter-container .filter-item {
  margin-bottom: 0;
}
</style>
