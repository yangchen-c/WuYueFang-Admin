<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-permission="['秒杀商品添加']" class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <!-- <el-button class="filter-item" type="danger" icon="el-icon-delete" style="margin-right: 100px;" @click="handleBatchDelete">批量删除</el-button> -->

      <el-select v-model="listQuery.seckill_status" placeholder="请选择" @change="handleFilter">
        <el-option :label="'全部'" :value="9" />
        <el-option :label="'待开始'" :value="1" />
        <el-option :label="'正在进行'" :value="0" />
        <el-option :label="'已结束'" :value="2" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="排序">
        <template slot-scope="{row}">
          <span>{{ row.seckill_sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="商品名称">
        <template slot-scope="{row}">
          <span>{{ row.curriculum.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="商品图片">
        <template slot-scope="{row}">
          <img :src="row.curriculum.curriculum_photo" width="60">
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" min-width="100px" label="课程">
        <template slot-scope="{row}">
          <span>{{ row.curriculum_id }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" min-width="100px" label="原价">
        <template slot-scope="{row}">
          <span>{{ row.seckill_oldprice }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="秒杀价格">
        <template slot-scope="{row}">
          <span>{{ row.seckill_price }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="秒杀开始时间">
        <template slot-scope="{row}">
          <span>{{ row.seckill_starttime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="秒杀结束时间">
        <template slot-scope="{row}">
          <span>{{ row.seckill_endtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.seckill_status | statusFilter">{{ row.seckill_status | statusTxtFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="限购数量">
        <template slot-scope="{row}">
          <span>{{ row.seckill_limit_num }}件</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="备注">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { secondKillGoodsList, secondKillGoodsDelete } from '@/api/secondKill'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import _ from 'lodash'

export default {
  name: 'SecondKill',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'warning',
        2: 'danger',
        0: 'success'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        1: '待开始',
        2: '已结束',
        0: '正在进行'
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
        seckill_status: 9
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
        seckill_status: this.listQuery.seckill_status,
        campusId: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId) ? this.$store.state.user.campusId[0] : '',
        regionId: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : 0
      }
      secondKillGoodsList(params)
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
    handleBatchDelete() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请选择至少一条记录')
        return
      }
      const ids = []
      _.forEach(this.multipleSelection, function(item) {
        ids.push(item.id)
      })
      secondKillGoodsDelete({ ids: ids })
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '批量删除成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.message
          })
        })
    },
    handleCreate() {
      this.$router.push({ path: '/secondkill/secondkillCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/secondkill/secondkillCreate', query: { id: row.id }})
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      secondKillGoodsDelete(params)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getList()
        })
        .catch(response => {
          this.$notify.error({
            title: '失败',
            message: response.data.message
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
