(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f64ed52"],{"0d1c":function(t,e,a){"use strict";a.d(e,"q",(function(){return r})),a.d(e,"d",(function(){return i})),a.d(e,"f",(function(){return o})),a.d(e,"c",(function(){return u})),a.d(e,"g",(function(){return l})),a.d(e,"e",(function(){return c})),a.d(e,"i",(function(){return s})),a.d(e,"k",(function(){return d})),a.d(e,"b",(function(){return m})),a.d(e,"p",(function(){return f})),a.d(e,"h",(function(){return p})),a.d(e,"n",(function(){return g})),a.d(e,"l",(function(){return h})),a.d(e,"o",(function(){return b})),a.d(e,"m",(function(){return v})),a.d(e,"j",(function(){return y})),a.d(e,"a",(function(){return _}));var n=a("b775"),r="http://api.wuyuefang.top/upload";function i(t){return Object(n["a"])({url:"category",method:"get",params:t})}function o(t){return Object(n["a"])({url:"category/findAll",method:"get",params:t})}function u(t){return Object(n["a"])({url:"category",method:"post",data:t})}function l(t){return Object(n["a"])({url:"category",method:"put",data:t})}function c(t){return Object(n["a"])({url:"category",method:"delete",params:t})}function s(t){return Object(n["a"])({url:"trade/getById",method:"get",params:t})}function d(t){return Object(n["a"])({url:"trade/findLike",method:"get",params:t})}function m(t){return Object(n["a"])({url:"trade/add",method:"post",data:t})}function f(t){return Object(n["a"])({url:"trade",method:"put",data:t})}function p(t){return Object(n["a"])({url:"trade",method:"delete",params:t})}function g(t){return Object(n["a"])({url:"commodityStocks/getStockTwo",method:"get",params:t})}function h(t){return Object(n["a"])({url:"commodityStocks",method:"post",data:t})}function b(t){return Object(n["a"])({url:"commodityStocks",method:"put",data:t})}function v(t){return Object(n["a"])({url:"commodityStocks",method:"delete",params:t})}function y(t){return Object(n["a"])({url:"ptOrder/findByPage",method:"get",params:t})}function _(t){return Object(n["a"])({url:"ptOrder/getTrade/"+t.id,method:"put"})}},"333d":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},r=[];a("163d");Math.easeInOutQuad=function(t,e,a,n){return t/=n/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var i=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function u(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,a){var n=u(),r=t-n,l=20,c=0;e="undefined"===typeof e?500:e;var s=function t(){c+=l;var u=Math.easeInOutQuad(c,n,r,e);o(u),c<e?i(t):a&&"function"===typeof a&&a()};s()}var c={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},s=c,d=(a("f6b7"),a("9ca4")),m=Object(d["a"])(s,n,r,!1,null,"55e4d716",null);e["a"]=m.exports},a387:function(t,e,a){},f6b7:function(t,e,a){"use strict";var n=a("a387"),r=a.n(n);r.a},f6bf:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"150px",label:"ID",prop:"id",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"分类名称"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"300px",label:"排序"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.category_sort))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"300px",label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.remark))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(n)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(e){return t.handleDelete(n)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"分类名称",prop:"name"}},[a("el-input",{model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"排序",prop:"category_sort"}},[a("el-input",{model:{value:t.dataForm.category_sort,callback:function(e){t.$set(t.dataForm,"category_sort",e)},expression:"dataForm.category_sort"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{model:{value:t.dataForm.remark,callback:function(e){t.$set(t.dataForm,"remark",e)},expression:"dataForm.remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},r=[],i=(a("cc57"),a("0d1c")),o=a("333d"),u={name:"Category",components:{Pagination:o["a"]},data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20},dataForm:{id:void 0,name:void 0,category_sort:void 0,remark:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改分类",create:"添加分类"},rules:{name:[{required:!0,message:"请输入分类名称",trigger:"blur"}],category_sort:[{required:!0,message:"请输入分类排序",trigger:"blur"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0;var e={offset:this.listQuery.page,limit:this.listQuery.limit};Object(i["f"])(e).then((function(e){t.list=e.data.data.currentList,t.total=e.data.data.totalRecords,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},resetForm:function(){this.dataForm={id:void 0,name:void 0,category_sort:void 0,remark:void 0}},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a={name:t.dataForm.name,category_sort:t.dataForm.category_sort,remark:t.dataForm.remark};Object(i["c"])(a).then((function(e){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"创建成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message})}))}}))},handleUpdate:function(t){var e=this;this.dataForm=Object.assign({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a=Object.assign({},t.dataForm);Object(i["g"])(a).then((function(){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message})}))}}))},handleDelete:function(t){var e=this,a={id:t.id};Object(i["e"])(a).then((function(t){e.$notify.success({title:"成功",message:"删除成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message})}))}}},l=u,c=a("9ca4"),s=Object(c["a"])(l,n,r,!1,null,null,null);e["default"]=s.exports}}]);