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
        :picker-options="pickerOptions"
        style="margin-right: 100px;"
        @change="changeDateRange"
      /> -->
      <el-select v-if="userRole === '0'" v-model="listQuery.regionId" clearable placeholder="请选择所属区域" @change="changeRegionList">
        <el-option
          v-for="item in areaList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select v-if="userRole === '0' || userRole === '1' || userRole === '2' || userRole === '3'" v-model="listQuery.campusId" clearable placeholder="请选择校区" style="margin-right: 100px;" @change="changeSchoolList">
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select v-model="orderInfo" placeholder="请选择" @change="changeSearchFiled">
        <el-option
          v-for="item in orderInfoList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input v-model="listQuery.search" clearable class="filter-item" style="width: 200px;" placeholder="请输入内容" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-download" @click="handleBatchExport">批量导出</el-button> -->
    </div>

    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="待领取" name="no" />
      <el-tab-pane label="已领取" name="yes" />
    </el-tabs>

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="200" label="订单号">
        <template slot-scope="scope">
          <span>{{ scope.row.ptorder_num }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">
          <span>{{ scope.row.ptorder_paytime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.ptorder_status | statusFilter">{{ scope.row.ptorder_status | statusTxtFilter }}</el-tag>
          <!-- <span>{{ scope.row.ptorder_status | orderStatusFilter }}</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.trade_name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品图片">
        <template slot-scope="scope">
          <img :src="scope.row.trade_picture" width="60">
        </template>
      </el-table-column>
      <el-table-column align="center" label="购买数量">
        <template slot-scope="scope">
          <span>{{ scope.row.ptorder_count }}件</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="单价金额">
        <template slot-scope="scope">
          <span>{{ scope.row.ptorder_price }}分</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="总金额">
        <template slot-scope="scope">
          <span>{{ (scope.row.ptorder_price * scope.row.ptorder_count).toFixed(2) }}分</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="领取人姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.student.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="领取人电话">
        <template slot-scope="scope">
          <span>{{ scope.row.student.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="领取人时间">
        <template slot-scope="scope">
          <span>{{ scope.row.student.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" min-width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ptorder_status === 1" type="primary" size="mini" @click="handleUpdate(scope.row)">领取</el-button>
          <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
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
import { creditsGoodsOrderList, creditsGet } from '@/api/credits'
import { schoolAllByRegionId } from '@/api/school'
import { areaAll } from '@/api/area'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'

export default {
  name: 'CreditsOrder',
  components: { BackToTop, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'warning',
        2: 'success',
        0: 'danger'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        1: '未领取',
        2: '已领取',
        0: '未支付'
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
      tab: 'all',
      listQuery: {
        page: 1,
        limit: 20,
        start: '',
        end: '',
        search: '',
        status: 9,
        // user_campus: 0,
        userId: 0,
        campusId: '',
        regionId: ''
      },
      multipleSelection: [],
      pickerOptions: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
        shortcuts: [{
          text: '近7天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }, {
          text: '近30天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', date)
          }
        }]
      },

      dateRange: [],
      orderInfo: '',
      orderInfoList: ['订单编号', '商品名称'],
      areaList: [],
      schoolList: []
    }
  },
  created() {
    this.getList()
    if (this.userRole === '0') {
      this.getRegionList()
    } else {
      this.getSchoolList(this.$store.state.user.regionId)
    }
  },
  methods: {
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
    changeSearchFiled(e) {
      this.orderInfo = e
    },
    getList() {
      this.listLoading = true
      const params = {
        page: this.listQuery.page,
        size: this.listQuery.limit,
        ptorder_status: this.listQuery.status,
        user_campus: (this.userRole === '6' || this.userRole === '7') ? this.$store.state.user.campusId[0] : (this.listQuery.campusId ? this.listQuery.campusId : 0),
        // user_campus: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : (this.listQuery.campusId ? this.listQuery.campusId : 0),
        userId: this.listQuery.userId, // 所有用户
        name: '',
        num: ''
      }
      switch (this.orderInfo) {
        case '订单编号':
          params.num = this.listQuery.search
          break
        case '商品名称':
          params.name = this.listQuery.search
          break
      }
      creditsGoodsOrderList(params)
        .then(response => {
          this.list = response.data.data.data.currentList
          this.total = response.data.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    changeDateRange() {
      this.handleFilter()
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
      } else if (this.tab === 'no') {
        this.listQuery.status = 1
      } else if (this.tab === 'yes') {
        this.listQuery.status = 2
      }
      this.getList()
    },
    handleUpdate(row) {
      const data = {
        id: row.id
      }
      creditsGet(data).then(res => {
        this.$notify.success({
          title: '成功',
          message: '领取成功'
        })
        this.getList()
      }).catch(() => {
        this.$notify.error({
          title: '失败',
          message: '领取失败'
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
