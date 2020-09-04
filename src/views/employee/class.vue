<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <!-- <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入班级名称" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.classTypeId" clearable placeholder="请选择班级类型" @change="changeClassType">
        <el-option
          v-for="item in classTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-model="listQuery.staff_id" clearable placeholder="请选择授课老师" @change="changeTeacherList">
        <el-option
          v-for="item in teacherList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>

      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div> -->

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="班级名称" prop="name">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="300px" label="所属校区" prop="school">
        <template slot-scope="scope">
          <span>{{ scope.row.campus.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="班级类型" prop="class">
        <template slot-scope="scope">
          <span>{{ scope.row.classification.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="授课老师" prop="isHot">
        <template slot-scope="scope">
          <span>{{ scope.row.staff.name }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { classList } from '@/api/school'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'TeacherClassMgmt',
  components: { Pagination },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        classTypeId: '',
        staff_id: ''
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
        campus_id: 0,
        classification_id: this.listQuery.classTypeId ? this.listQuery.classTypeId : 0,
        staff_id: this.listQuery.staff_id ? this.listQuery.staff_id : 0
      }
      classList(params).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
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
