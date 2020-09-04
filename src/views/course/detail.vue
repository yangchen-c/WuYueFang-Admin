<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入章节名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="150px" label="ID" prop="id" sortable>
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="200px" label="章节名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.details_sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="300px" label="视频地址">
        <template slot-scope="scope">
          <span>{{ scope.row.details_url }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="播放量">
        <template slot-scope="scope">
          <span>{{ scope.row.details_play_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="免费观看时长">
        <template slot-scope="scope">
          <span>{{ scope.row.details_can_see }}s</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="备注">
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

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="章节名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入章节名称" />
        </el-form-item>
        <el-form-item label="章节视频" prop="details_url">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforeVideoUrlUpload"
            class="avatar-uploader"
          >
            <video v-if="dataForm.details_url" :src="dataForm.details_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <!-- <img v-if="dataForm.details_url" :src="dataForm.details_url" class="avatar"> -->
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon" /> -->
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" prop="details_sort">
          <el-input v-model="dataForm.details_sort" placeholder="请输入章节排序" />
        </el-form-item>
        <el-form-item label="免费观看时长" prop="details_can_see">
          <el-input v-model="dataForm.details_can_see" type="number" placeholder="请输入免费观看时长">
            <template slot="append">s</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" type="textarea" placeholder="请输入备注" />
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
import { chapterList, chapterAdd, chapterUpdate, chapterDelete } from '@/api/course'
import { uploadPath } from '@/api/credits'
// import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { getToken } from '@/utils/auth'
import { BosClient } from '@baiducloud/sdk'

export default {
  name: 'Details',
  // components: { Pagination },
  data() {
    return {
      uploadPath,
      list: [],
      // total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: ''
      },
      dataForm: {
        id: undefined,
        name: undefined,
        details_sort: undefined,
        details_url: undefined,
        remark: undefined,
        details_can_see: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改章节',
        create: '添加章节'
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        details_sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        details_url: [{ required: true, message: '请上传视频', trigger: 'blur' }],
        details_can_see: [{ required: true, message: '请输入免费观看时长', trigger: 'blur' }]
      }
    }
  },
  computed: {
    headers() {
      return {
        'token': getToken()
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
        curriculum_id: this.$route.query.id
      }
      chapterList(params).then(response => {
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
        name: undefined,
        details_sort: undefined,
        details_url: undefined,
        remark: undefined,
        details_can_see: undefined
      }
    },
    beforeVideoUrlUpload(file) {
      const _this = this
      const config = {
        endpoint: 'http://bj.bcebos.com', // 传入Bucket所在区域域名
        credentials: {
          ak: 'd4f7997db9c74baf96a42483bdfcd558', // 您的AccessKey
          sk: '33e1fa5a8e6b4c11a0638cad34e85980' // 您的SecretAccessKey
        }
      }
      const bucket = 'wuyuefang'
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = e => {
        const buffer = new Buffer(e.target.result)
        const client = new BosClient(config)
        client.putObject(bucket, file.name, buffer)
          .then(response => {
            _this.dataForm.details_url = config.endpoint + '/' + bucket + '/' + file.name
          })
          .catch(() => {
            this.$notify.error({
              title: '失败',
              message: '视频上传失败'
            })
          })
      }
      return false
    },
    // uploadVideoUrl: function(response) {
    //   this.dataForm.details_url = response.data
    // },
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
            curriculum_id: this.$route.query.id,
            name: this.dataForm.name,
            details_sort: this.dataForm.details_sort,
            details_url: this.dataForm.details_url,
            remark: this.dataForm.remark,
            details_can_see: this.dataForm.details_can_see
          }
          chapterAdd(data).then(response => {
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
      this.dataForm = Object.assign({}, row)
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
            curriculum_id: this.$route.query.id,
            id: this.dataForm.id,
            name: this.dataForm.name,
            details_sort: this.dataForm.details_sort,
            details_url: this.dataForm.details_url,
            remark: this.dataForm.remark,
            details_can_see: this.dataForm.details_can_see
          }
          chapterUpdate(data).then(() => {
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
      chapterDelete(params).then(response => {
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
.el-card {
  margin-bottom: 10px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.input-new-keyword {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.avatar-uploader .el-upload {
  width: 145px;
  height: 145px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>
