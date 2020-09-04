<template>
  <div class="app-container">    

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-select v-model="orderInfo" placeholder="请选择">
        <el-option
          v-for="item in orderInfoList"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-input v-model="listQuery.orderId" clearable class="filter-item" style="width: 200px;" placeholder="请输入内容" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleBatchExport">批量导出</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="ID" prop="aftersaleSn">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单号" prop="orderId">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间" prop="userId">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称" prop="type">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品图片" prop="type">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="type">
        <template slot-scope="scope">
          <el-tag :type="row.user_group_status | statusFilter">{{ row.user_group_status | statusTxtFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="拼团数量" prop="type">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价金额" prop="reason">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总金额" prop="amount">
        <template slot-scope="scope">
          <span>test</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注" prop="type">
        <template slot-scope="scope">
          <span>test</span>
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
import _ from 'lodash'

export default {
  name: 'groupbuyOrder',
  components: { BackToTop, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        0: '待开始',
        1: '正在进行',
        2: '已结束'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      // tab: 'all',
      listQuery: {
        page: 1,
        limit: 20,
        orderId: undefined,
        status: 9
      },
      multipleSelection: [],
      orderInfoList: ['订单编号', '商品标题', '校区名称', '订单状态'],
      orderInfo: '',
      dateRange: []
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
        status: this.listQuery.status
      }
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

    }
    // handleClick() {
    //   if (this.tab === 'all') {
    //     this.listQuery.status = 9
    //   } else if (this.tab === 'groupbuying') {
    //     this.listQuery.status = 0
    //   } else if (this.tab === 'groupbuysuccess') {
    //     this.listQuery.status = 1
    //   } else if (this.tab === 'groupbuyfail') {
    //     this.listQuery.status = 2
    //   }
    //   this.getList()
    // }
  }
}
</script>
