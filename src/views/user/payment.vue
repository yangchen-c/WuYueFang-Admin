<template>
  <div class="app-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px;" placeholder="请输入手机号" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" sortable align="center" width="100" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生ID" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.student_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生名称" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缴费金额" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.money }}元</span>
        </template>
      </el-table-column>
      <el-table-column label="缴费班级" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.classes.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缴费日期" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.paytime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止日期" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.endtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课时" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.hours }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="剩余课时" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row }}元</span>
        </template>
      </el-table-column> -->
      <el-table-column label="备注" width="" align="center">
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="" align="center">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus === 'update'" label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入名称" disabled />
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input v-model="dataForm.money" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="续费时间" prop="paytimeString">
          <el-date-picker
            v-model="dataForm.paytimeString"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择续费日期"
          />
        </el-form-item>
        <el-form-item label="截止时间" prop="endtimeString">
          <el-date-picker
            v-model="dataForm.endtimeString"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择截止日期"
          />
        </el-form-item>
        <el-form-item label="课时" prop="hours">
          <el-input v-model="dataForm.hours" placeholder="请输入总课时" />
        </el-form-item>
        <el-form-item label="缴费班级" prop="class_id">
          <el-select v-model="dataForm.class_id" placeholder="请选择缴费班级">
            <el-option
              v-for="item in classList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" type="textarea" />
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
import { paymentList, paymentAdd, paymentUpdate, studentClassAll } from '@/api/user'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PaymentMgmt',
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        sort: '+id',
        name: '',
        phone: ''
      },
      dataForm: {
        id: undefined,
        name: undefined,
        money: undefined,
        paytimeString: undefined,
        endtimeString: undefined,
        hours: undefined,
        remark: undefined,
        class_id: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        money: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        paytimeString: [{ required: true, message: '请选择续费时间', trigger: 'blur' }],
        endtimeString: [{ required: true, message: '请选择截止时间', trigger: 'blur' }],
        class_id: [{ required: true, message: '请选择续费班级', trigger: 'blur' }],
        hours: [{ required: true, message: '请输入总课时', trigger: 'blur' }]
      },
      classList: []
    }
  },
  created() {
    this.getList()
    this.getStudentClassList()
  },
  methods: {
    getStudentClassList() {
      const studentId = this.$route.params.id
      const params = {
        studentId
      }
      studentClassAll(params).then(res => {
        this.classList = res.data.data
      }).catch(() => {
        this.classList = []
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      const userId = this.$route.params.id
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        student_id: userId,
        name: this.listQuery.name,
        phone: this.listQuery.phone
      }
      paymentList(params).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        name: undefined,
        money: undefined,
        paytimeString: undefined,
        endtimeString: undefined,
        hours: undefined,
        remark: undefined,
        class_id: undefined
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
          const data = Object.assign({}, this.dataForm)
          data.student_id = this.$route.params.id
          paymentAdd(data).then(response => {
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
      this.dataForm.paytimeString = row.paytime
      this.dataForm.endtimeString = row.endtime
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.dataForm)
          data.student_id = this.$route.params.id
          paymentUpdate(data).then(() => {
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
    }
  }
}
</script>
