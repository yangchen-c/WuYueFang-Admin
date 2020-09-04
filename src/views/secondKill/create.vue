<template>
  <div class="app-container">

    <el-card class="box-card">
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <!-- <el-form-item label="商品名称" prop="seckill_name">
          <el-input v-model="goods.seckill_name" />
        </el-form-item> -->
        <el-form-item label="商品排序" prop="seckill_sort">
          <el-input v-model="goods.seckill_sort" />
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
        <el-form-item label="班级类型" prop="classification_id">
          <el-select v-model="goods.classification_id" placeholder="请选择班级类型" @change="changeClassType">
            <el-option
              v-for="item in classTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程" prop="curriculum_id">
          <el-select v-model="goods.curriculum_id" placeholder="请选择课程">
            <el-option
              v-for="item in courseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="原价" prop="seckill_oldprice">
          <el-input v-model="goods.seckill_oldprice" placeholder="请输入商品原价" />
        </el-form-item>
        <el-form-item label="秒杀价格" prop="seckill_price">
          <el-input v-model="goods.seckill_price" placeholder="请输入商品秒杀价格" />
        </el-form-item>
        <el-form-item label="秒杀时间" prop="time">
          <el-date-picker
            v-model="goods.time"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="限购数量" prop="seckill_limit_num">
          <el-input v-model="goods.seckill_limit_num" placeholder="请输入商品限购数量" />
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
import { secondKillGoodsAdd, secondKillGoodsUpdate, secondKillGoodsDetailById } from '@/api/secondKill'
import { classTypeAll } from '@/api/school' // schoolAllByRegionId
import { courseByClassTypeId } from '@/api/course'
// import { areaAll } from '@/api/area'
import { getToken } from '@/utils/auth'

export default {
  name: 'SecondKillGoodsCreate',
  data() {
    return {
      goods: { time: [] },
      rules: {
        // seckill_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        seckill_sort: [{ required: true, message: '请输入商品排序', trigger: 'blur' }],
        classification_id: [{ required: true, message: '请选择班级类型', trigger: 'blur' }],
        curriculum_id: [{ required: true, message: '请选择课程', trigger: 'blur' }],
        seckill_oldprice: [{ required: true, message: '请输入商品原价', trigger: 'blur' }],
        seckill_price: [{ required: true, message: '请输入商品秒杀价格', trigger: 'blur' }],
        time: [{ required: true, message: '请选择商品秒杀时间', trigger: 'blur' }],
        seckill_limit_num: [{ required: true, message: '请输入商品数量', trigger: 'blur' }]
        // region_id: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        // campus_id: [{ required: true, message: '请选择所属校区', trigger: 'blur' }]
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
        seckill_name: '',
        seckill_sort: '',
        curriculum_id: '',
        seckill_oldprice: '',
        seckill_price: '',
        time: [],
        seckill_limit_num: '',
        remark: '',
        classification_id: ''
        // region_id: '',
        // campus_id: ''
      }
    }
    this.getClassTypeList()
    // this.getRegionList()
  },

  methods: {
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
      secondKillGoodsDetailById(params)
        .then(res => {
          this.goods = res.data.data
          // this.goods.seckill_name = res.data.data.name
          this.goods.time = [res.data.data.seckill_starttime, res.data.data.seckill_endtime]
        })
        .catch(() => {
          console.log('err')
        })
    },
    handleCancel: function() {
      this.$router.push({ path: '/secondkill/secondkillList' })
    },
    handlePublish: function() {
      const finalGoods = {
        // seckill_name: this.goods.seckill_name,
        seckill_sort: this.goods.seckill_sort,
        curriculum_id: this.goods.curriculum_id, // 做了课程管理页面后获取课程列表
        seckill_price: this.goods.seckill_price,
        seckill_oldprice: this.goods.seckill_oldprice,
        start: this.goods.time[0],
        end: this.goods.time[1],
        seckill_limit_num: this.goods.seckill_limit_num,
        remark: this.goods.remark,
        campus_id: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : '1' // 做了用户登录以后拿token获取校区id
        // classification_id: this.goods.classification_id
      }
      if (this.$route.query.id) {
        finalGoods.id = this.$route.query.id
        secondKillGoodsUpdate(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.$router.push({ path: '/secondkill/secondkillList' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      } else {
        secondKillGoodsAdd(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.$router.push({ path: '/secondkill/secondkillList' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
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
