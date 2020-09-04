<template>
  <div class="app-container">

    <el-card class="box-card">
      <h3>商品介绍</h3>
      <el-form ref="goods" :rules="rules" :model="goods" label-width="150px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="goods.name" />
        </el-form-item>
        <el-form-item label="商品标题" prop="title">
          <el-input v-model="goods.title" />
        </el-form-item>
        <el-form-item label="商品排序" prop="sort">
          <el-input v-model="goods.sort" />
        </el-form-item>
        <el-form-item label="商品分类" prop="categary">
          <el-select v-model="goods.categary" placeholder="选择分类">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="商品封面图片" prop="picture">
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
        <el-form-item label="商品详情图片" prop="detailPic">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :before-upload="beforeDetailPicUrlUpload"
            :on-remove="handleRemove"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
            :file-list="goods.detailPic"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>

        <el-form-item label="轮播图" prop="banner">
          <el-upload
            :action="uploadPath"
            :headers="headers"
            :before-upload="beforeBannersUpload"
            :on-remove="handleRemove1"
            multiple
            accept=".jpg,.jpeg,.png,.gif"
            list-type="picture-card"
            :file-list="goods.banners"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品售价" prop="price">
          <el-input v-model="goods.price" type="number" placeholder="0.00">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item label="已售" prop="sales">
          <el-input v-model="goods.sales" type="number" placeholder="0">
            <template slot="append">件</template>
          </el-input>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="goods.remark" type="textarea" />
        </el-form-item>

      </el-form>
    </el-card>

    <el-card class="box-card">
      <h3>商品规格</h3>
      <el-form
        ref="specForm"
        :rules="rules"
        :model="specForm"
        label-width="150px"
      >
        <!-- <el-row :gutter="20" type="flex" align="middle" style="padding:20px 0;">
          <el-col :span="10">
            <el-form-item label="库存" placeholder="0" prop="stock">
              <el-input v-model="goods.stock" type="number" style="width: 450px;">
                <template slot="append">件</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20" type="flex" align="middle" style="padding:20px 0;">
          <el-col :span="4">
            <el-form-item label="规格组和规格值" prop="trade_color">
              <!-- <el-select v-model="specForm.color" placeholder="选择颜色" style="width: 225px;">
                <el-option label="白色" value="white"></el-option>
                <el-option label="粉色" value="pink"></el-option>
              </el-select>

              <el-select v-model="specForm.size" placeholder="选择尺码" style="width: 225px;">
                <el-option label="L" value="l"></el-option>
                <el-option label="XL" value="xl"></el-option>
              </el-select> -->
              <el-input v-model="specForm.trade_color" style="width: 200px;" placeholder="请输入商品颜色" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: -160px;">
            <el-form-item label="" prop="trade_size">
              <el-input v-model="specForm.trade_size" style="width: 200px;" placeholder="请输入商品尺码" />
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: -160px;">
            <el-form-item label="" prop="trade_num">
              <el-input v-model="specForm.trade_num" type="number" style="width: 200px;" placeholder="请输入商品库存">
                <template slot="append">件</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" style="margin-left: -160px;">
            <el-form-item label="">
              <el-button :plain="true" type="primary" @click="handleSpecificationAdd">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-table :data="specifications" style="width: 600px; margin: 30px 0 0 150px;">
        <el-table-column property="sales" align="center" label="库存">
          <template slot-scope="scope">
            <span>{{ scope.row.trade_num }}</span>
          </template>
        </el-table-column>

        <el-table-column property="color" align="center" label="颜色">
          <template slot-scope="scope">
            <span>{{ scope.row.trade_color }}</span>
          </template>
        </el-table-column>
        <el-table-column property="size" align="center" label="尺码">
          <template slot-scope="scope">
            <span>{{ scope.row.trade_size }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="250"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleSpecificationDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- <el-card class="box-card">
      <h3>备注</h3>
      <el-form ref="goods" :rules="rules" :model="goodsDetail" label-width="150px" style="width: 1000px;">
        <el-form-item label="备注" prop="goodsDetail">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
    </el-card> -->

    <!-- <el-card class="box-card">
      <h3>首页显示</h3>
      <el-form ref="goods" :rules="rules" :model="indexConfig" label-width="150px">
        <el-form-item label="是否显示在首页" prop="isHome">
          <el-radio-group v-model="indexConfig.isHome">
            <el-radio :label="true" :value="true">不显示</el-radio>
            <el-radio :label="false" :value="false">显示</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-card> -->
    <div class="op-container">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handlePublish">上架</el-button>
    </div>

  </div>
</template>

<script>
import { creditsGoodsAdd, creditsGoodsUpdate, uploadPath, creditsGoodsCategoryAll, creditsGoodsDetailByGoodsId, creditsGoodsSpecList } from '@/api/credits'
// import Editor from '@tinymce/tinymce-vue'
// import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import { BosClient } from '@baiducloud/sdk'

export default {
  name: 'GoodsCreate',
  // components: { Editor },

  data() {
    return {
      uploadPath,
      goods: { picUrl: '', detailPic: [], banners: [] },
      specVisiable: false,
      specForm: { 'trade_num': '', 'trade_color': '', 'trade_size': '' },
      specifications: [],
      rules: {
        title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入商品排序', trigger: 'blur' }],
        price: [{ required: true, message: '请输入商品售价', trigger: 'blur' }],

        trade_color: [{ required: true, message: '请输入商品颜色', trigger: 'blur' }],
        trade_size: [{ required: true, message: '请输入商品尺码', trigger: 'blur' }],
        trade_num: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],

        picture: [{ required: true, message: '请上传商品图片', trigger: 'blur' }],
        detailPic: [{ required: true, message: '请上传商品详情图片', trigger: 'blur' }],
        banner: [{ required: true, message: '请上传轮播图片', trigger: 'blur' }],
        categary: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },

      // indexConfig: {
      //   isHome: true
      // },
      categoryList: [] // 分类列表
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
    if (this.$route.query.trade) {
      this.getGoodsDetail(this.$route.query.trade)
      // console.log(this.$route.query.trade)
      // const tradeInfo = this.$route.query.trade
      // this.goods = {
      //   name: tradeInfo.name,
      //   title: tradeInfo.trade_title,
      //   sort: tradeInfo.trade_sort,
      //   categary: tradeInfo.category_id,
      //   picUrl: tradeInfo.trade_picture,
      //   detailPic: tradeInfo.img.split(','),
      //   banners: tradeInfo.banner_img.split(','),
      //   price: tradeInfo.trade_integral,
      //   remark: tradeInfo.remark
      // }
      // this.getSpecList(tradeInfo.id)
      // this.indexConfig.isHome = tradeInfo.trade_is_home
    } else {
      this.goods = { name: '', title: '', sort: '', price: '', remark: '', picUrl: '', detailPic: [], banners: [] }
      this.specifications = []
      // this.indexConfig.isHome = true
    }
    this.getCategoryAll()
    // this.init()
  },

  methods: {
    getGoodsDetail(data) {
      const params = {
        id: data.id
      }
      creditsGoodsDetailByGoodsId(params)
        .then(res => {
          const tradeInfo = res.data.data

          const banners = []
          tradeInfo.banner_img.split(',').forEach(item => {
            const obj = {
              name: item,
              url: item
            }
            banners.push(obj)
          })

          const detailPic = []
          tradeInfo.img.split(',').forEach(item => {
            const obj = {
              name: item,
              url: item
            }
            detailPic.push(obj)
          })

          this.goods = {
            name: tradeInfo.name,
            title: tradeInfo.trade_title,
            sort: tradeInfo.trade_sort,
            categary: tradeInfo.category_id,
            picUrl: tradeInfo.trade_picture,
            detailPic: detailPic,
            banners: banners,
            price: tradeInfo.trade_integral,
            remark: tradeInfo.remark
          }
          this.getSpecList(tradeInfo.id)
          // this.indexConfig.isHome = tradeInfo.trade_is_home
        })
        .catch(() => {
          this.goods = { name: '', title: '', sort: '', price: '', remark: '', picUrl: '', detailPic: [], banners: [] }
          this.specifications = []
        })
    },
    getSpecList(selectedTradeId) {
      const params = {
        tradeId: selectedTradeId
      }
      creditsGoodsSpecList(params)
        .then(res => {
          this.specifications = res.data.data
        })
        .catch(() => {
          this.specifications = []
        })
    },
    getCategoryAll() {
      creditsGoodsCategoryAll()
        .then(res => {
          this.categoryList = res.data.data
        })
        .catch(() => {
          this.categoryList = []
        })
    },
    init: function() {
      // listCatAndBrand().then(response => {
      //   this.categoryList = response.data.data.categoryList
      //   this.brandList = response.data.data.brandList
      // })
    },
    handleCancel: function() {
      this.$router.push({ path: '/credits/creditsGoods' })
    },
    handlePublish: function() {
      // const detailPic = this.goods.detailPic.join(',')
      // const bannerPic = this.goods.banners.join(',')

      const detailPic = []
      this.goods.detailPic.forEach(item => {
        detailPic.push(item.url)
      })
      const bannerPic = []
      this.goods.banners.forEach(item => {
        bannerPic.push(item.url)
      })

      const finalGoods = {
        // goods: this.goods,
        // specifications: this.specifications
        state: 0,
        name: this.goods.name,
        trade_title: this.goods.title,
        trade_sort: this.goods.sort,
        category_id: this.goods.categary,

        trade_picture: this.goods.picUrl,
        banner_img: bannerPic.join(','),
        img: detailPic.join(','),

        trade_integral: this.goods.price,
        remark: this.goods.remark,

        trade_spec: this.specifications
        // trade_is_home: this.indexConfig.isHome

      }
      if (this.$route.query.trade) {
        finalGoods.id = this.$route.query.trade.id
        creditsGoodsUpdate(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '修改成功'
            })
            this.$router.push({ path: '/credits/creditsGoods' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
      } else {
        creditsGoodsAdd(finalGoods)
          .then(response => {
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.$router.push({ path: '/credits/creditsGoods' })
          })
          .catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
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
            _this.goods.detailPic.push({ name: config.endpoint + '/' + bucket + '/' + file.name, url: config.endpoint + '/' + bucket + '/' + file.name })
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
    beforeBannersUpload(file) {
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
            _this.goods.banners.push({ name: config.endpoint + '/' + bucket + '/' + file.name, url: config.endpoint + '/' + bucket + '/' + file.name })
          })
          .catch(() => {
            this.$notify.error({
              title: '失败',
              message: '轮播图上传失败'
            })
          })
      }
      return false
    },
    // uploadPicUrl(response) {
    //   this.goods.picUrl = response.data
    // },
    // uploadOverrun() {
    //   this.$message({
    //     type: 'error',
    //     message: '上传文件个数超出限制!最多上传5张图片!'
    //   })
    // },
    // handleGalleryUrl(response, file, fileList) {
    //   if (response.code === 0) {
    //     this.goods.detailPic.push({ name: response.data, url: response.data })
    //   }
    // },
    // handleGalleryUrl1(response, file, fileList) {
    //   if (response.code === 0) {
    //     this.goods.banners.push({ name: response.data, url: response.data })
    //   }
    // },
    handleRemove(file, fileList) {
      for (var i = 0; i < this.goods.detailPic.length; i++) {
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

        if (this.goods.detailPic[i].url === url) {
          this.goods.detailPic.splice(i, 1)
        }
      }
    },
    handleRemove1(file, fileList) {
      for (var i = 0; i < this.goods.banners.length; i++) {
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

        if (this.goods.banners[i].url === url) {
          this.goods.banners.splice(i, 1)
        }
      }
    },
    handleSpecificationAdd() {
      if (!this.specForm.trade_color || !this.specForm.trade_size || !this.specForm.trade_num) {
        this.$message({
          type: 'error',
          message: '请填写规格'
        })
        return
      }
      this.specifications.push(this.specForm)
      this.specForm = {}
    },
    handleSpecificationDelete(row) {
      const index = this.specifications.indexOf(row)
      this.specifications.splice(index, 1)
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
