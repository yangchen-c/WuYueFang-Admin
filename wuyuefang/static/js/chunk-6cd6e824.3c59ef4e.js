(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6cd6e824"],{"0d1c":function(t,e,r){"use strict";r.d(e,"q",(function(){return n})),r.d(e,"d",(function(){return i})),r.d(e,"f",(function(){return u})),r.d(e,"c",(function(){return o})),r.d(e,"g",(function(){return c})),r.d(e,"e",(function(){return l})),r.d(e,"i",(function(){return s})),r.d(e,"k",(function(){return d})),r.d(e,"b",(function(){return m})),r.d(e,"p",(function(){return f})),r.d(e,"h",(function(){return p})),r.d(e,"n",(function(){return g})),r.d(e,"l",(function(){return h})),r.d(e,"o",(function(){return b})),r.d(e,"m",(function(){return _})),r.d(e,"j",(function(){return v})),r.d(e,"a",(function(){return y}));var a=r("b775"),n="http://api.wuyuefang.top/upload";function i(t){return Object(a["a"])({url:"category",method:"get",params:t})}function u(t){return Object(a["a"])({url:"category/findAll",method:"get",params:t})}function o(t){return Object(a["a"])({url:"category",method:"post",data:t})}function c(t){return Object(a["a"])({url:"category",method:"put",data:t})}function l(t){return Object(a["a"])({url:"category",method:"delete",params:t})}function s(t){return Object(a["a"])({url:"trade/getById",method:"get",params:t})}function d(t){return Object(a["a"])({url:"trade/findLike",method:"get",params:t})}function m(t){return Object(a["a"])({url:"trade/add",method:"post",data:t})}function f(t){return Object(a["a"])({url:"trade",method:"put",data:t})}function p(t){return Object(a["a"])({url:"trade",method:"delete",params:t})}function g(t){return Object(a["a"])({url:"commodityStocks/getStockTwo",method:"get",params:t})}function h(t){return Object(a["a"])({url:"commodityStocks",method:"post",data:t})}function b(t){return Object(a["a"])({url:"commodityStocks",method:"put",data:t})}function _(t){return Object(a["a"])({url:"commodityStocks",method:"delete",params:t})}function v(t){return Object(a["a"])({url:"ptOrder/findByPage",method:"get",params:t})}function y(t){return Object(a["a"])({url:"ptOrder/getTrade/"+t.id,method:"put"})}},1:function(t,e){},10:function(t,e){},2:function(t,e){},3:function(t,e){},"333d":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[r("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},n=[];r("163d");Math.easeInOutQuad=function(t,e,r,a){return t/=a/2,t<1?r/2*t*t+e:(t--,-r/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function u(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function c(t,e,r){var a=o(),n=t-a,c=20,l=0;e="undefined"===typeof e?500:e;var s=function t(){l+=c;var o=Math.easeInOutQuad(l,a,n,e);u(o),l<e?i(t):r&&"function"===typeof r&&r()};s()}var l={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&c(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&c(0,800)}}},s=l,d=(r("f6b7"),r("9ca4")),m=Object(d["a"])(s,a,n,!1,null,"55e4d716",null);e["a"]=m.exports},4:function(t,e){},5:function(t,e){},6:function(t,e){},6833:function(t,e,r){},7:function(t,e){},8:function(t,e){},9:function(t,e){},a387:function(t,e,r){},ac9b:function(t,e,r){"use strict";(function(t){r("cc57");var a=r("cabd"),n=r("caa4"),i=r("0d1c"),u=r("333d"),o=r("5f87"),c=r("3c7d");e["a"]={name:"CourseMgmt",components:{Pagination:u["a"]},filters:{statusFilter:function(t){var e={1:"success",2:"danger"};return e[t]},statusTxtFilter:function(t){var e={1:"上架",2:"下架"};return e[t]}},data:function(){return{userRole:this.$store.state.user.roles[0],uploadPath:i["q"],list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,name:""},dataForm:{id:void 0,name:void 0,curriculum_context:void 0,picUrl:void 0,curriculum_sales:void 0,curriculum_price:void 0,classification_id:void 0,remark:void 0,curriculum_splendid:!1},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改课程",create:"添加课程"},rules:{name:[{required:!0,message:"请输入课程名称",trigger:"blur"}],picUrl:[{required:!0,message:"请上传课程封面图",trigger:"blur"}],curriculum_sales:[{required:!0,message:"请输入课程已售数量",trigger:"blur"}],curriculum_price:[{required:!0,message:"请输入课程售价",trigger:"blur"}],classification_id:[{required:!0,message:"请选择班级类型",trigger:"blur"}],curriculum_splendid:[{required:!0,message:"请选择班级类型",trigger:"blur"}]},classTypeList:[]}},computed:{headers:function(){return{token:Object(o["a"])()}}},created:function(){this.getClassTypeList(),this.getList()},methods:{getClassTypeList:function(){var t=this;Object(n["j"])().then((function(e){t.classTypeList=e.data.data})).catch((function(){t.classTypeList=[]}))},getList:function(){var t=this;this.listLoading=!0;var e={offset:this.listQuery.page,limit:this.listQuery.limit,name:this.listQuery.name,campusId:"6"!==this.userRole&&"7"!==this.userRole&&"8"!==this.userRole||!this.$store.state.user.campusId.length?0:this.$store.state.user.campusId[0],regionId:"1"===this.userRole||"3"===this.userRole||"2"===this.userRole?this.$store.state.user.regionId:0};Object(a["h"])(e).then((function(e){t.list=e.data.data.currentList,t.total=e.data.data.totalRecords,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},resetForm:function(){this.dataForm={id:void 0,name:void 0,curriculum_context:void 0,picUrl:void 0,curriculum_sales:void 0,curriculum_price:void 0,classification_id:void 0,remark:void 0,curriculum_splendid:!1}},handleSelectionChange:function(t){this.multipleSelection=t},beforePicUrlUpload:function(e){var r=this,a=this,n={endpoint:"http://bj.bcebos.com",credentials:{ak:"d4f7997db9c74baf96a42483bdfcd558",sk:"33e1fa5a8e6b4c11a0638cad34e85980"}},i="wuyuefang",u=new FileReader;return u.readAsArrayBuffer(e),u.onload=function(u){var o=new t(u.target.result),l=new c["BosClient"](n);l.putObject(i,e.name,o).then((function(t){a.dataForm.picUrl=n.endpoint+"/"+i+"/"+e.name})).catch((function(t){r.$notify.error({title:"失败",message:"封面图上传失败"})}))},!1},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var r={name:t.dataForm.name,curriculum_context:t.dataForm.curriculum_context,curriculum_photo:t.dataForm.picUrl,curriculum_sales:t.dataForm.curriculum_sales,curriculum_price:t.dataForm.curriculum_price,classification_id:t.dataForm.classification_id,remark:t.dataForm.remark,campus_id:t.$store.state.user.campusId.length?t.$store.state.user.campusId[0]:1,region_id:t.$store.state.user.regionId?t.$store.state.user.regionId:1,curriculum_splendid:t.dataForm.curriculum_splendid};Object(a["e"])(r).then((function(e){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"创建成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"创建失败"})}))}}))},handleUpdate:function(t){var e=this;this.dataForm=Object.assign({},t),this.dataForm.picUrl=this.dataForm.curriculum_photo,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var r={id:t.dataForm.id,name:t.dataForm.name,curriculum_context:t.dataForm.curriculum_context,curriculum_photo:t.dataForm.picUrl,curriculum_sales:t.dataForm.curriculum_sales,curriculum_price:t.dataForm.curriculum_price,classification_id:t.dataForm.classification_id,remark:t.dataForm.remark,campus_id:t.$store.state.user.campusId.length?t.$store.state.user.campusId[0]:1,region_id:t.$store.state.user.regionId?t.$store.state.user.regionId:1,curriculum_splendid:t.dataForm.curriculum_splendid};Object(a["i"])(r).then((function(){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"修改失败"})}))}}))},handleDelete:function(t){var e=this,r={id:t.id};Object(a["g"])(r).then((function(t){e.$notify.success({title:"成功",message:"删除成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message?t.data.message:"删除失败"})}))},handleDetail:function(t){this.$router.push({path:"/course/courseDetailList",query:{id:t.id}})}}}}).call(this,r("fd40").Buffer)},bff8:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"app-container"},[r("div",{staticClass:"filter-container"},[r("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"100px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),r("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入课程名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),r("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),r("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),r("el-table-column",{attrs:{align:"center",width:"150px",label:"ID",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.id))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"所属班级类型"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.classification.name))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"课程名称"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.name))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"课程简介"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.curriculum_context))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"章节数量"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.details_num))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"课程封面图"},scopedSlots:t._u([{key:"default",fn:function(t){var e=t.row;return[r("img",{attrs:{src:e.curriculum_photo,width:"60"}})]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"课程售价"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.curriculum_price)+"元")])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("el-tag",{attrs:{type:t._f("statusFilter")(a.curriculum_status)}},[t._v(t._s(t._f("statusTxtFilter")(a.curriculum_status)))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"已售出"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.curriculum_sales)+"份")])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"是否展示在首页"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.curriculum_splendid?"是":"否"))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center","min-width":"100px",label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("span",[t._v(t._s(a.remark))])]}}])}),t._v(" "),r("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.row;return[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(a)}}},[t._v("编辑")]),t._v(" "),r("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.handleDelete(a)}}},[t._v("删除")]),t._v(" "),r("el-button",{directives:[{name:"permission",rawName:"v-permission",value:["课程章节列表"],expression:"['课程章节列表']"}],attrs:{type:"success",size:"mini"},on:{click:function(e){return t.handleDetail(a)}}},[t._v("章节")])]}}])})],1),t._v(" "),r("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),r("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[r("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"150px"}},[r("el-form-item",{attrs:{label:"名称",prop:"name"}},[r("el-input",{attrs:{placeholder:"请输入课程名称"},model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"简介",prop:"curriculum_context"}},[r("el-input",{attrs:{placeholder:"请输入课程简介"},model:{value:t.dataForm.curriculum_context,callback:function(e){t.$set(t.dataForm,"curriculum_context",e)},expression:"dataForm.curriculum_context"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"封面图",prop:"picUrl"}},[r("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadPath,"show-file-list":!1,headers:t.headers,"before-upload":t.beforePicUrlUpload,accept:".jpg,.jpeg,.png,.gif"}},[t.dataForm.picUrl?r("img",{staticClass:"avatar",attrs:{src:t.dataForm.picUrl}}):r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),r("el-form-item",{attrs:{label:"已售数量",prop:"curriculum_sales"}},[r("el-input",{attrs:{placeholder:"请输入课程已售数量"},model:{value:t.dataForm.curriculum_sales,callback:function(e){t.$set(t.dataForm,"curriculum_sales",e)},expression:"dataForm.curriculum_sales"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"售价",prop:"curriculum_price"}},[r("el-input",{attrs:{placeholder:"请输入课程售价"},model:{value:t.dataForm.curriculum_price,callback:function(e){t.$set(t.dataForm,"curriculum_price",e)},expression:"dataForm.curriculum_price"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"班级类型",prop:"classification_id"}},[r("el-select",{attrs:{placeholder:"请选择班级类型"},model:{value:t.dataForm.classification_id,callback:function(e){t.$set(t.dataForm,"classification_id",e)},expression:"dataForm.classification_id"}},t._l(t.classTypeList,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"备注",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",placeholder:"请输入备注"},model:{value:t.dataForm.remark,callback:function(e){t.$set(t.dataForm,"remark",e)},expression:"dataForm.remark"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"是否展示在首页",prop:"curriculum_splendid"}},[r("el-radio-group",{model:{value:t.dataForm.curriculum_splendid,callback:function(e){t.$set(t.dataForm,"curriculum_splendid",e)},expression:"dataForm.curriculum_splendid"}},[r("el-radio",{attrs:{label:!1,value:!1}},[t._v("不显示")]),t._v(" "),r("el-radio",{attrs:{label:!0,value:!0}},[t._v("显示")])],1)],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?r("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):r("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},n=[],i=r("ac9b"),u=i["a"],o=(r("e03b"),r("9ca4")),c=Object(o["a"])(u,a,n,!1,null,null,null);e["default"]=c.exports},caa4:function(t,e,r){"use strict";r.d(e,"r",(function(){return n})),r.d(e,"q",(function(){return i})),r.d(e,"t",(function(){return u})),r.d(e,"p",(function(){return o})),r.d(e,"u",(function(){return c})),r.d(e,"s",(function(){return l})),r.d(e,"o",(function(){return s})),r.d(e,"f",(function(){return d})),r.d(e,"h",(function(){return m})),r.d(e,"e",(function(){return f})),r.d(e,"n",(function(){return p})),r.d(e,"g",(function(){return g})),r.d(e,"j",(function(){return h})),r.d(e,"l",(function(){return b})),r.d(e,"i",(function(){return _})),r.d(e,"m",(function(){return v})),r.d(e,"k",(function(){return y})),r.d(e,"v",(function(){return F})),r.d(e,"c",(function(){return k})),r.d(e,"a",(function(){return j})),r.d(e,"d",(function(){return O})),r.d(e,"b",(function(){return w}));var a=r("b775");function n(t){return Object(a["a"])({url:"course_scheduling/findCampusTotalAndRemainTimes",method:"get",params:t})}function i(t){return Object(a["a"])({url:"campus/getAll",method:"get",params:t})}function u(t){return Object(a["a"])({url:"campus/getByPage",method:"get",params:t})}function o(t){return Object(a["a"])({url:"campus/createCampus",method:"post",data:t})}function c(t){return Object(a["a"])({url:"campus/updateCampus",method:"put",data:t})}function l(t){return Object(a["a"])({url:"campus/deleteCampus",method:"delete",params:t})}function s(t){return Object(a["a"])({url:"staff/getAll",method:"get",params:t})}function d(t){return Object(a["a"])({url:"class/byCampusId",method:"get",params:t})}function m(t){return Object(a["a"])({url:"class/byPage",method:"get",params:t})}function f(t){return Object(a["a"])({url:"class",method:"post",data:t})}function p(t){return Object(a["a"])({url:"class/updateClass",method:"put",data:t})}function g(t){return Object(a["a"])({url:"class/deleteClass",method:"delete",params:t})}function h(){return Object(a["a"])({url:"classification",method:"get"})}function b(t){return Object(a["a"])({url:"classification/byPage",method:"get",params:t})}function _(t){return Object(a["a"])({url:"classification",method:"post",data:t})}function v(t){return Object(a["a"])({url:"classification",method:"put",data:t})}function y(t){return Object(a["a"])({url:"classification/deleteClassification",method:"delete",params:t})}function F(){return Object(a["a"])({url:"staff/getAllTeacher",method:"get"})}function k(t){return Object(a["a"])({url:"course_scheduling/byPage",method:"get",params:t})}function j(t){return Object(a["a"])({url:"course_scheduling/createCourseScheduling",method:"post",data:t})}function O(t){return Object(a["a"])({url:"course_scheduling/updateCourseScheduling",method:"put",data:t})}function w(t){return Object(a["a"])({url:"course_scheduling",method:"delete",params:t})}},cabd:function(t,e,r){"use strict";r.d(e,"f",(function(){return n})),r.d(e,"h",(function(){return i})),r.d(e,"e",(function(){return u})),r.d(e,"i",(function(){return o})),r.d(e,"g",(function(){return c})),r.d(e,"c",(function(){return l})),r.d(e,"a",(function(){return s})),r.d(e,"d",(function(){return d})),r.d(e,"b",(function(){return m}));var a=r("b775");function n(t){return Object(a["a"])({url:"curriculum/get_all_curriculum",method:"get",params:t})}function i(t){return Object(a["a"])({url:"curriculum/getByPage",method:"get",params:t})}function u(t){return Object(a["a"])({url:"curriculum",method:"post",data:t})}function o(t){return Object(a["a"])({url:"curriculum",method:"put",data:t})}function c(t){return Object(a["a"])({url:"curriculum",method:"delete",params:t})}function l(t){return Object(a["a"])({url:"details/getByPage",method:"get",params:t})}function s(t){return Object(a["a"])({url:"details",method:"post",data:t})}function d(t){return Object(a["a"])({url:"details",method:"put",data:t})}function m(t){return Object(a["a"])({url:"details",method:"delete",params:t})}},e03b:function(t,e,r){"use strict";var a=r("6833"),n=r.n(a);n.a},f6b7:function(t,e,r){"use strict";var a=r("a387"),n=r.n(a);n.a}}]);