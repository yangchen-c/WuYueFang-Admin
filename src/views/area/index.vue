<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入区域名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="150px" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="成立时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
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
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" placeholder="请输入排序" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入区域名称" />
        </el-form-item>
        <el-form-item label="成立时间" prop="time">
          <el-date-picker
            v-model="dataForm.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择成立日期"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" />
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
import { areaList, areaAdd, areaUpdate, areaDelete } from '@/api/area'
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
        name: ''
      },
      dataForm: {
        id: undefined,
        sort: undefined,
        name: undefined,
        time: undefined,
        remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改区域',
        create: '添加区域'
      },
      rules: {
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        time: [{ required: true, message: '请选择成立时间', trigger: 'blur' }]
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
        name: this.listQuery.name
      }
      areaList(params).then(response => {
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
        sort: undefined,
        name: undefined,
        time: undefined,
        remark: undefined
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
            sort: this.dataForm.sort,
            name: this.dataForm.name,
            regionTime: this.dataForm.time,
            remark: this.dataForm.remark
          }
          areaAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '创建成功'
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
      this.dataForm = {
        id: row.id,
        sort: row.sort,
        name: row.name,
        time: row.time,
        remark: row.remark
      }
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
            sort: this.dataForm.sort,
            name: this.dataForm.name,
            time: this.dataForm.time,
            remark: this.dataForm.remark
          }
          areaUpdate(data).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '更新成功'
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
      areaDelete(params).then(response => {
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
