<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-select v-model="listQuery.regionId" placeholder="请选择所属区域" @change="changeRegionList">
        <el-option
          v-for="item in areaList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.campusId" placeholder="请选择所属校区" @change="changeSchoolList">
        <el-option
          v-for="item in schoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.class_id" placeholder="请选择所属班级">
        <el-option
          v-for="item in classList"
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

      <!-- <el-table-column align="center" width="200px" label="所属校区">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" width="200px" label="班级">
        <template slot-scope="scope">
          <span>{{ scope.row.class_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="授课老师">
        <template slot-scope="scope">
          <span>{{ scope.row.staff_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="作业内容">
        <template slot-scope="scope">
          <span>{{ scope.row.release_homework_content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="作业内容">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="'作业详情'" :visible.sync="dialogFormVisible">
      <div style="text-align: center;">
        <h3>{{ homeworkInfo.release_homework_title }}</h3>
        <div class="detail-content">{{ homeworkInfo.release_homework_content }}</div>
        <div v-if="imgUrlArr.length"><img v-for="imgUrl in imgUrlArr" :key="imgUrl" :src="imgUrl" width="500"></div>
        <div v-if="videoUrlArr.length"><video v-for="videoUrl in videoUrlArr" :key="videoUrl" :src="videoUrl" width="500" /></div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { areaAll } from '@/api/area'
import { schoolAllByRegionId, classAllBySchoolId } from '@/api/school'
import { homeworkList, homeworkDetail, homeworkDelete } from '@/api/homework'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'HomeworkMgmt',
  components: { Pagination },
  data() {
    return {
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 8课程顾问
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        regionId: '',
        campusId: '',
        class_id: ''
      },
      dialogFormVisible: false,
      areaList: [],
      schoolList: [],
      classList: [],
      homeworkInfo: {
        release_homework_title: '',
        release_homework_content: ''
      },
      imgUrlArr: [],
      videoUrlArr: []
    }
  },
  created() {
    this.getList()
    this.getRegionList()
  },
  methods: {
    changeSchoolList(e) {
      this.getClassList(e)
    },
    getClassList(campus_id) {
      const params = {
        campus_id
      }
      classAllBySchoolId(params).then(res => {
        this.classList = res.data.data
      }).catch(() => {
        this.classList = []
      })
    },
    changeRegionList(e) {
      this.getSchoolList(e)
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
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        class_id: this.listQuery.class_id ? this.listQuery.class_id : 0,
        staff_id: 0,
        staff_name: '',
        name: '',
        campus_id: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId) ? this.$store.state.user.campusId[0] : '',
        region_id: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : ''
      }
      homeworkList(params).then(response => {
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
      this.imgUrlArr = []
      this.videoUrlArr = []
      this.dialogFormVisible = true
      const params = {
        id: row.id
      }
      homeworkDetail(params).then(res => {
        this.homeworkInfo = res.data.data
        const resultUrlStr = res.data.data.release_homework_content_url
        const resultUrlArr = resultUrlStr.split(',')
        resultUrlArr.forEach(item => {
          const index = item.lastIndexOf('.')
          const extension = item.substring(index).toLowerCase()
          if (extension !== '.bmp' && extension !== '.png' && extension !== '.gif' && extension !== '.jpg' && extension !== '.jpeg') {
            this.videoUrlArr.push(item)
          } else {
            this.imgUrlArr.push(item)
          }
        })
      }).catch(() => {
        this.homeworkInfo = null
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      homeworkDelete(params).then(res => {
        this.$notify.success({
          title: '成功',
          message: '添加成功'
        })
        this.getList()
      }).catch(err => {
        this.$notify.error({
          title: '失败',
          message: err.data.message ? err.data.message : '删除失败'
        })
      })
    }
  }
}
</script>

<style scoped>
.detail-content {
  line-height: 80px;
}
</style>
