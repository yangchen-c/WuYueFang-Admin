<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入名称" @keyup.enter.native="handleFilter" />
      <el-date-picker
        v-model="listQuery.dateRange"
        type="daterange"
        formt="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="请选择开始日期"
        end-placeholder="请选择结束日期"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" width="200px" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="所属校区">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column> -->

      <el-table-column align="center" width="200px" label="班级ID">
        <template slot-scope="scope">
          <span>{{ scope.row.class_id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="上课班级">
        <template>
          <span>{{ className }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="400px" label="上课时间">
        <template slot-scope="scope">
          <span>{{ scope.row.starttime | parseTime('{y}-{m}-{d} {h}:{i}') }} — {{ scope.row.endtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="margin-left:50px;">
        <el-form-item label="排课时间" prop="assignTime">
          <el-date-picker
            v-model="dataForm.assignDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始日期"
          />
          <el-time-picker
            v-model="dataForm.assignTime"
            is-range
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'create'" label="排课周期" prop="week">
          <el-select v-model="dataForm.week" placeholder="请选择排课周期">
            <el-option
              v-for="item in dayList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'create'" label="次数" prop="times">
          <el-input v-model="dataForm.times" />
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
import { assignClassList, assignClassAdd, assignClassUpdate, assignClassDelete } from '@/api/school'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'Area',
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
        dateRange: ''
      },
      dataForm: {
        id: undefined,
        assignTIme: ['', ''],
        assignDate: undefined,
        week: undefined,
        times: undefined
        // remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        times: [{ required: true, message: '请选择排课次数', trigger: 'blur' }],
        week: [{ required: true, message: '请选择排课周期', trigger: 'blur' }],
        assignTime: [{ required: true, message: '请选择排课时间', trigger: 'blur' }]
      },
      dayList: [
        {
          id: 1,
          name: '周一'
        },
        {
          id: 2,
          name: '周二'
        },
        {
          id: 3,
          name: '周三'
        },
        {
          id: 4,
          name: '周四'
        },
        {
          id: 5,
          name: '周五'
        },
        {
          id: 6,
          name: '周六'
        },
        {
          id: 7,
          name: '周日'
        }
      ],
      className: ''
    }
  },
  created() {
    this.getList()
    this.className = this.$route.params.name
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        class_id: this.$route.params.id
      }
      assignClassList(params).then(response => {
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
    resetForm() {
      this.dataForm = {
        id: undefined,
        assignTime: ['', ''],
        assignDate: undefined,
        week: undefined,
        times: undefined
        // remark: undefined
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
            class_id: this.$route.params.id,
            startDateTimeString: this.dataForm.assignDate + ' ' + this.dataForm.assignTime[0],
            endDateTimeString: this.dataForm.assignDate + ' ' + this.dataForm.assignTime[1],
            times: this.dataForm.times,
            week: this.dataForm.week
          }
          assignClassAdd(data).then(response => {
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
      // console.log(row)
      const tempData = Object.assign({}, row)
      this.dataForm.id = tempData.id
      this.dataForm.assignDate = tempData.starttime.substring(0, 10)
      this.$set(this.dataForm, 'assignTime', [tempData.starttime.substring(11, 19), tempData.endtime.substring(11, 19)])
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
            // class_id: this.$route.params.id,
            id: this.dataForm.id,
            startDateTimeString: this.dataForm.assignDate + ' ' + this.dataForm.assignTime[0],
            endDateTimeString: this.dataForm.assignDate + ' ' + this.dataForm.assignTime[1]
            // times: this.dataForm.times,
            // week: this.dataForm.week
          }
          assignClassUpdate(data).then(() => {
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
      assignClassDelete(params).then(response => {
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
