<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入课程名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" width="150px" label="ID" sortable>
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="所属班级类型">
        <template slot-scope="{row}">
          <span>{{ row.classification.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="课程名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="课程简介">
        <template slot-scope="{row}">
          <span>{{ row.curriculum_context }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="章节数量">
        <template slot-scope="{row}">
          <span>{{ row.details_num }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="课程封面图">
        <template slot-scope="{row}">
          <img :src="row.curriculum_photo" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="课程售价">
        <template slot-scope="{row}">
          <span>{{ row.curriculum_price }}元</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.curriculum_status | statusFilter">{{ row.curriculum_status | statusTxtFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="已售出">
        <template slot-scope="{row}">
          <span>{{ row.curriculum_sales }}份</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="是否展示在首页">
        <template slot-scope="{row}">
          <span>{{ row.curriculum_splendid ? '是' : '否' }}</span>
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
          <el-button v-permission="['课程章节列表']" type="success" size="mini" @click="handleDetail(row)">章节</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" placeholder="请输入课程名称" />
        </el-form-item>
        <el-form-item label="简介" prop="curriculum_context">
          <el-input v-model="dataForm.curriculum_context" placeholder="请输入课程简介" />
        </el-form-item>
        <el-form-item label="封面图" prop="picUrl">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforePicUrlUpload"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="dataForm.picUrl" :src="dataForm.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="视频" prop="videoUrl">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :on-success="uploadVideoUrl"
            class="avatar-uploader"
          >
            <img v-if="dataForm.videoUrl" :src="dataForm.videoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item> -->
        <el-form-item label="已售数量" prop="curriculum_sales">
          <el-input v-model="dataForm.curriculum_sales" placeholder="请输入课程已售数量" />
        </el-form-item>
        <el-form-item label="售价" prop="curriculum_price">
          <el-input v-model="dataForm.curriculum_price" placeholder="请输入课程售价" />
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
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="是否展示在首页" prop="curriculum_splendid">
          <el-radio-group v-model="dataForm.curriculum_splendid">
            <el-radio :label="false" :value="false">不显示</el-radio>
            <el-radio :label="true" :value="true">显示</el-radio>
          </el-radio-group>
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
import { courseList, courseAdd, courseUpdate, courseDelete } from '@/api/course'
import { classTypeAll } from '@/api/school'
import { uploadPath } from '@/api/credits'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'
import { getToken } from '@/utils/auth'
import { BosClient } from '@baiducloud/sdk'

export default {
  name: 'CourseMgmt',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        1: '上架',
        2: '下架'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 8课程顾问
      uploadPath,
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
        name: undefined,
        curriculum_context: undefined,
        picUrl: undefined,
        // videoUrl: undefined,
        curriculum_sales: undefined,
        curriculum_price: undefined,
        // sort: undefined,
        classification_id: undefined,
        remark: undefined,
        curriculum_splendid: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改课程',
        create: '添加课程'
      },
      rules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        picUrl: [{ required: true, message: '请上传课程封面图', trigger: 'blur' }],
        // videoUrl: [{ required: true, message: '请上传课程视频', trigger: 'blur' }],
        curriculum_sales: [{ required: true, message: '请输入课程已售数量', trigger: 'blur' }],
        curriculum_price: [{ required: true, message: '请输入课程售价', trigger: 'blur' }],
        // sort: [{ required: true, message: '请输入课程排序', trigger: 'blur' }],
        classification_id: [{ required: true, message: '请选择班级类型', trigger: 'blur' }],
        curriculum_splendid: [{ required: true, message: '请选择班级类型', trigger: 'blur' }]
      },
      classTypeList: []
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
    this.getClassTypeList()
    this.getList()
  },
  methods: {
    getClassTypeList() {
      classTypeAll().then(res => {
        this.classTypeList = res.data.data
      }).catch(() => {
        this.classTypeList = []
      })
    },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        name: this.listQuery.name,
        campusId: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId.length) ? this.$store.state.user.campusId[0] : 0,
        regionId: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : 0
      }
      courseList(params)
        .then(response => {
          this.list = response.data.data.currentList
          this.total = response.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
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
        curriculum_context: undefined,
        picUrl: undefined,
        // videoUrl: undefined,
        curriculum_sales: undefined,
        curriculum_price: undefined,
        // sort: undefined,
        classification_id: undefined,
        remark: undefined,
        curriculum_splendid: false
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
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
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = e => {
        const buffer = new Buffer(e.target.result)
        const client = new BosClient(config)
        client.putObject(bucket, file.name, buffer)
          .then(response => {
            _this.dataForm.picUrl = config.endpoint + '/' + bucket + '/' + file.name
          })
          .catch(error => {
            this.$notify.error({
              title: '失败',
              message: '封面图上传失败'
            })
          })
      }      
      return false
    },
    // uploadPicUrl: function(response) {
    //   console.log(response.data)
    //   this.dataForm.picUrl = response.data
    //   console.log(this.dataForm.picUrl)
    // },
    // uploadVideoUrl: function(response) {
    //   this.dataForm.videoUrl = response.data
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
            name: this.dataForm.name,
            curriculum_context: this.dataForm.curriculum_context,
            curriculum_photo: this.dataForm.picUrl,
            curriculum_sales: this.dataForm.curriculum_sales,
            curriculum_price: this.dataForm.curriculum_price,
            // sort: this.dataForm.sort,
            classification_id: this.dataForm.classification_id,
            remark: this.dataForm.remark,
            campus_id: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : 1,
            region_id: this.$store.state.user.regionId ? this.$store.state.user.regionId : 1,
            curriculum_splendid: this.dataForm.curriculum_splendid
          }
          courseAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.getList()
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '创建失败'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dataForm = Object.assign({}, row)
      this.dataForm.picUrl = this.dataForm.curriculum_photo
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
            curriculum_context: this.dataForm.curriculum_context,
            curriculum_photo: this.dataForm.picUrl,
            curriculum_sales: this.dataForm.curriculum_sales,
            curriculum_price: this.dataForm.curriculum_price,
            // sort: this.dataForm.sort,
            classification_id: this.dataForm.classification_id,
            remark: this.dataForm.remark,
            campus_id: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : 1,
            region_id: this.$store.state.user.regionId ? this.$store.state.user.regionId : 1,
            curriculum_splendid: this.dataForm.curriculum_splendid
          }
          courseUpdate(data).then(() => {
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
      courseDelete(params)
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
            message: response.data.message ? response.data.message : '删除失败'
          })
        })
    },
    handleDetail(row) {
      this.$router.push({ path: '/course/courseDetailList', query: { id: row.id }})
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
