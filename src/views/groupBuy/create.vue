<template>
  <div class="app-container">

    <el-card class="box-card">
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <el-form-item label="商品类型" prop="whetherCurriculum">
          <el-radio-group v-model="goods.whetherCurriculum" @change="changeGoodsType">
            <el-radio :label="true" :value="true">课程</el-radio>
            <el-radio :label="false" :value="false">自传</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品排序" prop="user_group_sort">
          <el-input v-model="goods.user_group_sort" placeholder="请输入商品排序" />
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goods.name" />
        </el-form-item>
        <!-- <el-form-item label="所属区域" prop="region_id">
          <el-select v-model="goods.region_id" placeholder="请选择所属区域" @change="changeRegionList">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属校区" prop="campus_id">
          <el-select v-model="goods.campus_id" placeholder="请选择所属校区">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item v-if="goods.whetherCurriculum" label="班级类型" prop="classification_id">
          <el-select v-model="goods.classification_id" placeholder="请选择班级类型" @change="changeClassType">
            <el-option
              v-for="item in classTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="goods.whetherCurriculum" label="课程" prop="curriculum_id">
          <el-select v-model="goods.curriculum_id" placeholder="请选择课程">
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="!goods.whetherCurriculum" label="商品封面图" prop="picUrl">
          <el-upload
            :action="uploadPath"
            :show-file-list="false"
            :headers="headers"
            :before-upload="beforePicUrlUpload"
            class="avatar-uploader"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <img v-if="goods.picUrl" :src="goods.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>

        <el-form-item v-if="!goods.whetherCurriculum" label="商品图片" prop="infoPic">
          <el-upload
            ref="upload"
            :action="uploadPath"
            :headers="headers"
            :before-upload="beforeDetailPicUrlUpload"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
            :file-list="goods.infoPic"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="商品视频">
          <el-upload
            :action="uploadPath"
            :limit="5"
            :headers="headers"
            :on-exceed="uploadOverrun"
            :on-success="handleGalleryUrl"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item> -->

        <el-form-item label="单买价格" prop="user_group_oldprice">
          <el-input v-model="goods.user_group_oldprice" placeholder="请输入单买价格" />
        </el-form-item>

        <el-form-item label="拼团价格" prop="user_group_price">
          <el-input v-model="goods.user_group_price" placeholder="请输入拼团价格" />
        </el-form-item>

        <el-form-item label="拼团人数" prop="user_group_num">
          <el-input v-model="goods.user_group_num" placeholder="请输入拼团人数" />
        </el-form-item>

        <el-form-item label="拼团时间" prop="time">
          <el-date-picker
            v-model="goods.time"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="goods.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
    </el-card>

    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">上架</el-button>
    </div>

  </div>
</template>

<script>
import { groupbuyGoodsAdd, groupbuyGoodsUpdate, groupbuyGoodsDetailById } from '@/api/groupbuy'
import { classTypeAll } from '@/api/school' // schoolAllByRegionId
import { courseByClassTypeId } from '@/api/course'
import { uploadPath } from '@/api/credits'
// import { areaAll } from '@/api/area'
import { getToken } from '@/utils/auth'
import { BosClient } from '@baiducloud/sdk'

export default {
  name: 'GroupbuyGoodsCreate',
  // components: { Editor },

  data() {
    return {
      uploadPath,
      goods: { whetherCurriculum: false, time: [], picUrl: '', infoPic: [] },
      rules: {
        whetherCurriculum: [{ required: true, message: '请选择商品类型', trigger: 'blur' }],
        time: [{ required: true, message: '请选择拼团时间', trigger: 'blur' }],
        user_group_num: [{ required: true, message: '请输入拼团人数', trigger: 'blur' }],
        user_group_price: [{ required: true, message: '请输入拼团价格', trigger: 'blur' }],
        user_group_oldprice: [{ required: true, message: '请输入单买价格', trigger: 'blur' }],
        classification_id: [{ required: true, message: '请选择班级类型', trigger: 'blur' }],
        curriculum_id: [{ required: true, message: '请选择拼团课程', trigger: 'blur' }],
        user_group_sort: [{ required: true, message: '请输入商品排序', trigger: 'blur' }],
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        picUrl: [{ required: true, message: '请输入商品封面图', trigger: 'blur' }],
        infoPic: [{ required: true, message: '请输入商品图片', trigger: 'blur' }]
      },
      classTypeList: [],
      courseList: [],
      areaList: [],
      schoolList: []
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
    if (this.$route.query.id) {
      this.getDetailById(this.$route.query.id)
    } else {
      this.goods = {
        whetherCurriculum: true,
        name: '',
        user_group_sort: '',
        curriculum_id: '',
        // campus_id: '',
        user_group_oldprice: '',
        user_group_price: '',
        user_group_num: '',
        time: [],
        picUrl: '',
        infoPic: [],
        remark: ''
      }
    }
    this.getClassTypeList()
    // this.getRegionList()
  },

  methods: {
    changeGoodsType(e) {
      this.goods.whetherCurriculum = e
    },
    // changeRegionList(e) {
    //   this.getSchoolList(e)
    // },
    // getSchoolList(regionId) {
    //   const params = {
    //     regionId
    //   }
    //   schoolAllByRegionId(params).then(res => {
    //     this.schoolList = res.data.data
    //   }).catch(() => {
    //     this.schoolList = []
    //   })
    // },
    // getRegionList() {
    //   areaAll().then(res => {
    //     this.areaList = res.data.data
    //   }).catch(() => {
    //     this.areaList = []
    //   })
    // },
    changeClassType(e) {
      this.getCourseList(e)
    },
    getCourseList(classTypeId) {
      const params = {
        classification_id: classTypeId
      }
      courseByClassTypeId(params).then(res => {
        this.courseList = res.data.data
      }).catch(() => {
        this.courseList = []
      })
    },
    getClassTypeList() {
      classTypeAll().then(res => {
        this.classTypeList = res.data.data
      }).catch(() => {
        this.classTypeList = []
      })
    },
    getDetailById(goodsId) {
      const params = {
        id: goodsId
      }
      groupbuyGoodsDetailById(params)
        .then(res => {
          const result = res.data.data
          const infoPic = []
          result.user_group_img.split(',').forEach(item => {
            const obj = {
              name: item,
              url: item
            }
            infoPic.push(obj)
          })
          this.goods = {
            whetherCurriculum: result.whetherCurriculum,
            name: result.name,
            user_group_sort: result.user_group_sort,
            // campus_id: result.campus_id,
            curriculum_id: result.curriculum_id,
            user_group_oldprice: result.user_group_oldprice,
            user_group_price: result.user_group_price,
            user_group_num: result.user_group_num,
            time: [result.user_group_starttime, result.user_group_endtime],
            picUrl: result.user_group_cover,
            infoPic: infoPic,
            remark: result.remark
          }
        })
        .catch(() => {
          this.goods = {
            whetherCurriculum: true,
            name: '',
            user_group_sort: '',
            // campus_id: '',
            curriculum_id: '',
            user_group_oldprice: '',
            user_group_price: '',
            user_group_num: '',
            time: [],
            picUrl: '',
            infoPic: [],
            remark: ''
          }
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/groupbuy/groupbuyList' })
    },
    handlePublish: function() {
      const infoPicStr = []
      this.goods.infoPic.forEach(item => {
        infoPicStr.push(item.url)
      })

      const finalGoods = {
        whetherCurriculum: this.goods.whetherCurriculum,
        user_group_sort: this.goods.user_group_sort,
        curriculum_id: this.goods.whetherCurriculum ? this.goods.curriculum_id : '',
        user_group_oldprice: this.goods.user_group_oldprice,
        user_group_price: this.goods.user_group_price,
        start: this.goods.time[0],
        end: this.goods.time[1],
        user_group_num: this.goods.user_group_num,
        remark: this.goods.remark,
        campus_id: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : 1, // 做了用户登录以后拿token获取校区id
        name: this.goods.name,
        user_group_cover: this.goods.whetherCurriculum ? '' : this.goods.picUrl,
        user_group_img: this.goods.whetherCurriculum ? '' : infoPicStr.join(',')
      }
      if (this.$route.query.id) {
        finalGoods.id = this.$route.query.id
        groupbuyGoodsUpdate(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.$router.push({ path: '/groupbuy/groupbuyList' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '修改失败'
            })
          })
      } else {
        groupbuyGoodsAdd(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.$router.push({ path: '/groupbuy/groupbuyList' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message ? response.data.message : '创建失败'
            })
          })
      }
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
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = e => {
        const buffer = new Buffer(e.target.result)
        const client = new BosClient(config)
        client.putObject(bucket, file.name, buffer)
          .then(response => {
            _this.goods.picUrl = config.endpoint + '/' + bucket + '/' + file.name
          })
          .catch(() => {
            this.$notify.error({
              title: '失败',
              message: '封面图上传失败'
            })
          })
      }
      return false
    },
    // uploadPicUrl: function(response) {
    //   this.goods.picUrl = response.data
    // },
    // uploadOverrun: function() {
    //   this.$message({
    //     type: 'error',
    //     message: '上传文件个数超出限制!最多上传5张图片!'
    //   })
    // },
    // handleGalleryUrl(response, file, fileList) {
    //   if (response.code === 0) {
    //     this.goods.infoPic.push({ name: response.data, url: response.data })
    //   }
    // },
    beforeDetailPicUrlUpload(file) {
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
            _this.goods.infoPic.push({ name: config.endpoint + '/' + bucket + '/' + file.name, url: config.endpoint + '/' + bucket + '/' + file.name })
          })
          .catch(() => {
            this.$notify.error({
              title: '失败',
              message: '商品图上传失败'
            })
          })
      }
      return false
    },
    handleRemove: function(file, fileList) {
      for (var i = 0; i < this.goods.infoPic.length; i++) {
        // 这里存在两种情况
        // 1. 如果所删除图片是刚刚上传的图片，那么图片地址是file.response.data.url
        //    此时的file.url虽然存在，但是是本机地址，而不是远程地址。
        // 2. 如果所删除图片是后台返回的已有图片，那么图片地址是file.url
        var url
        if (file.response === undefined) {
          url = file.url
        } else {
          url = file.response.data.url
        }

        if (this.goods.infoPic[i].url === url) {
          this.goods.infoPic.splice(i, 1)
        }
      }
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
