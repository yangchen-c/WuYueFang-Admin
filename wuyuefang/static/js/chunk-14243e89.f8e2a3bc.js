(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14243e89"],{"333d":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},r=[];a("163d");Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function o(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(e,t,a){var n=s(),r=e-n,l=20,u=0;t="undefined"===typeof t?500:t;var c=function e(){u+=l;var s=Math.easeInOutQuad(u,n,r,t);o(s),u<t?i(e):a&&"function"===typeof a&&a()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&l(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},c=u,d=(a("f6b7"),a("9ca4")),m=Object(d["a"])(c,n,r,!1,null,"55e4d716",null);t["a"]=m.exports},"599c":function(e,t,a){"use strict";a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return i})),a.d(t,"a",(function(){return o})),a.d(t,"e",(function(){return s})),a.d(t,"c",(function(){return l}));var n=a("b775");function r(){return Object(n["a"])({url:"region",method:"get"})}function i(e){return Object(n["a"])({url:"region/getRegionByPage",method:"get",params:e})}function o(e){return Object(n["a"])({url:"region",method:"post",data:e})}function s(e){return Object(n["a"])({url:"region",method:"put",data:e})}function l(e){return Object(n["a"])({url:"region",method:"delete",params:e})}},"5d2b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-select",{attrs:{clearable:"",placeholder:"请选择所属区域"},on:{change:e.changeFinanceRegionList},model:{value:e.financeQuery.regionId,callback:function(t){e.$set(e.financeQuery,"regionId",t)},expression:"financeQuery.regionId"}},e._l(e.regionList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"请选择校区"},on:{change:e.changeFinanceSchoolList},model:{value:e.financeQuery.campusId,callback:function(t){e.$set(e.financeQuery,"campusId",t)},expression:"financeQuery.campusId"}},e._l(e.financeSchoolList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),a("el-date-picker",{attrs:{type:"datetimerange",formt:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:e.changeDateRange},model:{value:e.financeQuery.dateRange,callback:function(t){e.$set(e.financeQuery,"dateRange",t)},expression:"financeQuery.dateRange"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFinanceFilter}},[e._v("查找")])],1),e._v(" "),a("div",{staticClass:"finance-sum",staticStyle:{height:"60px","line-height":"60px","background-color":"#d3dce6","margin-bottom":"50px","border-radius":"10px",padding:"0 10px"}},[a("el-row",[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[e._v("总课时： "+e._s(e.financeSum.num_total))])]),e._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple-light"},[e._v("剩余课时： "+e._s(e.financeSum.num_remain))])])],1)],1),e._v(" "),a("div",{staticClass:"filter-container"},[3!=e.userRole&&6!=e.userRole&&7!=e.userRole?a("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"100px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v("添加")]):e._e(),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入校区名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(t)}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}}),e._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handleFilter}},[e._v("查找")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"150px",label:"ID",prop:"id",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.id))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"150px",label:"排序"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.sort))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"校区名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"300px",label:"校区地址"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.address))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"所属区域"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.region.name))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"100px",label:"消课二维码"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{attrs:{src:e.row.campus_xiaoke_qrcode,width:"60"}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"成立时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("parseTime")(t.row.time,"{y}-{m}-{d}")))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"执行校长"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.executive_headmaster?t.row.executive_headmaster.name:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"执行校长联系方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.executive_headmaster?t.row.executive_headmaster.phone:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"校长"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.headmaster?t.row.headmaster.name:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"校长联系方式"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.headmaster?t.row.headmaster.phone:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[3!=e.userRole&&6!=e.userRole&&7!=e.userRole?a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return e.handleUpdate(t.row)}}},[e._v("编辑")]):e._e(),e._v(" "),3!=e.userRole&&6!=e.userRole&&7!=e.userRole?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return e.handleDelete(t.row)}}},[e._v("删除")]):e._e(),e._v(" "),a("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["校区班级管理"],expression:"['校区班级管理']"}],attrs:{type:"success",size:"mini"},on:{click:function(a){return e.handleDetail(t.row)}}},[e._v("班级")])]}}])})],1),e._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total>0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),e._v(" "),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{attrs:{placeholder:"请输入排序"},model:{value:e.dataForm.sort,callback:function(t){e.$set(e.dataForm,"sort",t)},expression:"dataForm.sort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"校区名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入校区名称"},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属区域",prop:"regionId"}},[a("el-select",{attrs:{placeholder:"请选择所属区域"},model:{value:e.dataForm.regionId,callback:function(t){e.$set(e.dataForm,"regionId",t)},expression:"dataForm.regionId"}},e._l(e.regionList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"详细地址",prop:"address"}},[a("el-input",{attrs:{placeholder:"请输入详细地址"},model:{value:e.dataForm.address,callback:function(t){e.$set(e.dataForm,"address",t)},expression:"dataForm.address"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"执行校长",prop:"campus_executive_headmaster_id"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择执行校长"},model:{value:e.dataForm.campus_executive_headmaster_id,callback:function(t){e.$set(e.dataForm,"campus_executive_headmaster_id",t)},expression:"dataForm.campus_executive_headmaster_id"}},e._l(e.realLeaderList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"校长",prop:"campus_headmaster_id"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择校长"},model:{value:e.dataForm.campus_headmaster_id,callback:function(t){e.$set(e.dataForm,"campus_headmaster_id",t)},expression:"dataForm.campus_headmaster_id"}},e._l(e.leaderList,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),a("el-form-item",{attrs:{label:"成立时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"请选择成立日期"},model:{value:e.dataForm.time,callback:function(t){e.$set(e.dataForm,"time",t)},expression:"dataForm.time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{placeholder:"请输入备注"},model:{value:e.dataForm.remark,callback:function(t){e.$set(e.dataForm,"remark",t)},expression:"dataForm.remark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:e.createData}},[e._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:e.updateData}},[e._v("确定")])],1)],1)],1)},r=[],i=(a("c904"),a("cc57"),a("599c")),o=a("caa4"),s=a("333d"),l=a("ed08"),u={name:"School",components:{Pagination:s["a"]},data:function(){return{userRole:this.$store.state.user.roles[0],list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,name:""},dataForm:{id:void 0,sort:void 0,name:void 0,regionId:void 0,address:void 0,time:void 0,campus_headmaster_id:void 0,campus_executive_headmaster_id:void 0,remark:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改校区",create:"添加校区"},rules:{sort:[{required:!0,message:"请输入排序",trigger:"blur"}],name:[{required:!0,message:"请输入区域名称",trigger:"blur"}],regionId:[{required:!0,message:"请选择所属区域",trigger:"blur"}],address:[{required:!0,message:"请输入区域详细地址",trigger:"blur"}],time:[{required:!0,message:"请选择成立时间",trigger:"blur"}]},regionList:[],realLeaderList:[],leaderList:[],financeSum:{total:"",remain:""},financeQuery:{dateRange:[new Date,new Date],campusId:"",regionId:""},financeSchoolList:[]}},created:function(){this.getList(),this.getRegionList(),this.getEmployeeList(6),this.getEmployeeList(7),this.getSchoolCourseSum()},methods:{changeFinanceSchoolList:function(e){this.financeQuery.campusId=e,this.handleFinanceFilter()},changeFinanceRegionList:function(e){this.financeQuery.regionId=e,e&&this.getSchoolList(e)},changeDateRange:function(e){this.financeQuery.dateRange=e,this.handleFinanceFilter()},handleFinanceFilter:function(){this.getSchoolCourseSum()},getSchoolCourseSum:function(){var e=this,t={startString:Object(l["c"])(this.financeQuery.dateRange[0],""),endString:Object(l["c"])(this.financeQuery.dateRange[1]),campus_id:this.financeQuery.campusId?this.financeQuery.campusId:0};Object(o["r"])(t).then((function(t){e.financeSum=t.data.data})).catch((function(){e.financeSum={total:"",remain:""}}))},getSchoolList:function(e){var t=this,a={regionId:e};Object(o["q"])(a).then((function(e){t.financeSchoolList=e.data.data})).catch((function(){t.financeSchoolList=[]}))},getEmployeeList:function(e){var t=this,a={role:e};Object(o["o"])(a).then((function(a){6===e?t.leaderList=a.data.data:7===e&&(t.realLeaderList=a.data.data)})).catch((function(){6===e?t.leaderList=[]:7===e&&(t.realLeaderList=[])}))},getRegionList:function(){var e=this;Object(i["b"])().then((function(t){e.regionList=t.data.data})).catch((function(){e.regionList=[]}))},getList:function(){var e=this;this.listLoading=!0;var t={offset:this.listQuery.page,limit:this.listQuery.limit,name:this.listQuery.name,campus_id:"7"===this.userRole||"6"===this.userRole?this.$store.state.user.campusId[0]:0,regionId:"1"===this.userRole||"3"===this.userRole||"2"===this.userRole?this.$store.state.user.regionId:0};Object(o["t"])(t).then((function(t){e.list=t.data.data.currentList,e.total=t.data.data.totalRecords,e.listLoading=!1})).catch((function(){e.list=[],e.total=0,e.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},resetForm:function(){this.dataForm={id:void 0,sort:void 0,name:void 0,regionId:void 0,address:void 0,time:void 0,campus_headmaster_id:void 0,campus_executive_headmaster_id:void 0,remark:void 0}},handleCreate:function(){var e=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},createData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var a={sort:e.dataForm.sort,name:e.dataForm.name,address:e.dataForm.address,regionId:e.dataForm.regionId,remark:e.dataForm.remark,campus_set_time:e.dataForm.time,campus_headmaster_id:e.dataForm.campus_headmaster_id,campus_executive_headmaster_id:e.dataForm.campus_executive_headmaster_id};Object(o["p"])(a).then((function(t){e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"创建成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message?t.data.message:"创建失败"})}))}}))},handleUpdate:function(e){var t=this;this.dataForm=Object.assign({},e),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this;this.$refs["dataForm"].validate((function(t){if(t){var a={id:e.dataForm.id,sort:e.dataForm.sort,name:e.dataForm.name,address:e.dataForm.address,regionId:e.dataForm.regionId,remark:e.dataForm.remark,campus_set_time:e.dataForm.time.substring(0,10),campus_headmaster_id:e.dataForm.campus_headmaster_id,campus_executive_headmaster_id:e.dataForm.campus_executive_headmaster_id};Object(o["u"])(a).then((function(){e.dialogFormVisible=!1,e.$notify.success({title:"成功",message:"更新成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message?t.data.message:"修改失败"})}))}}))},handleDelete:function(e){var t=this,a={id:e.id};Object(o["s"])(a).then((function(e){t.$notify.success({title:"成功",message:"删除成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"删除失败"})}))},handleDetail:function(e){this.$router.push({path:"/school/classList",query:{id:e.id}})}}},c=u,d=a("9ca4"),m=Object(d["a"])(c,n,r,!1,null,null,null);t["default"]=m.exports},a2cd:function(e,t,a){"use strict";var n=a("238a");e.exports=function(e,t){return!!e&&n((function(){t?e.call(null,(function(){}),1):e.call(null)}))}},a387:function(e,t,a){},c904:function(e,t,a){"use strict";var n=a("e46b"),r=a("5daa"),i=a("008a"),o=a("238a"),s=[].sort,l=[1,2,3];n(n.P+n.F*(o((function(){l.sort(void 0)}))||!o((function(){l.sort(null)}))||!a("a2cd")(s)),"Array",{sort:function(e){return void 0===e?s.call(i(this)):s.call(i(this),r(e))}})},caa4:function(e,t,a){"use strict";a.d(t,"r",(function(){return r})),a.d(t,"q",(function(){return i})),a.d(t,"t",(function(){return o})),a.d(t,"p",(function(){return s})),a.d(t,"u",(function(){return l})),a.d(t,"s",(function(){return u})),a.d(t,"o",(function(){return c})),a.d(t,"f",(function(){return d})),a.d(t,"h",(function(){return m})),a.d(t,"e",(function(){return p})),a.d(t,"n",(function(){return f})),a.d(t,"g",(function(){return h})),a.d(t,"j",(function(){return g})),a.d(t,"l",(function(){return _})),a.d(t,"i",(function(){return v})),a.d(t,"m",(function(){return b})),a.d(t,"k",(function(){return y})),a.d(t,"v",(function(){return F})),a.d(t,"c",(function(){return k})),a.d(t,"a",(function(){return x})),a.d(t,"d",(function(){return w})),a.d(t,"b",(function(){return S}));var n=a("b775");function r(e){return Object(n["a"])({url:"course_scheduling/findCampusTotalAndRemainTimes",method:"get",params:e})}function i(e){return Object(n["a"])({url:"campus/getAll",method:"get",params:e})}function o(e){return Object(n["a"])({url:"campus/getByPage",method:"get",params:e})}function s(e){return Object(n["a"])({url:"campus/createCampus",method:"post",data:e})}function l(e){return Object(n["a"])({url:"campus/updateCampus",method:"put",data:e})}function u(e){return Object(n["a"])({url:"campus/deleteCampus",method:"delete",params:e})}function c(e){return Object(n["a"])({url:"staff/getAll",method:"get",params:e})}function d(e){return Object(n["a"])({url:"class/byCampusId",method:"get",params:e})}function m(e){return Object(n["a"])({url:"class/byPage",method:"get",params:e})}function p(e){return Object(n["a"])({url:"class",method:"post",data:e})}function f(e){return Object(n["a"])({url:"class/updateClass",method:"put",data:e})}function h(e){return Object(n["a"])({url:"class/deleteClass",method:"delete",params:e})}function g(){return Object(n["a"])({url:"classification",method:"get"})}function _(e){return Object(n["a"])({url:"classification/byPage",method:"get",params:e})}function v(e){return Object(n["a"])({url:"classification",method:"post",data:e})}function b(e){return Object(n["a"])({url:"classification",method:"put",data:e})}function y(e){return Object(n["a"])({url:"classification/deleteClassification",method:"delete",params:e})}function F(){return Object(n["a"])({url:"staff/getAllTeacher",method:"get"})}function k(e){return Object(n["a"])({url:"course_scheduling/byPage",method:"get",params:e})}function x(e){return Object(n["a"])({url:"course_scheduling/createCourseScheduling",method:"post",data:e})}function w(e){return Object(n["a"])({url:"course_scheduling/updateCourseScheduling",method:"put",data:e})}function S(e){return Object(n["a"])({url:"course_scheduling",method:"delete",params:e})}},f6b7:function(e,t,a){"use strict";var n=a("a387"),r=a.n(n);r.a}}]);