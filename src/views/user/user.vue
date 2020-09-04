<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.name" clearable class="filter-item" style="width: 200px;" placeholder="请输入真实名称" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.nickname" clearable class="filter-item" style="width: 200px;" placeholder="请输入昵称" @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.phone" clearable class="filter-item" style="width: 200px; margin-right: 100px;" placeholder="请输入手机号" @keyup.enter.native="handleFilter" />
      <el-select v-if="userRole === '0'" v-model="listQuery.regionId" clearable placeholder="请选择所属区域" @change="changeSearchRegionList">
        <el-option
          v-for="item in areaList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select v-if="userRole === '0' || userRole === '1' || userRole === '2' || userRole === '3'" v-model="listQuery.campusId" clearable placeholder="请选择所属校区" @change="changeSingleSchoolList">
        <el-option
          v-for="item in singleSchoolList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">查找</el-button>
      <!-- <el-button v-if="tab == 'student'" class="filter-item" type="primary" icon="el-icon-download" @click="handleBatchExport">批量导出</el-button> -->
    </div>

    <el-tabs v-model="tab" @tab-click="handleClick">
      <el-tab-pane label="未注册" name="no-register" />
      <el-tab-pane label="未分配" name="no-assign" />
      <el-tab-pane label="学员" name="student" />
      <el-tab-pane label="停课" name="stop" />
      <el-tab-pane label="退学" name="leave" />
    </el-tabs>

    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />

      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-register' || tab == 'no-assign'" align="center" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.student_avatar" width="60">
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-register' || tab == 'no-assign'" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.student_nick_name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'student' || tab == 'no-assign'" align="center" label="名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'student' || tab == 'no-assign'" align="center" label="家长姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.patriarchName }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'student' || tab == 'no-assign'" align="center" label="联系电话">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-register'" align="center" label="进入时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-assign'" align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-assign'" align="center" label="意向校区">
        <template slot-scope="scope">
          <span>{{ scope.row.campusString }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-assign'" align="center" label="积分">
        <template slot-scope="scope">
          <span>{{ scope.row.integral }}分</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-assign'" align="center" label="邀约状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.appointment_status | statusFilter">{{ scope.row.appointment_status | statusTxtFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-assign' && userRole !== '0'" align="center" label="所属课程顾问">
        <template slot-scope="scope">
          <span>{{ scope.row.courseConultant ? scope.row.courseConultant.name : '未分配' }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tab == 'no-assign'" align="center" label="操作" min-width="120" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdateNoAssign(scope.row)">修改</el-button>
          <el-button type="primary" size="mini" @click="handleAssign(scope.row)">分配</el-button>
          <el-button type="primary" size="mini" @click="handleInvite(scope.row)">邀约</el-button>
        </template>
      </el-table-column>
      <div v-if="tab == 'student' || tab === 'stop' || tab === 'leave'">
        <el-table-column align="center" label="学员生日">
          <template slot-scope="scope">
            <span>{{ scope.row.birthday }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="学员年龄">
          <template slot-scope="scope">
            <span>{{ scope.row.age ? scope.row.age : getAge(scope.row.birthday) }}岁</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="家庭住址">
          <template slot-scope="scope">
            <span>{{ scope.row.site }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="总学费">
          <template slot-scope="scope">
            <span>{{ scope.row.money_total }}元</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="当前学费">
          <template slot-scope="scope">
            <span>{{ scope.row.money_present }}元</span>
          </template>
        </el-table-column>money_present
        <el-table-column align="center" label="总课时">
          <template slot-scope="scope">
            <span>{{ scope.row.class_times_total }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="剩余课时">
          <template slot-scope="scope">
            <span>{{ scope.row.class_times_remain }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="所属校区">
          <template slot-scope="scope">
            <span>{{ scope.row.campusString }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入学时间">
          <template slot-scope="scope">
            <span>{{ scope.row.entranceTime }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="所属班级">
          <template slot-scope="scope">
            <span>{{ scope.row.classId }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state | statusFilter">{{ scope.row.state | statusTxtFilter }}</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="操作" min-width="300" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="primary" size="mini" style="margin-left: 0; padding: 7px 0;" @click="handleCredits(scope.row)">积分记录</el-button>
            <el-button type="primary" size="mini" style="margin-left: 0; padding: 7px 0;" @click="handleXiaoke(scope.row)">消课记录</el-button>
            <el-button type="primary" size="mini" style="margin-left: 0; padding: 7px 0;" @click="handleZuoye(scope.row)">作业情况</el-button>
            <router-link v-permission="['学生分配班级']" :to="'/user/class/' + scope.row.id">
              <el-button type="success" size="mini" style="padding: 7px 0;">
                分配班级
              </el-button>
            </router-link>
            <router-link v-permission="['学生缴费']" :to="'/user/payment/' + scope.row.id">
              <el-button type="success" size="mini">
                学费
              </el-button>
            </router-link>
            <router-link v-permission="['学生佣金管理']" :to="'/user/cashMgmt/' + scope.row.id + '/student'">
              <el-button type="success" size="mini" style="padding: 7px 0;">
                佣金管理
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </div>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="100" />
    </el-tooltip>

    <!-- 分配、邀约、修改学员信息 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="dataForm" status-icon label-position="left" label-width="100px" style="margin-left: 100px;">
        <!-- 分配 -->
        <el-form-item v-if="dialogStatus === 'assign' && userRole === '0'" label="分配校区" prop="campusId">
          <el-select v-model="dataForm.regionId" placeholder="请选择所属区域" @change="changeRegionList">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select v-model="dataForm.campusId" placeholder="请选择所属校区">
            <el-option
              v-for="item in schoolList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <!-- <el-button type="primary" plain style="margin-left: 30px;" @click="handleAddSchools()">添加</el-button>
          <el-table
            :data="selectedSchoolList"
            style="width: 70%; margin-top: 20px"
            border
          >
            <el-table-column label="校区名称" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="60">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleDeleteSchools(scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table> -->
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'assign' && userRole !== '0'" label="课程顾问" prop="course_consultant">
          <el-select v-model="dataForm.course_consultant" placeholder="请选择课程顾问">
            <el-option
              v-for="item in courseConsultantList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>

        <!-- 邀约 -->
        <el-form-item v-if="dialogStatus === 'invite'" label="邀约状态" prop="appointment_status">
          <el-select v-model="dataForm.appointment_status" placeholder="请选择邀约状态">
            <el-option
              v-for="item in inviteList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'invite'" label="用户状态" prop="appointment_status">
          <el-select v-model="dataForm.role" placeholder="请选择用户状态">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="dialogStatus === 'assign' || dialogStatus === 'invite'" label="备注" prop="remark">
          <el-input v-model="dataForm.remark" placeholder="请输入备注信息" />
        </el-form-item>
        <!-- 修改非正式 -->
        <div v-if="dialogStatus === 'updateNoAssign'">
          <el-form-item label="所属区域" prop="regionId">
            <el-select v-model="dataForm.regionId" placeholder="请选择所属区域" @change="changeRegionList">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属校区" prop="campusId">
            <el-select v-model="dataForm.campusId" placeholder="请选择所属校区" @change="changeSchoolList">
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </div>
        <!-- 修改正式学员 -->
        <div v-if="dialogStatus === 'update'">
          <el-form-item label="学员名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="请输入学员名称" />
          </el-form-item>
          <el-form-item label="联系方式" prop="phone">
            <el-input v-model="dataForm.phone" placeholder="请输入联系方式" />
          </el-form-item>
          <el-form-item label="家长姓名" prop="patriarchName">
            <el-input v-model="dataForm.patriarchName" placeholder="请输入家长姓名" />
          </el-form-item>
          <el-form-item label="学员生日" prop="birthday">
            <el-date-picker
              v-model="dataForm.birthday"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              @change="getAge"
            />
          </el-form-item>
          <el-form-item label="学员年龄" prop="age">
            <el-input v-model="dataForm.age" placeholder="请输入学员年龄" />
          </el-form-item>
          <el-form-item label="家庭住址" prop="site">
            <el-input v-model="dataForm.site" placeholder="请输入家庭住址" />
          </el-form-item>
          <el-form-item label="入学时间" prop="entranceTimeString">
            <el-date-picker
              v-model="dataForm.entranceTimeString"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item label="所属区域" prop="regionId">
            <el-select v-model="dataForm.regionId" placeholder="请选择所属区域" @change="changeRegionList">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="所属校区" prop="campusId">
            <el-select v-model="dataForm.campusId" placeholder="请选择所属校区" @change="changeSchoolList">
              <el-option
                v-for="item in schoolList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="所属班级" prop="classId">
            <el-select v-model="dataForm.classId" placeholder="请选择所属班级">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item label="总学费" prop="money_total">
            <el-input v-model="dataForm.money_total" :disabled="true" placeholder="请输入总学费" />
          </el-form-item>
          <el-form-item label="当前学费" prop="money_present">
            <el-input v-model="dataForm.money_present" placeholder="请输入当前学费" />
          </el-form-item>
          <el-form-item label="课时" prop="class_times_remain">
            <el-input v-model="dataForm.class_times_remain" :disabled="true" placeholder="请输入课时" />
          </el-form-item>
          <el-form-item label="学员状态" prop="role">
            <el-select v-model="dataForm.role" placeholder="请选择学生状态">
              <el-option
                v-for="item in userStatusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dataForm.remark" placeholder="请输入备注信息" />
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!-- 消课记录、作业情况对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="detailDialogFormVisible">
      <div v-if="dialogStatus === 'xiaoke'" class="filter-container">
        <el-select v-model="detailListQuery.class_id" placeholder="请选择班级" @change="changeStudentClassList">
          <el-option
            v-for="item in studentClassList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleDetailFilter">查找</el-button>
      </div>
      <el-table v-loading="detailListLoading" :data="detailList" element-loading-text="正在查询中。。。" border fit highlight-current-row style="width: 100%;">
        <div v-if="dialogStatus === 'xiaoke'">
          <el-table-column align="center" label="消课人员">
            <template slot-scope="scope">
              <span>{{ scope.row.student.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="消课时间">
            <template slot-scope="scope">
              <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="课时">
            <template slot-scope="scope">
              <span>{{ scope.row.courseScheduling.starttime }} — {{ scope.row.courseScheduling.endtime }}</span>
            </template>
          </el-table-column>
        </div>
        <div v-if="dialogStatus === 'zuoye'">
          <el-table-column align="center" label="完成情况">
            <template slot-scope="scope">
              <el-tag :type="scope.row.release_homework_to_student_status | homeworkStatusFilter">{{ scope.row.release_homework_to_student_status | homeworkTxtStatusFilter }}</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="作业题目">
            <template slot-scope="scope">
              <span>{{ scope.row.releaseHomework.release_homework_title }}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="作业内容">
            <template slot-scope="scope">
              <span>{{ scope.row.releaseHomework.release_homework_content }}</span>
            </template>
          </el-table-column>
        </div>
        <div v-if="dialogStatus === 'credits'">
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间">
            <template slot-scope="scope">
              <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="积分">
            <template slot-scope="scope">
              <span>{{ scope.row.remark === '收入' ? '+' : '-' }}{{ scope.row.student_integral }}分</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" label="备注">
            <template slot-scope="scope">
              <span>{{ scope.row.remark }}</span>
            </template>
          </el-table-column> -->
        </div>
      </el-table>

      <pagination v-show="detailTotal>0" :total="detailTotal" :page.sync="detailListQuery.page" :limit.sync="detailListQuery.limit" @pagination="getDetailList" />
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailDialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { schoolAllByRegionId, classAllBySchoolId } from '@/api/school'
import { areaAll } from '@/api/area'
import { userNoAssignList, userList, userUpdate, studentHomeworkList, studentCreditsList, studentXiaokeList, studentClassAll } from '@/api/user'
import { employeeList } from '@/api/employee'
import BackToTop from '@/components/BackToTop'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
// import _ from 'lodash'

export default {
  name: 'UserMgmt',
  components: { BackToTop, Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'success',
        2: 'danger',
        0: 'warning'
      }
      return statusMap[status]
    },
    statusTxtFilter(status) {
      const statusMap = {
        1: '邀约成功',
        2: '邀约失败',
        0: '未邀约'
      }
      return statusMap[status]
    },
    homeworkStatusFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'warning',
        2: 'success'
      }
      return statusMap[status]
    },
    homeworkTxtStatusFilter(status) {
      const statusMap = {
        0: '未完成',
        1: '已完成',
        2: '已点评'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      userRole: this.$store.state.user.roles[0], // 0超级管理员 1管理员 2督导 3教务组长 6校长 7执行校长 8课程顾问
      list: [],
      total: 0,
      listLoading: true,
      tab: 'no-register',
      multipleSelection: [],
      listQuery: {
        page: 1,
        limit: 20,
        start: '',
        end: '',
        phone: '',
        name: '',
        nickname: '',
        role: 0, // 0未注册 1未分配 2学员
        class_id: 0,
        appointment_status: 9, // 全部
        campusId: '',
        course_consultant_id: this.$store.state.user.userId,
        regionId: ''
      },
      textMap: {
        assign: '分配',
        invite: '邀约',
        update: '修改',

        xiaoke: '消课记录',
        zuoye: '作业情况',
        // class: '班级信息',
        credits: '积分记录',
        updateNoAssign: '修改'
      },
      dialogStatus: '',
      dialogFormVisible: false, // 分配窗口
      dataForm: {
        regionId: undefined,
        campusId: undefined,
        appointment_status: undefined,
        role: undefined,
        name: undefined,
        phone: undefined,
        classId: undefined,
        money_total: undefined,
        money_present: undefined,
        class_times_remain: undefined,
        site: undefined,
        age: undefined,
        birthday: undefined,
        patriarchName: undefined,
        course_consultant: undefined
        // role: undefined
      },
      rules: {
        name: [{ required: true, message: '请输入学员名称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        regionId: [{ required: true, message: '请选择所属区域', trigger: 'blur' }],
        campusId: [{ required: true, message: '请选择所属校区', trigger: 'blur' }],
        classId: [{ required: true, message: '请选择所属班级', trigger: 'blur' }],
        money_total: [{ required: true, message: '请输入学员总学费', trigger: 'blur' }],
        // money_present: [{ required: true, message: '请输入学员当前学费', trigger: 'blur' }],
        class_times_remain: [{ required: true, message: '请输入学员课时', trigger: 'blur' }],
        appointment_status: [{ required: true, message: '请选择邀约状态', trigger: 'blur' }],
        site: [{ required: true, message: '请输入家庭住址', trigger: 'blur' }],
        age: [{ required: true, message: '请输入学员年龄', trigger: 'blur' }],
        birthday: [{ required: true, message: '请输入学员生日', trigger: 'blur' }],
        patriarchName: [{ required: true, message: '请输入家长姓名', trigger: 'blur' }],
        entranceTimeString: [{ required: true, message: '请输入入学时间', trigger: 'blur' }],
        course_consultant: [{ required: true, message: '请选择课程顾问', trigger: 'blur' }]
      },
      selectedSchoolList: [], // 已选择得班级列表
      areaList: [],
      schoolList: [],
      classList: [],

      inviteList: [
        {
          id: 1,
          name: '邀约成功'
        },
        {
          id: 2,
          name: '邀约失败'
        },
        {
          id: 0,
          name: '未邀约'
        }
      ],
      roleList: [
        {
          id: 1,
          name: '非正式学员'
        },
        {
          id: 2,
          name: '正式学员'
        }
      ],
      detailDialogFormVisible: false, // 消课记录、作业情况弹窗
      detailListLoading: true,
      detailList: [],
      detailTotal: 0,
      detailListQuery: {
        page: 1,
        limit: 20,
        class_id: ''
      },
      studentClassList: [],
      xiaokeRow: null,
      singleSchoolList: [],
      studentBirthday: 0,

      courseConsultantList: [],

      userStatusList: [
        {
          id: 3,
          name: '暂停'
        },
        {
          id: 4,
          name: '退学'
        },
        {
          id: 2,
          name: '学员'
        }
      ]
    }
  },
  created() {
    this.xiaokeRow = null
    this.getList()
    this.getRegionList()
    if (this.userRole !== '0') {
      this.getSingleSchoolList(this.$store.state.user.regionId)
      this.getCourseConsultantList()
    } else {
      const regionId = this.listQuery.regionId ? this.listQuery.regionId : 0
      this.getSingleSchoolList(regionId)
    }
    if (this.dataForm.birthday) {
      this.getAge(this.dataForm.birthday)
    }
  },
  methods: {
    // 获取指定校区下所有课程顾问
    getCourseConsultantList() {
      const params = {
        offset: 1,
        limit: 100,
        name: '',
        phone: '',
        role: 8,
        campusId: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : 0,
        regionId: this.$store.state.user.regionId ? this.$store.state.user.regionId : 0
      }
      employeeList(params)
        .then(response => {
          this.courseConsultantList = response.data.data.currentList
        })
        .catch(() => {
          this.courseConsultantList = []
        })
    },
    // 生日转成年龄
    getAge(e) {
      if (!e) {
        return
      }
      const birthdays = new Date(e.replace(/-/g, '/'))
      const d = new Date()
      const age =
        d.getFullYear() -
        birthdays.getFullYear() -
        (d.getMonth() < birthdays.getMonth() ||
        (d.getMonth() == birthdays.getMonth() &&
        d.getDate() < birthdays.getDate())
          ? 1
          : 0)
      this.dataForm.age = age
      return age
    },
    changeSingleSchoolList(e) {
      this.listQuery.campusId = e
      this.handleFilter()
    },
    // 获取指定区域下所有校区列表
    getSingleSchoolList(regionId) {
      const params = {
        regionId
      }
      schoolAllByRegionId(params).then(res => {
        this.singleSchoolList = res.data.data
        this.listQuery.campusId = this.singleSchoolList[0].id
        this.handleFilter()
      }).catch(() => {
        this.singleSchoolList = []
        this.listQuery.campusId = ''
      })
    },
    changeStudentClassList(e) {
      this.detailListQuery.class_id = e
      this.handleDetailFilter()
    },
    getStudentClassList(row) {
      const params = {
        studentId: row.id
      }
      studentClassAll(params).then(res => {
        this.studentClassList = res.data.data
      }).catch(() => {
        this.studentClassList = []
      })
    },
    changeSearchRegionList(e) {
      if (e) {
        this.getSingleSchoolList(e)
      }
    },
    handleDetailFilter() {
      this.detailListQuery.page = 1
      this.getDetailList(this.xiaokeRow)
    },
    changeSchoolList(e) {
      this.getClassList(e)
    },
    getClassList(campus_id) {
      const params = {
        campus_id
      }
      classAllBySchoolId(params).then(res => {
        this.classList = res.data.data
      }).catch(() => {
        this.classList = []
      })
    },
    changeRegionList(e) {
      this.getSchoolList(e)
    },
    getSchoolList(regionId) {
      const params = {
        regionId
      }
      schoolAllByRegionId(params).then(res => {
        this.schoolList = res.data.data
      }).catch(() => {
        this.schoolList = []
      })
    },
    getRegionList() {
      areaAll().then(res => {
        this.areaList = res.data.data
      }).catch(() => {
        this.areaList = []
      })
    },
    getNoAssignList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        role: this.listQuery.role,
        name: this.listQuery.name,
        phone: this.listQuery.phone,
        class_id: this.listQuery.class_id,
        appointment_status: this.listQuery.appointment_status,
        nickname: this.listQuery.nickname,
        course_consultant: 0,
        campus_id: '',
        region_id: ''
      }
      userNoAssignList(params).then(response => {
        this.list = response.data.data.currentList
        this.total = response.data.data.totalRecords
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    getList() {
      this.listLoading = true
      const params = {
        offset: this.listQuery.page,
        limit: this.listQuery.limit,
        role: this.listQuery.role,
        name: this.listQuery.name,
        phone: this.listQuery.phone,
        class_id: this.listQuery.class_id,
        appointment_status: this.listQuery.appointment_status,
        nickname: this.listQuery.nickname,
        campus_id: this.$store.state.user.campusId.length ? this.$store.state.user.campusId[0] : this.listQuery.campusId,
        // campus_id: (this.userRole === '6' || this.userRole === '7' || this.userRole === '8') && (this.$store.state.user.campusId) ? this.$store.state.user.campusId[0] : '',
        region_id: (this.userRole === '1' || this.userRole === '3' || this.userRole === '2') ? this.$store.state.user.regionId : '',
        course_consultant: this.userRole === '8' ? this.listQuery.course_consultant_id : 0
      }
      userList(params)
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
      if (this.userRole === '0' && this.tab === 'no-assign') {
        this.getNoAssignList()
      } else {
        this.getList()
      }
    },
    handleClick() {
      if (this.tab === 'no-register') {
        this.listQuery.role = 0
      } else if (this.tab === 'no-assign') {
        this.listQuery.role = 1
      } else if (this.tab === 'student') {
        this.listQuery.role = 2
      } else if (this.tab === 'stop') {
        this.listQuery.role = 3
      } else if (this.tab === 'leave') {
        this.listQuery.role = 4
      }
      if (this.userRole === '0' && this.tab === 'no-assign') {
        this.getNoAssignList()
      } else {
        this.getList()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleBatchExport() {

    },
    handleInvite(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'invite'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleAssign(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'assign'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
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
    handleUpdateNoAssign(row) {
      this.dataForm = Object.assign({}, row)
      this.dialogStatus = 'updateNoAssign'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const data = Object.assign({}, this.dataForm)
      // let campusIdStr = ''
      // this.selectedSchoolList.forEach(item => {
      //   campusIdStr += ',' + item.id
      // })
      // data.campusId = campusIdStr
      if (this.dialogStatus === 'assign' || this.dialogStatus === 'updateNoAssign') {
        data.role = 1
      }
      userUpdate(data).then(res => {
        this.dialogFormVisible = false
        this.$notify.success({
          title: '成功',
          message: '修改成功'
        })
        if (this.userRole === '0' && this.tab === 'no-assign') {
          this.getNoAssignList()
        } else {
          this.getList()
        }
      }).catch(() => {
        this.dialogFormVisible = false
        this.$notify.error({
          title: '失败',
          message: '修改失败'
        })
      })
    },
    // handleAddSchools() {
    //   if (!this.dataForm.campusId.length) {
    //     this.$message({
    //       message: '请先选择校区',
    //       type: 'warning'
    //     })
    //     return
    //   }
    //   this.dataForm.campusId.forEach(item => {
    //     this.schoolList.forEach(v => {
    //       if (item === v.id) {
    //         this.selectedSchoolList.push(v)
    //       }
    //     })
    //   })
    //   this.dataForm.regionId = ''
    //   this.dataForm.campusId = ''
    // },
    // handleDeleteSchools(row) {
    //   this.selectedSchoolList = this.selectedSchoolList.filter(item => {
    //     return item.id !== row.id
    //   })
    // }

    // handleClass(row) {
    //   this.dialogStatus = 'class'
    //   this.getDetailList(row)
    // },
    handleCredits(row) {
      this.detailList = []
      this.detailListLoading = true
      this.detailTotal = 0
      this.dialogStatus = 'credits'
      this.xiaokeRow = null
      this.getDetailList(row)
    },
    handleXiaoke(row) {
      this.detailList = []
      this.detailListLoading = true
      this.detailTotal = 0
      this.detailListQuery.class_id = ''
      this.dialogStatus = 'xiaoke'
      this.xiaokeRow = row
      this.getDetailList(this.xiaokeRow)
      this.getStudentClassList(this.xiaokeRow)
    },
    handleZuoye(row) {
      this.detailList = []
      this.detailListLoading = true
      this.detailTotal = 0
      this.dialogStatus = 'zuoye'
      this.xiaokeRow = null
      this.getDetailList(row)
    },
    getDetailList(row) {
      this.detailDialogFormVisible = true
      if (this.dialogStatus === 'xiaoke') {
        const params = {
          offset: this.detailListQuery.page,
          limit: this.detailListQuery.limit,
          student_id: row.id,
          class_id: this.detailListQuery.class_id ? this.detailListQuery.class_id : 0
        }
        studentXiaokeList(params).then(res => {
          this.detailList = res.data.data.currentList
          this.detailTotal = res.data.data.totalRecords
          this.detailListLoading = false
        }).catch(() => {
          this.detailList = []
          this.detailTotal = 0
          this.detailListLoading = false
        })
      } else if (this.dialogStatus === 'zuoye') {
        const params = {
          offset: this.detailListQuery.page,
          limit: this.detailListQuery.limit,
          studentId: row.id,
          releaseHomeworkId: 0,
          status: 9,
          name: '',
          studentName: ''
        }
        studentHomeworkList(params).then(res => {
          this.detailList = res.data.data.currentList
          this.detailTotal = res.data.data.totalRecords
          this.detailListLoading = false
        }).catch(() => {
          this.detailList = []
          this.detailTotal = 0
          this.detailListLoading = false
        })
      } else if (this.dialogStatus === 'credits') {
        const params = {
          offset: this.detailListQuery.page,
          limit: this.detailListQuery.limit,
          student_id: row.id
        }
        studentCreditsList(params).then(res => {
          this.detailList = res.data.data.currentList
          this.detailTotal = res.data.data.totalRecords
          this.detailListLoading = false
        }).catch(() => {
          this.detailList = []
          this.detailTotal = 0
          this.detailListLoading = false
        })
      }
      // else if(this.dialogStatus === 'class') {
      //   params.staffId = 0
      //   params.classId = 0
      //   params.studentName = ''
      //   params.name = ''
      //   classInfoList(params).then(res => {
      //     this.detailList = res.data.data.currentList
      //     this.detailTotal = res.data.data.totalRecords
      //     this.detailListLoading = false
      //   }).catch(() => {
      //     this.detailList = []
      //     this.detailTotal = 0
      //     this.detailListLoading = false
      //   })
      // }
    }
  }
}
</script>

<style>
  .filter-container .filter-item {
    margin-bottom: 0;
  }
</style>
