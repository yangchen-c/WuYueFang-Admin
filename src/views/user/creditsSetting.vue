<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <!-- <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入区域名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div> -->

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="积分值">
        <template slot-scope="scope">
          <span>{{ scope.row.integral_way_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="200px" label="二级分销">
        <template slot-scope="scope">
          <span>{{ scope.row.integral_way_num_two }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="积分值" prop="integral_way_num">
          <el-input v-model="dataForm.integral_way_num" placeholder="请输入积分值" />
        </el-form-item>
        <el-form-item v-if="dataForm.name === '邀请注册成功'" label="二级分销" prop="integral_way_num_two">
          <el-input v-model="dataForm.integral_way_num_two" placeholder="请输入二级分销值" />
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
import { creditsSettingList, creditsSettingUpdate } from '@/api/user'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'CreditsSetting',
  // components: { Pagination },
  data() {
    return {
      list: [],
      // total: 0,
      listLoading: true,
      // listQuery: {
      //   page: 1,
      //   limit: 20,
      //   name: ''
      // },
      dataForm: {
        id: undefined,
        integral_way_num: undefined,
        integral_way_num_two: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改区域',
        create: '添加区域'
      },
      rules: {
        integral_way_num: [{ required: true, message: '请输入积分值', trigger: 'blur' }],
        integral_way_num_two: [{ required: true, message: '请输入积分值', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      creditsSettingList().then(response => {
        this.list = response.data.data
        // this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        // this.total = 0
        this.listLoading = false
      })
    },
    handleFilter() {
      // this.listQuery.page = 1
      this.getList()
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        integral_way_num: undefined,
        integral_way_num_two: undefined
      }
    },
    handleUpdate(row) {
      this.dataForm = {
        id: row.id,
        integral_way_num: row.integral_way_num,
        integral_way_num_two: row.integral_way_num_two,
        name: row.name
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
            integral_way_num: this.dataForm.integral_way_num
          }
          if (this.dataForm.name === '邀请注册成功') {
            data.integral_way_num_two = this.dataForm.integral_way_num_two
          }
          creditsSettingUpdate(data).then(() => {
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
    }
  }
}
</script>
