<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-button v-permission="['积分商品添加']" class="filter-item" type="primary" icon="el-icon-edit" style="margin-right: 100px;" @click="handleCreate">添加</el-button>
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入商品名称" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <!-- <el-table-column type="expand" align="center">
        <template slot-scope="props">
          <el-row style="height: 50px; line-height: 50px; color: #99a9bf; font-weight: 600;">
            <el-col :span="2" align="center">规格颜色</el-col>
            <el-col :span="2" align="center">规格尺码</el-col>
            <el-col :span="2" align="center">规格库存</el-col>
            <el-col :span="2" align="center"></el-col>
          </el-row>
          <el-row style="height: 50px; line-height: 50px;">
            <el-col :span="2" align="center">{{props.row.name}}</el-col>
            <el-col :span="2" align="center">{{props.row.name}}</el-col>
            <el-col :span="2" align="center">{{props.row.name}}</el-col>
            <el-col :span="2" align="center">
              <el-button type="primary" size="mini" @click="handleUpdateSpec(props.row)">编辑</el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="商品ID" min-width="80" prop="id" />

      <el-table-column align="center" min-width="100" label="商品排序">
        <template slot-scope="{row}">
          <span>{{ row.trade_sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品名称">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品标题">
        <template slot-scope="{row}">
          <span>{{ row.trade_title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品分类">
        <template slot-scope="{row}">
          <span>{{ row.category.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品轮播图">
        <template slot-scope="{row}">
          <el-image v-for="(banner, index) in row.banners" :key="index" :src="banner" :preview-src-list="row.banners" style="width: 40px; height: 40px; margin-right: 5px;" />
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品封面图片">
        <template slot-scope="{row}">
          <img :src="row.trade_picture" width="60">
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品详情图片">
        <template slot-scope="{row}">
          <el-image v-for="(photo, index) in row.photos" :key="index" :src="photo" :preview-src-list="row.photos" style="width: 40px; height: 40px; margin-right: 5px;" />
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="商品售价">
        <template slot-scope="{row}">
          <span>{{ row.trade_integral }}积分</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="库存">
        <template slot-scope="{row}">
          <span>{{ row.trade_stock }}件</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.state === 0 ? 'success' : 'error' ">{{ row.state === 0 ? '在售' : '未售' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100" label="已兑换量">
        <template slot-scope="{row}">
          <span>{{ row.trade_completed }}积分</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="showSpecList(row)">规格</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getSearchResult" />

    <el-dialog :visible.sync="detailDialogVisible" title="商品规格">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreateSpec">添加</el-button>
      </div>
      <el-table v-loading="specListLoading" :data="specList" element-loading-text="正在查询中。。。" border fit highlight-current-row>

        <el-table-column align="center" label="ID" prop="id" />

        <el-table-column align="center" min-width="100" label="名称">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="尺码">
          <template slot-scope="{row}">
            <span>{{ row.trade_size }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="颜色">
          <template slot-scope="{row}">
            <span>{{ row.trade_color }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100" label="库存">
          <template slot-scope="{row}">
            <span>{{ row.trade_num }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="200" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="handleUpdateSpec(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDeleteSpec(row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dataForm.name" />
        </el-form-item>
        <el-form-item label="尺码" prop="trade_size">
          <el-input v-model="dataForm.trade_size" />
        </el-form-item>
        <el-form-item label="颜色" prop="trade_color">
          <el-input v-model="dataForm.trade_color" />
        </el-form-item>
        <el-form-item label="库存" prop="trade_num">
          <el-input v-model="dataForm.trade_num" type="number" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dataForm.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createDataSpec">确定</el-button>
        <el-button v-else type="primary" @click="updateDataSpec">确定</el-button>
      </div>
    </el-dialog>

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

  </div>
</template>

<script>
import { creditsGoodsDelete, creditsGoodsSearch, creditsGoodsSpecList, creditsGoodsSpecAdd, creditsGoodsSpecUpdate, creditsGoodsSpecDelete } from '@/api/credits'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'GoodsList',
  components: { BackToTop, Pagination },
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
      detailDialogVisible: false,
      specListLoading: true,
      specList: [],

      dataForm: {
        id: undefined,
        trade_size: undefined,
        trade_color: undefined,
        trade_num: undefined,
        remark: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改规格',
        create: '添加规格'
      },
      rules: {
        trade_size: [{ required: true, message: '请输入规格尺码', trigger: 'blur' }],
        trade_color: [{ required: true, message: '请输入规格颜色', trigger: 'blur' }],
        trade_num: [{ required: true, message: '请输入规格库存', trigger: 'blur' }]
      },
      selectedTradeId: ''
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    getSearchResult() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        name: this.listQuery.name
      }
      creditsGoodsSearch(params)
        .then(res => {
          const result = res.data.data.currentList
          result.forEach(item => {
            item.photos = item.img.split(',')
            item.banners = item.banner_img.split(',')
          })
          this.list = result
          this.total = res.data.data.totalRecords
          this.listLoading = false
        })
        .catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
    },
    // getList() {
    //   this.listLoading = true
    //   const params = {
    //     offset: this.listQuery.page,
    //     limit: this.listQuery.limit
    //   }
    //   creditsGoodsList(params)
    //     .then(response => {
    //       this.list = response.data.data.currentList
    //       this.total = response.data.data.totalRecords
    //       this.listLoading = false
    //     })
    //     .catch(() => {
    //       this.list = []
    //       this.total = 0
    //       this.listLoading = false
    //     })
    // },
    handleFilter() {
      this.listQuery.page = 1
      // if (this.listQuery.name) {
      this.getSearchResult()
      // } else {
      //   this.getList()
      // }
    },
    resetForm() {
      this.dataForm = {
        id: undefined,
        trade_size: undefined,
        trade_color: undefined,
        trade_num: undefined,
        remark: undefined
      }
    },
    handleCreate() {
      this.$router.push({ path: '/credits/creditsGoodsCreate' })
    },
    handleUpdate(row) {
      this.$router.push({ path: '/credits/creditsGoodsCreate', query: { trade: row }})
    },
    handleDelete(row) {
      const params = {
        id: row.id
      }
      creditsGoodsDelete(params).then(response => {
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
        this.getSearchResult()
      }).catch(response => {
        this.$notify.error({
          title: '失败',
          message: response.data.message
        })
      })
    },

    showSpecList(row) {
      this.detailDialogVisible = true
      this.selectedTradeId = row.id
      this.getSpecList(row.id)
    },
    getSpecList(selectedTradeId) {
      const params = {
        tradeId: selectedTradeId
      }
      creditsGoodsSpecList(params)
        .then(res => {
          // let resultArr = []
          // let result = res.data.data
          // result.forEach(item => {
          //   for (let key in item) {
          //     for (let k in item[key]) {
          //       let obj = {size: key, color: k, stock: item[key][k]}
          //       resultArr.push(obj)
          //     }
          //   }
          // })
          this.specList = res.data.data
          this.specListLoading = false
        })
        .catch(() => {
          this.specList = []
          this.specListLoading = false
        })
    },
    handleCreateSpec() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createDataSpec() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            trade_id: this.selectedTradeId,
            name: this.dataForm.name,
            trade_size: this.dataForm.trade_size,
            trade_color: this.dataForm.trade_color,
            trade_num: this.dataForm.trade_num,
            remark: this.dataForm.remark
          }
          creditsGoodsSpecAdd(data).then(response => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '创建成功'
            })
            this.getSpecList(this.selectedTradeId)
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
        }
      })
    },
    handleUpdateSpec(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateDataSpec() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = {
            trade_id: this.selectedTradeId,
            id: this.dataForm.id,
            name: this.dataForm.name,
            trade_size: this.dataForm.trade_size,
            trade_color: this.dataForm.trade_color,
            trade_num: this.dataForm.trade_num,
            remark: this.dataForm.remark
          }
          creditsGoodsSpecUpdate(data).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '更新成功'
            })
            this.getSpecList(this.selectedTradeId)
          }).catch(response => {
            this.$notify.error({
              title: '失败',
              message: response.data.message
            })
          })
        }
      })
    },
    handleDeleteSpec(row) {
      const params = {
        id: row.id
      }
      creditsGoodsSpecDelete(params)
        .then(response => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getSpecList(this.selectedTradeId)
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
</script>

<style>
.table-expand {
  font-size: 0;
}
.table-expand label {
  /*width: 100px;*/
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  text-align: center;
}
</style>
