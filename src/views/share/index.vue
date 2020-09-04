<template>
  <div class="dashboard-editor-container">
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
    </div>

    <el-row v-if="list.length" :gutter="40" class="panel-group">
      <el-col v-for="item in list" :key="item.id" :xs="12" :sm="12" :lg="3" class="card-panel-col">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.name" class="image">
          <div style="padding: 0 14px;">
            <div class="bottom clearfix">
              <p class="time">模板排序: {{ item.sort }}</p>
            </div>
            <div class="bottom clearfix">
              <p class="time">模板状态: {{ item.use ? '使用' : '未使用' }}</p>
            </div>
          </div>
          <div style="padding: 0 14px 20px;">
            <el-button type="primary" size="mini" @click="handleUpdate(item)">修改</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(item)">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row v-else class="no-data">
      暂无数据，快去添加吧！
    </el-row>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dataForm.sort" placeholder="请输入排序" />
        </el-form-item>
        <!-- <el-form-item label="链接" prop="banner_index_url">
          <el-input v-model="dataForm.banner_index_url" placeholder="请输入链接" />
        </el-form-item> -->
        <el-form-item label="图片" prop="name">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforePicUrlUpload"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="dataForm.name" :src="dataForm.name" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
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
import { uploadPath } from '@/api/credits'
import { getToken } from '@/utils/auth'
import { shareTemplateList, shareTemplateAdd, shareTemplateUpdate, shareTemplateDelete } from '@/api/share'
// import { Loading } from 'element-ui'
import { BosClient } from '@baiducloud/sdk'

export default {
  data() {
    return {
      uploadPath,
      list: [],
      dataForm: {
        id: undefined,
        sort: undefined,
        // banner_index_url: undefined,
        name: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        // banner_index_url: [{ required: true, message: '请输入链接', trigger: 'blur' }],
        name: [{ required: true, message: '请选择图片', trigger: 'blur' }]
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
      const loading = this.$loading({
        lock: true,
        text: '加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      shareTemplateList().then(res => {
        this.list = res.data.data
        loading.close()
      }).catch(err => {
        this.list = []
        loading.close()
        this.$notify.error({
          title: '失败',
          message: err.data.message || '获取失败'
        })
      })
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        sort: undefined,
        // banner_index_url: undefined,
        name: undefined
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
          shareTemplateAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '添加成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message || '添加失败'
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
          const data = Object.assign({}, this.dataForm)
          shareTemplateUpdate(data).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message || '修改失败'
            })
          })
        }
      })
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      shareTemplateDelete(params).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        this.getList()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message || '删除失败'
        })
      })
    },
    // uploadPicUrl: function(response) {
    //   this.dataForm.name = response.data
    // },
    beforePicUrlUpload(file) {
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
            _this.dataForm.name = config.endpoint + '/' + bucket + '/' + file.name
          })
          .catch(() => {
            this.$notify.error({
              title: '失败',
              message: '上传失败'
            })
          })
      }
      return false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
}

.panel-group {
  margin-top: 18px;

  .card-panel-col{
    margin-bottom: 32px;

    .image {
      width: 100%;
      height: 320px;
    }
  }
}
</style>
<style>
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
.no-data {
  line-height: 100px;
}
.bottom {
  display: flex;
  justify-content: flex-start;
}
.time {
  font-size: 14px;
  color: #999;
}
.time+.time {
  margin-left: 10px;
}
</style>
