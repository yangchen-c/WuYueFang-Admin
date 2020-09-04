import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    perms: ['GET /aaa','POST /bbb']     will control the page perms (you can set multiple perms)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/banner',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'banner',
    meta: {
      title: '轮播图管理',
      icon: 'banner'
    },
    children: [
      {
        path: 'bannerIndex',
        component: () => import('@/views/banner/index'),
        name: 'bannerIndex',
        meta: {
          perms: ['首页轮播图'],
          title: '首页轮播图',
          icon: 'list'
        }
      },
      {
        path: 'bannerCredits',
        component: () => import('@/views/banner/credits'),
        name: 'bannerCredits',
        meta: {
          perms: ['商品轮播图'],
          title: '积分商品轮播图',
          icon: 'credits'
        }
      },
      {
        path: 'noticeList',
        component: () => import('@/views/banner/notice'),
        name: 'noticeList',
        meta: {
          perms: ['通知通告'],
          title: '通知通告',
          icon: 'notice'
        }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'user_mgt'
    },
    children: [
      {
        path: 'userList',
        component: () => import('@/views/user/user'),
        name: 'userManage',
        meta: {
          perms: ['用户管理'],
          title: '用户管理',
          icon: 'list'
        }
      },
      {
        path: 'qianList',
        component: () => import('@/views/user/qian'),
        name: 'qianList',
        meta: {
          perms: ['签到管理'],
          title: '签到管理',
          icon: 'qian'
        }
      },
      {
        path: 'creditsSetting',
        component: () => import('@/views/user/creditsSetting'),
        name: 'creditsSetting',
        meta: {
          perms: ['积分设置'],
          title: '积分设置',
          icon: 'credits'
        }
      },
      {
        path: 'commissionSettting',
        component: () => import('@/views/commission/index'),
        name: 'commissionSettting',
        meta: {
          perms: ['佣金管理'],
          title: '佣金管理',
          icon: 'cash'
        }
      },
      {
        path: 'payment/:id(\\d+)',
        component: () => import('@/views/user/payment'),
        name: 'payment',
        meta: { title: '缴费记录', perms: ['学生缴费'], noCache: true, activeMenu: '/user/user' },
        hidden: true
      },
      {
        path: 'class/:id(\\d+)',
        component: () => import('@/views/user/class'),
        name: 'class',
        meta: { title: '分配班级', perms: ['学生分配班级'], noCache: true, activeMenu: '/user/user' },
        hidden: true
      },
      {
        path: 'cashMgmt/:id(\\d+)/:identity',
        component: () => import('@/views/user/cash'),
        name: 'cashMgmt',
        meta: { title: '佣金管理', perms: ['学生佣金管理'], noCache: true, activeMenu: '/user/user' },
        hidden: true
      }
    ]
  },

  {
    path: '/area',
    redirect: 'noredirect',
    alwaysShow: true,
    component: Layout,
    name: 'area',
    meta: {
      title: '区域管理',
      icon: 'area'
    },
    children: [
      {
        path: 'areaList',
        component: () => import('@/views/area/index'),
        name: 'areaManage',
        meta: {
          perms: ['区域管理'],
          title: '区域管理',
          icon: 'area'
        }
      }
    ]
  },

  {
    path: '/school',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'schoolManage',
    meta: {
      title: '校区管理',
      icon: 'school'
    },
    children: [
      {
        path: 'schoolList',
        component: () => import('@/views/school/index'),
        name: 'schoolList',
        meta: {
          perms: ['校区列表'],
          title: '校区列表',
          icon: 'list'
        }
      },
      {
        path: 'classList',
        component: () => import('@/views/class/index'),
        name: 'classList',
        meta: {
          perms: ['校区班级管理'],
          title: '班级管理',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'classType',
        component: () => import('@/views/class/type'),
        name: 'classType',
        meta: {
          perms: ['班级类型'],
          title: '班级类型',
          icon: 'type'
        }
      },
      {
        path: 'assignClass/:id(\\d+)/:name',
        component: () => import('@/views/class/assign'),
        name: 'assignClass',
        meta: {
          perms: ['排课管理'],
          title: '排课管理',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'classStudentList/:id(\\d+)',
        component: () => import('@/views/class/student'),
        name: 'classStudentList',
        meta: {
          perms: ['班级学生列表'],
          title: '学生列表',
          noCache: true
        },
        hidden: true
      }
    ]
  },
  {
    path: '/employee',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'employeeManage',
    meta: {
      title: '员工管理',
      icon: 'employee'
    },
    children: [
      {
        path: 'employeeList',
        component: () => import('@/views/employee/index'),
        name: 'employeeList',
        meta: {
          perms: ['员工列表'],
          title: '员工列表',
          icon: 'list'
        }
      },
      {
        path: 'employeeAdd',
        component: () => import('@/views/employee/add'),
        name: 'employeeAdd',
        meta: {
          perms: ['添加员工'],
          title: '添加员工',
          icon: 'add'
        }
      },
      {
        path: 'teacherClassList/:id(\\d+)',
        component: () => import('@/views/employee/class'),
        name: 'teacherClassList',
        meta: {
          perms: ['教师班级列表'],
          title: '代课班级',
          icon: 'list'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'courseManage',
    meta: {
      title: '课程管理',
      icon: 'course'
    },
    children: [
      {
        path: 'courseList',
        component: () => import('@/views/course/index'),
        name: 'courseList',
        meta: {
          perms: ['课程管理'],
          title: '课程列表',
          icon: 'list'
        }
      },
      {
        path: 'courseDetailList',
        component: () => import('@/views/course/detail'),
        name: 'courseDetailList',
        meta: {
          perms: ['课程章节列表'],
          title: '章节列表',
          noCache: true
        },
        hidden: true
      }
    ]
  },

  {
    path: '/advert',
    redirect: 'noredirect',
    alwaysShow: true,
    component: Layout,
    name: 'advert',
    meta: {
      title: '广告管理',
      icon: 'advert'
    },
    children: [
      {
        path: 'advertList',
        component: () => import('@/views/advert/index'),
        name: 'advertList',
        meta: {
          perms: ['广告管理'],
          title: '广告列表',
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/credits',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'creditsManage',
    meta: {
      title: '积分商城管理',
      icon: 'credits'
    },
    children: [
      {
        path: 'creditsType',
        component: () => import('@/views/credits/type'),
        name: 'creditsType',
        meta: {
          perms: ['积分分类管理'],
          title: '分类管理',
          icon: 'type'
        }
      },
      {
        path: 'creditsGoods',
        component: () => import('@/views/credits/goods'),
        name: 'creditsGoods',
        meta: {
          perms: ['积分商品管理'],
          title: '商品管理',
          icon: 'list'
        }
      },
      {
        path: 'creditsGoodsCreate',
        component: () => import('@/views/credits/goodsCreate'),
        name: 'creditsGoodsCreate',
        meta: {
          perms: ['积分商品添加'],
          title: '添加商品',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'creditsOrder',
        component: () => import('@/views/credits/order'),
        name: 'creditsOrder',
        meta: {
          perms: ['积分订单管理'],
          title: '订单管理',
          icon: 'order'
        }
      }
    ]
  },
  {
    path: '/groupbuy',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'groupbuy',
    meta: {
      title: '拼团管理',
      icon: 'groupbuy'
    },
    children: [
      {
        path: 'groupbuyList',
        component: () => import('@/views/groupBuy/index'),
        name: 'groupbuyList',
        meta: {
          perms: ['拼团商品管理'],
          title: '拼团商品',
          icon: 'list'
        }
      },
      {
        path: 'groupbuyCreate',
        component: () => import('@/views/groupBuy/create'),
        name: 'groupbuyCreate',
        meta: {
          perms: ['拼团商品添加'],
          title: '添加拼团商品',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'groupbuyOrder',
        component: () => import('@/views/groupBuy/order'),
        name: 'groupbuyOrder',
        meta: {
          perms: ['拼团订单管理'],
          // perms: ['POST /admin/goods/create'],
          title: '拼团订单',
          icon: 'order'
        }
      }
    ]
  },
  {
    path: '/secondkill',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'secondkill',
    meta: {
      title: '秒杀管理',
      icon: 'secondkill'
    },
    children: [
      {
        path: 'secondkillList',
        component: () => import('@/views/secondKill/index'),
        name: 'secondkillList',
        meta: {
          perms: ['秒杀商品管理'],
          title: '秒杀商品',
          icon: 'list'
        }
      },
      {
        path: 'secondkillCreate',
        component: () => import('@/views/secondKill/create'),
        name: 'secondkillCreate',
        meta: {
          perms: ['秒杀商品添加'],
          title: '添加秒杀商品',
          noCache: true
        },
        hidden: true
      },
      {
        path: 'secondkillOrder',
        component: () => import('@/views/secondKill/order'),
        name: 'secondkillOrder',
        meta: {
          perms: ['秒杀订单管理'],
          title: '秒杀订单',
          icon: 'order'
        }
      }
    ]
  },

  {
    path: '/homework',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'homework',
    meta: {
      title: '作业管理',
      icon: 'homework'
    },
    children: [
      {
        path: 'homeworkList',
        component: () => import('@/views/homework/index'),
        name: 'homeworkList',
        meta: {
          perms: ['作业管理'],
          title: '作业管理',
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'finance',
    meta: {
      title: '财务管理',
      icon: 'finance'
    },
    children: [
      {
        path: 'financeList',
        component: () => import('@/views/finance/index'),
        name: 'financeList',
        meta: {
          perms: ['财务管理'],
          title: '财务列表',
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/cash',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'cash',
    meta: {
      title: '提现管理',
      icon: 'cash'
    },
    children: [
      {
        path: 'cashList',
        component: () => import('@/views/cash/index'),
        name: 'cashList',
        meta: {
          perms: ['提现管理'],
          title: '提现列表',
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/role',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'role',
    meta: {
      title: '角色管理',
      icon: 'role'
    },
    children: [
      {
        path: 'roleList',
        component: () => import('@/views/role/role'),
        name: 'roleList',
        meta: {
          perms: ['角色管理'],
          title: '角色列表',
          icon: 'list'
        }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    children: [
      {
        path: 'password',
        component: () => import('@/views/profile/password'),
        name: 'password',
        meta: {
          title: '修改密码',
          noCache: true
        }
      }
    ],
    hidden: true
  },

  {
    path: '/share',
    redirect: 'noredirect',
    alwaysShow: true,
    component: Layout,
    name: 'share',
    meta: {
      title: '推广模板管理',
      icon: 'list'
    },
    children: [
      {
        path: 'shareList',
        component: () => import('@/views/share/index'),
        name: 'shareList',
        meta: {
          // perms: ['区域管理'],
          title: '推广模板列表',
          icon: 'list'
        }
      }
    ]
  },

  {
    path: '/investment',
    redirect: 'noredirect',
    alwaysShow: true,
    component: Layout,
    name: 'investment',
    meta: {
      title: '招商专员管理',
      icon: 'list'
    },
    children: [
      {
        path: 'investmentList',
        component: () => import('@/views/investment/index'),
        name: 'investmentManage',
        meta: {
          perms: ['招商专员审核'],
          title: '招商专员审核',
          icon: 'list'
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
