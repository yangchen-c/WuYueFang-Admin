<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-permission="['拼团商品添加']" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <!-- <el-button class="filter-item" type="danger" icon="el-icon-delete" @click="handleBatchDelete">批量删除</el-button> -->
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" width="150px" label="ID" sortable>
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="排序">
        <template slot-scope="{row}">
          <span>{{ row.user_group_sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="商品名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="商品封面图">
        <template slot-scope="{row}">
          <img :src="row.user_group_cover" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="商品详情图片">
        <template slot-scope="{row}">
          <el-image v-for="(photo, index) in row.photos" :key="index" :src="photo" :preview-src-list="row.photos" style="width: 40px; height: 40px; margin-right: 5px;" />
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="课程名称" sortable>
        <template slot-scope="{row}">
          <span>{{ row.curriculumlist ? row.curriculumlist.name : '' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="课程封面图">
        <template slot-scope="{row}">
          <img :src="row.curriculumlist ? row.curriculumlist.curriculum_photo : ''" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="拼团人数">
        <template slot-scope="{row}">
          <span>{{ row.user_group_num }}人</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="拼团价格">
        <template slot-scope="{row}">
          <span>{{ row.user_group_price }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="单买价格">
        <template slot-scope="{row}">
          <span>{{ row.user_group_oldprice }}元</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="所属校区">
        <template slot-scope="{row}">
          <span>{{ row.campus ? row.campus.name : '--' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="拼团开始时间">
        <template slot-scope="{row}">
          <span>{{ row.user_group_starttime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="拼团结束时间">
        <template slot-scope="{row}">
          <span>{{ row.user_group_endtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.user_group_status | statusFilter">{{ row.user_group_status | statusTxtFilter }}</el-tag>
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
import { groupbuyGoodsList, groupbuyGoodsDelete } from '@/api/groupbuy'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import _ from 'lodash'

export default {
  name: 'Groupbuy',
  components: { Pagination },
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
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 8课程顾问
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        status: 9
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
        status: this.listQuery.status,
        campusId: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId.length) ? this.$store.state.user.campusId[0] : '',
        regionId: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : 0
      }
      groupbuyGoodsList(params)
        .then(response => {
          const result = response.data.data.currentList
          result.forEach(item => {
            if (item.user_group_img) {
              item.photos = item.user_group_img.split(',')
            }
          })
          this.list = result
          this.total = response.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
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
      // batchDeleteTopic({ ids: ids })
      //   .then(response => {
      //     this.$notify.success({
      //       title: '成功',
      //       message: '批量删除成功'
      //     })
      //     this.getList()
      //   })
      //   .catch(response => {
      //     this.$notify.error({
      //       title: '失败',
      //       message: response.data.message
      //     })
      //   })
    },
    handleCreate() {
      this.$router.push({ path: '/groupbuy/groupbuyCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/groupbuy/groupbuyCreate', query: { id: row.id }})
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      groupbuyGoodsDelete(params)
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
