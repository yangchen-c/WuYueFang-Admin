<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
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
    </div>

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

      <el-table-column align="center" label="操作" width="350" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" style="margin-left: 0;" @click="handleDelete(scope.row)">删除</el-button>
          <router-link v-permission="['排课管理']" :to="'/school/assignClass/' + scope.row.id + '/' + scope.row.name">
            <el-button type="success" size="mini">
              排课
            </el-button>
          </router-link>
          <router-link v-permission="['班级学生列表']" :to="'/school/classStudentList/' + scope.row.id">
            <el-button type="success" size="mini">
              学生
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="班级名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入班级名称" />
        </el-form-item>
        <!-- <el-form-item label="所属区域" prop="region_id">
          <el-select v-model="dataForm.region_id" placeholder="请选择所属区域" @change="changeRegionList">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属校区" prop="campus_id">
          <el-select v-model="dataForm.campus_id" placeholder="请选择所属校区">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="授课老师" prop="staff_id">
          <el-select v-model="dataForm.staff_id" placeholder="请选择授课老师">
            <el-option
              v-for="item in teacherList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="班级类型" prop="classification_id">
          <el-select v-model="dataForm.classification_id" placeholder="请选择班级类型">
            <el-option
              v-for="item in classTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { classList, classAdd, classUpdate, classDelete, classTypeAll, schoolAllByRegionId, teacherAll } from '@/api/school'
import { areaAll } from '@/api/area'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ClassMgmt',
  components: { Pagination },
  data() {
    return {
      userRole: this.$store.state.user.roles[0],
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: '',
        classTypeId: '',
        staff_id: ''
      },
      dataForm: {
        id: undefined,
        name: undefined,
        // campus_id: undefined,
        classification_id: undefined,
        // region_id: undefined,
        staff_id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改班级',
        create: '添加班级'
      },
      rules: {
        name: [{ required: true, message: '请输入班级名称', trigger: 'blur' }],
        campus_id: [{ required: true, message: '请选择所属校区', trigger: 'blur' }],
        classification_id: [{ required: true, message: '请选择班级类型', trigger: 'blur' }],
        region_id: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        staff_id: [{ required: true, message: '请选择授课老师', trigger: 'blur' }]
      },
      areaList: [],
      schoolList: [],
      classTypeList: [],
      teacherList: []
    }
  },
  created() {
    this.getList()
    this.getRegionList()
    this.getClassTypeList()
    this.getTeacherList()
  },
  methods: {
    changeTeacherList(e) {
      this.listQuery.staff_id = e
      this.handleFilter()
    },
    getTeacherList() {
      teacherAll().then(res => {
        this.teacherList = res.data.data
      }).catch(() => {
        this.teacherList = []
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
    getClassTypeList() {
      classTypeAll().then(res => {
        this.classTypeList = res.data.data
      }).catch(() => {
        this.classTypeList = []
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
        name: this.listQuery.name,
        campus_id: this.$route.query.id,
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
    },
    changeClassType(e) {
      this.listQuery.classTypeId = e
      this.handleFilter()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        // campus_id: undefined,
        classification_id: undefined,
        // region_id: undefined,
        staff_id: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            name: this.dataForm.name,
            campus_id: this.$route.query.id,
            classification_id: this.dataForm.classification_id,
            staff_id: this.dataForm.staff_id
          }
          classAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '添加成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '添加失败'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dataForm.region_id = row.campus.regionId
      this.getSchoolList(this.dataForm.region_id)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            id: this.dataForm.id,
            name: this.dataForm.name,
            campus_id: this.$route.query.id,
            classification_id: this.dataForm.classification_id,
            staff_id: this.dataForm.staff_id
          }
          classUpdate(data).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '修改失败'
            })
          })
        }
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      classDelete(params).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        this.getList()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message ? response.data.message : '删除失败'
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
