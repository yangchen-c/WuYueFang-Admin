(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2100411c"],{"333d":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},n=[];a("163d");Math.easeInOutQuad=function(t,e,a,i){return t/=i/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function l(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function s(t,e,a){var i=l(),n=t-i,s=20,u=0;e="undefined"===typeof e?500:e;var c=function t(){u+=s;var l=Math.easeInOutQuad(u,i,n,e);o(l),u<e?r(t):a&&"function"===typeof a&&a()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&s(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&s(0,800)}}},c=u,d=(a("f6b7"),a("9ca4")),m=Object(d["a"])(c,i,n,!1,null,"55e4d716",null);e["a"]=m.exports},"599c":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"d",(function(){return r})),a.d(e,"a",(function(){return o})),a.d(e,"e",(function(){return l})),a.d(e,"c",(function(){return s}));var i=a("b775");function n(){return Object(i["a"])({url:"region",method:"get"})}function r(t){return Object(i["a"])({url:"region/getRegionByPage",method:"get",params:t})}function o(t){return Object(i["a"])({url:"region",method:"post",data:t})}function l(t){return Object(i["a"])({url:"region",method:"put",data:t})}function s(t){return Object(i["a"])({url:"region",method:"delete",params:t})}},"9a95":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"100px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入区域名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"150px",label:"ID",prop:"id",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"150px",label:"排序"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.sort))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"成立时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("parseTime")(e.row.time,"{y}-{m}-{d} {h}:{i}")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"200px",label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.remark))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"100px"}},[a("el-form-item",{attrs:{label:"排序",prop:"sort"}},[a("el-input",{attrs:{placeholder:"请输入排序"},model:{value:t.dataForm.sort,callback:function(e){t.$set(t.dataForm,"sort",e)},expression:"dataForm.sort"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入区域名称"},model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"成立时间",prop:"time"}},[a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"请选择成立日期"},model:{value:t.dataForm.time,callback:function(e){t.$set(t.dataForm,"time",e)},expression:"dataForm.time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{model:{value:t.dataForm.remark,callback:function(e){t.$set(t.dataForm,"remark",e)},expression:"dataForm.remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},n=[],r=(a("c904"),a("cc57"),a("599c")),o=a("333d"),l={name:"Area",components:{Pagination:o["a"]},data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,name:""},dataForm:{id:void 0,sort:void 0,name:void 0,time:void 0,remark:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改区域",create:"添加区域"},rules:{sort:[{required:!0,message:"请输入排序",trigger:"blur"}],name:[{required:!0,message:"请输入区域名称",trigger:"blur"}],time:[{required:!0,message:"请选择成立时间",trigger:"blur"}]}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0;var e={offset:this.listQuery.page,limit:this.listQuery.limit,name:this.listQuery.name};Object(r["d"])(e).then((function(e){t.list=e.data.data.currentList,t.total=e.data.data.totalRecords,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},resetForm:function(){this.dataForm={id:void 0,sort:void 0,name:void 0,time:void 0,remark:void 0}},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a={sort:t.dataForm.sort,name:t.dataForm.name,regionTime:t.dataForm.time,remark:t.dataForm.remark};Object(r["a"])(a).then((function(e){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"创建成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"添加失败"})}))}}))},handleUpdate:function(t){var e=this;this.dataForm={id:t.id,sort:t.sort,name:t.name,time:t.time,remark:t.remark},this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a={id:t.dataForm.id,sort:t.dataForm.sort,name:t.dataForm.name,time:t.dataForm.time,remark:t.dataForm.remark};Object(r["e"])(a).then((function(){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"修改失败"})}))}}))},handleDelete:function(t){var e=this,a={id:t.id};Object(r["c"])(a).then((function(t){e.$notify.success({title:"成功",message:"删除成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message?t.data.message:"删除失败"})}))}}},s=l,u=a("9ca4"),c=Object(u["a"])(s,i,n,!1,null,null,null);e["default"]=c.exports},a2cd:function(t,e,a){"use strict";var i=a("238a");t.exports=function(t,e){return!!t&&i((function(){e?t.call(null,(function(){}),1):t.call(null)}))}},a387:function(t,e,a){},c904:function(t,e,a){"use strict";var i=a("e46b"),n=a("5daa"),r=a("008a"),o=a("238a"),l=[].sort,s=[1,2,3];i(i.P+i.F*(o((function(){s.sort(void 0)}))||!o((function(){s.sort(null)}))||!a("a2cd")(l)),"Array",{sort:function(t){return void 0===t?l.call(r(this)):l.call(r(this),n(t))}})},f6b7:function(t,e,a){"use strict";var i=a("a387"),n=a.n(i);n.a}}]);