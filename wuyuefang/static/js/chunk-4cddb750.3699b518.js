(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4cddb750"],{"333d":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[n("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},i=[];n("163d");Math.easeInOutQuad=function(t,e,n,a){return t/=a/2,t<1?n/2*t*t+e:(t--,-n/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function u(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,n){var a=u(),i=t-a,s=20,l=0;e="undefined"===typeof e?500:e;var c=function t(){l+=s;var u=Math.easeInOutQuad(l,a,i,e);o(u),l<e?r(t):n&&"function"===typeof n&&n()};c()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&s(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},c=l,d=(n("f6b7"),n("9ca4")),f=Object(d["a"])(c,a,i,!1,null,"55e4d716",null);e["a"]=f.exports},"3ae9":function(t,e,n){},"553d":function(t,e,n){"use strict";var a=n("3ae9"),i=n.n(a);i.a},"599c":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"d",(function(){return r})),n.d(e,"a",(function(){return o})),n.d(e,"e",(function(){return u})),n.d(e,"c",(function(){return s}));var a=n("b775");function i(){return Object(a["a"])({url:"region",method:"get"})}function r(t){return Object(a["a"])({url:"region/getRegionByPage",method:"get",params:t})}function o(t){return Object(a["a"])({url:"region",method:"post",data:t})}function u(t){return Object(a["a"])({url:"region",method:"put",data:t})}function s(t){return Object(a["a"])({url:"region",method:"delete",params:t})}},"5b8c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-container"},[n("div",{staticClass:"filter-container"},[n("el-select",{attrs:{placeholder:"请选择所属区域"},on:{change:t.changeRegionList},model:{value:t.listQuery.regionId,callback:function(e){t.$set(t.listQuery,"regionId",e)},expression:"listQuery.regionId"}},t._l(t.areaList,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),t._v(" "),n("el-select",{attrs:{placeholder:"请选择所属校区"},on:{change:t.changeSchoolList},model:{value:t.listQuery.campusId,callback:function(e){t.$set(t.listQuery,"campusId",e)},expression:"listQuery.campusId"}},t._l(t.schoolList,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),t._v(" "),n("el-select",{attrs:{placeholder:"请选择所属班级"},model:{value:t.listQuery.class_id,callback:function(e){t.$set(t.listQuery,"class_id",e)},expression:"listQuery.class_id"}},t._l(t.classList,(function(t){return n("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1),t._v(" "),n("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[n("el-table-column",{attrs:{align:"center",width:"150px",label:"ID",prop:"id",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",width:"200px",label:"班级"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.class_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",width:"200px",label:"授课老师"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.staff_name))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",width:"200px",label:"作业内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(e.row.release_homework_content))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",width:"200px",label:"发布时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("parseTime")(e.row.time,"{y}-{m}-{d} {h}:{i}")))])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",width:"200px",label:"作业内容"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(n){return t.handleDetail(e.row)}}},[t._v("查看详情")])]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",width:"200px",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),n("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),n("el-dialog",{attrs:{title:"作业详情",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[n("div",{staticStyle:{"text-align":"center"}},[n("h3",[t._v(t._s(t.homeworkInfo.release_homework_title))]),t._v(" "),n("div",{staticClass:"detail-content"},[t._v(t._s(t.homeworkInfo.release_homework_content))]),t._v(" "),t.imgUrlArr.length?n("div",t._l(t.imgUrlArr,(function(t){return n("img",{key:t,attrs:{src:t,width:"500"}})})),0):t._e(),t._v(" "),t.videoUrlArr.length?n("div",t._l(t.videoUrlArr,(function(t){return n("video",{key:t,attrs:{src:t,width:"500"}})})),0):t._e()]),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("关闭")])],1)])],1)},i=[],r=(n("6d57"),n("9a33"),n("599c")),o=n("caa4"),u=n("b775");function s(t){return Object(u["a"])({url:"releaseHomework/byPage",method:"get",params:t})}function l(t){return Object(u["a"])({url:"releaseHomework/getById",method:"get",params:t})}function c(t){return Object(u["a"])({url:"releaseHomework/deleteReleaseHomeword",method:"delete",params:t})}var d=n("333d"),f={name:"HomeworkMgmt",components:{Pagination:d["a"]},data:function(){return{userRole:this.$store.state.user.roles[0],list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,regionId:"",campusId:"",class_id:""},dialogFormVisible:!1,areaList:[],schoolList:[],classList:[],homeworkInfo:{release_homework_title:"",release_homework_content:""},imgUrlArr:[],videoUrlArr:[]}},created:function(){this.getList(),this.getRegionList()},methods:{changeSchoolList:function(t){this.getClassList(t)},getClassList:function(t){var e=this,n={campus_id:t};Object(o["f"])(n).then((function(t){e.classList=t.data.data})).catch((function(){e.classList=[]}))},changeRegionList:function(t){this.getSchoolList(t)},getSchoolList:function(t){var e=this,n={regionId:t};Object(o["q"])(n).then((function(t){e.schoolList=t.data.data})).catch((function(){e.schoolList=[]}))},getRegionList:function(){var t=this;Object(r["b"])().then((function(e){t.areaList=e.data.data})).catch((function(){t.areaList=[]}))},getList:function(){var t=this;this.listLoading=!0;var e={offset:this.listQuery.page,limit:this.listQuery.limit,class_id:this.listQuery.class_id?this.listQuery.class_id:0,staff_id:0,staff_name:"",name:"",campus_id:"6"!==this.userRole&&"7"!==this.userRole&&"8"!==this.userRole||!this.$store.state.user.campusId?"":this.$store.state.user.campusId[0],region_id:"1"===this.userRole||"3"===this.userRole||"2"===this.userRole?this.$store.state.user.regionId:""};s(e).then((function(e){t.list=e.data.data.currentList,t.total=e.data.data.totalRecords,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleDetail:function(t){var e=this;this.imgUrlArr=[],this.videoUrlArr=[],this.dialogFormVisible=!0;var n={id:t.id};l(n).then((function(t){e.homeworkInfo=t.data.data;var n=t.data.data.release_homework_content_url,a=n.split(",");a.forEach((function(t){var n=t.lastIndexOf("."),a=t.substring(n).toLowerCase();".bmp"!==a&&".png"!==a&&".gif"!==a&&".jpg"!==a&&".jpeg"!==a?e.videoUrlArr.push(t):e.imgUrlArr.push(t)}))})).catch((function(){e.homeworkInfo=null}))},handleDelete:function(t){var e=this,n={id:t.id};c(n).then((function(t){e.$notify.success({title:"成功",message:"添加成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message?t.data.message:"删除失败"})}))}}},m=f,p=(n("553d"),n("9ca4")),h=Object(p["a"])(m,a,i,!1,null,"7c0f32b7",null);e["default"]=h.exports},a387:function(t,e,n){},caa4:function(t,e,n){"use strict";n.d(e,"r",(function(){return i})),n.d(e,"q",(function(){return r})),n.d(e,"t",(function(){return o})),n.d(e,"p",(function(){return u})),n.d(e,"u",(function(){return s})),n.d(e,"s",(function(){return l})),n.d(e,"o",(function(){return c})),n.d(e,"f",(function(){return d})),n.d(e,"h",(function(){return f})),n.d(e,"e",(function(){return m})),n.d(e,"n",(function(){return p})),n.d(e,"g",(function(){return h})),n.d(e,"j",(function(){return g})),n.d(e,"l",(function(){return b})),n.d(e,"i",(function(){return _})),n.d(e,"m",(function(){return v})),n.d(e,"k",(function(){return y})),n.d(e,"v",(function(){return w})),n.d(e,"c",(function(){return k})),n.d(e,"a",(function(){return j})),n.d(e,"d",(function(){return O})),n.d(e,"b",(function(){return L}));var a=n("b775");function i(t){return Object(a["a"])({url:"course_scheduling/findCampusTotalAndRemainTimes",method:"get",params:t})}function r(t){return Object(a["a"])({url:"campus/getAll",method:"get",params:t})}function o(t){return Object(a["a"])({url:"campus/getByPage",method:"get",params:t})}function u(t){return Object(a["a"])({url:"campus/createCampus",method:"post",data:t})}function s(t){return Object(a["a"])({url:"campus/updateCampus",method:"put",data:t})}function l(t){return Object(a["a"])({url:"campus/deleteCampus",method:"delete",params:t})}function c(t){return Object(a["a"])({url:"staff/getAll",method:"get",params:t})}function d(t){return Object(a["a"])({url:"class/byCampusId",method:"get",params:t})}function f(t){return Object(a["a"])({url:"class/byPage",method:"get",params:t})}function m(t){return Object(a["a"])({url:"class",method:"post",data:t})}function p(t){return Object(a["a"])({url:"class/updateClass",method:"put",data:t})}function h(t){return Object(a["a"])({url:"class/deleteClass",method:"delete",params:t})}function g(){return Object(a["a"])({url:"classification",method:"get"})}function b(t){return Object(a["a"])({url:"classification/byPage",method:"get",params:t})}function _(t){return Object(a["a"])({url:"classification",method:"post",data:t})}function v(t){return Object(a["a"])({url:"classification",method:"put",data:t})}function y(t){return Object(a["a"])({url:"classification/deleteClassification",method:"delete",params:t})}function w(){return Object(a["a"])({url:"staff/getAllTeacher",method:"get"})}function k(t){return Object(a["a"])({url:"course_scheduling/byPage",method:"get",params:t})}function j(t){return Object(a["a"])({url:"course_scheduling/createCourseScheduling",method:"post",data:t})}function O(t){return Object(a["a"])({url:"course_scheduling/updateCourseScheduling",method:"put",data:t})}function L(t){return Object(a["a"])({url:"course_scheduling",method:"delete",params:t})}},f6b7:function(t,e,n){"use strict";var a=n("a387"),i=n.n(a);i.a}}]);