(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c340dcea"],{"098d":function(t,e,a){"use strict";(function(t){a("cc57");var r=a("cabd"),n=a("0d1c"),i=a("5f87"),o=a("3c7d");e["a"]={name:"Details",data:function(){return{uploadPath:n["q"],list:[],listLoading:!0,listQuery:{page:1,limit:20,name:""},dataForm:{id:void 0,name:void 0,details_sort:void 0,details_url:void 0,remark:void 0,details_can_see:void 0},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改章节",create:"添加章节"},rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],details_sort:[{required:!0,message:"请输入排序",trigger:"blur"}],details_url:[{required:!0,message:"请上传视频",trigger:"blur"}],details_can_see:[{required:!0,message:"请输入免费观看时长",trigger:"blur"}]}}},computed:{headers:function(){return{token:Object(i["a"])()}}},created:function(){this.getList()},methods:{getList:function(){var t=this;this.listLoading=!0;var e={offset:this.listQuery.page,limit:this.listQuery.limit,name:this.listQuery.name,curriculum_id:this.$route.query.id};Object(r["c"])(e).then((function(e){t.list=e.data.data.currentList,t.total=e.data.data.totalRecords,t.listLoading=!1})).catch((function(){t.list=[],t.total=0,t.listLoading=!1}))},handleFilter:function(){this.listQuery.page=1,this.getList()},resetForm:function(){this.dataForm={id:void 0,name:void 0,details_sort:void 0,details_url:void 0,remark:void 0,details_can_see:void 0}},beforeVideoUrlUpload:function(e){var a=this,r=this,n={endpoint:"http://bj.bcebos.com",credentials:{ak:"d4f7997db9c74baf96a42483bdfcd558",sk:"33e1fa5a8e6b4c11a0638cad34e85980"}},i="wuyuefang",l=new FileReader;return l.readAsArrayBuffer(e),l.onload=function(l){var s=new t(l.target.result),u=new o["BosClient"](n);u.putObject(i,e.name,s).then((function(t){r.dataForm.details_url=n.endpoint+"/"+i+"/"+e.name})).catch((function(){a.$notify.error({title:"失败",message:"视频上传失败"})}))},!1},handleCreate:function(){var t=this;this.resetForm(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a={curriculum_id:t.$route.query.id,name:t.dataForm.name,details_sort:t.dataForm.details_sort,details_url:t.dataForm.details_url,remark:t.dataForm.remark,details_can_see:t.dataForm.details_can_see};Object(r["a"])(a).then((function(e){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"创建成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"添加失败"})}))}}))},handleUpdate:function(t){var e=this;this.dataForm=Object.assign({},t),this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var a={curriculum_id:t.$route.query.id,id:t.dataForm.id,name:t.dataForm.name,details_sort:t.dataForm.details_sort,details_url:t.dataForm.details_url,remark:t.dataForm.remark,details_can_see:t.dataForm.details_can_see};Object(r["d"])(a).then((function(){t.dialogFormVisible=!1,t.$notify.success({title:"成功",message:"更新成功"}),t.getList()})).catch((function(e){t.$notify.error({title:"失败",message:e.data.message?e.data.message:"修改失败"})}))}}))},handleDelete:function(t){var e=this,a={id:t.id};Object(r["b"])(a).then((function(t){e.$notify.success({title:"成功",message:"删除成功"}),e.getList()})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message?t.data.message:"删除失败"})}))}}}}).call(this,a("fd40").Buffer)},"0d1c":function(t,e,a){"use strict";a.d(e,"q",(function(){return n})),a.d(e,"d",(function(){return i})),a.d(e,"f",(function(){return o})),a.d(e,"c",(function(){return l})),a.d(e,"g",(function(){return s})),a.d(e,"e",(function(){return u})),a.d(e,"i",(function(){return d})),a.d(e,"k",(function(){return c})),a.d(e,"b",(function(){return m})),a.d(e,"p",(function(){return f})),a.d(e,"h",(function(){return p})),a.d(e,"n",(function(){return h})),a.d(e,"l",(function(){return b})),a.d(e,"o",(function(){return _})),a.d(e,"m",(function(){return g})),a.d(e,"j",(function(){return v})),a.d(e,"a",(function(){return y}));var r=a("b775"),n="http://api.wuyuefang.top/upload";function i(t){return Object(r["a"])({url:"category",method:"get",params:t})}function o(t){return Object(r["a"])({url:"category/findAll",method:"get",params:t})}function l(t){return Object(r["a"])({url:"category",method:"post",data:t})}function s(t){return Object(r["a"])({url:"category",method:"put",data:t})}function u(t){return Object(r["a"])({url:"category",method:"delete",params:t})}function d(t){return Object(r["a"])({url:"trade/getById",method:"get",params:t})}function c(t){return Object(r["a"])({url:"trade/findLike",method:"get",params:t})}function m(t){return Object(r["a"])({url:"trade/add",method:"post",data:t})}function f(t){return Object(r["a"])({url:"trade",method:"put",data:t})}function p(t){return Object(r["a"])({url:"trade",method:"delete",params:t})}function h(t){return Object(r["a"])({url:"commodityStocks/getStockTwo",method:"get",params:t})}function b(t){return Object(r["a"])({url:"commodityStocks",method:"post",data:t})}function _(t){return Object(r["a"])({url:"commodityStocks",method:"put",data:t})}function g(t){return Object(r["a"])({url:"commodityStocks",method:"delete",params:t})}function v(t){return Object(r["a"])({url:"ptOrder/findByPage",method:"get",params:t})}function y(t){return Object(r["a"])({url:"ptOrder/getTrade/"+t.id,method:"put"})}},1:function(t,e){},10:function(t,e){},2:function(t,e){},2391:function(t,e,a){},3:function(t,e){},4:function(t,e){},5:function(t,e){},6:function(t,e){},7:function(t,e){},"77f6":function(t,e,a){"use strict";var r=a("2391"),n=a.n(r);n.a},8:function(t,e){},9:function(t,e){},cabd:function(t,e,a){"use strict";a.d(e,"f",(function(){return n})),a.d(e,"h",(function(){return i})),a.d(e,"e",(function(){return o})),a.d(e,"i",(function(){return l})),a.d(e,"g",(function(){return s})),a.d(e,"c",(function(){return u})),a.d(e,"a",(function(){return d})),a.d(e,"d",(function(){return c})),a.d(e,"b",(function(){return m}));var r=a("b775");function n(t){return Object(r["a"])({url:"curriculum/get_all_curriculum",method:"get",params:t})}function i(t){return Object(r["a"])({url:"curriculum/getByPage",method:"get",params:t})}function o(t){return Object(r["a"])({url:"curriculum",method:"post",data:t})}function l(t){return Object(r["a"])({url:"curriculum",method:"put",data:t})}function s(t){return Object(r["a"])({url:"curriculum",method:"delete",params:t})}function u(t){return Object(r["a"])({url:"details/getByPage",method:"get",params:t})}function d(t){return Object(r["a"])({url:"details",method:"post",data:t})}function c(t){return Object(r["a"])({url:"details",method:"put",data:t})}function m(t){return Object(r["a"])({url:"details",method:"delete",params:t})}},e4f8:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-right":"100px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:t.handleCreate}},[t._v("添加")]),t._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{clearable:"",placeholder:"请输入章节名称"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleFilter(e)}},model:{value:t.listQuery.name,callback:function(e){t.$set(t.listQuery,"name",e)},expression:"listQuery.name"}}),t._v(" "),a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handleFilter}},[t._v("查找")])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],attrs:{data:t.list,"element-loading-text":"正在查询中。。。",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",width:"150px",label:"ID",prop:"id",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.id))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"200px",label:"章节名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"排序"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.details_sort))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"300px",label:"视频地址"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.details_url))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"播放量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.details_play_num))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"免费观看时长"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.details_can_see)+"s")])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center","min-width":"100px",label:"备注"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.remark))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){return t.handleUpdate(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){return t.handleDelete(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.dataForm,"status-icon":"","label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"章节名称",prop:"name"}},[a("el-input",{attrs:{placeholder:"请输入章节名称"},model:{value:t.dataForm.name,callback:function(e){t.$set(t.dataForm,"name",e)},expression:"dataForm.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"章节视频",prop:"details_url"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadPath,"show-file-list":!1,headers:t.headers,"before-upload":t.beforeVideoUrlUpload}},[t.dataForm.details_url?a("video",{staticClass:"avatar",attrs:{src:t.dataForm.details_url}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{label:"排序",prop:"details_sort"}},[a("el-input",{attrs:{placeholder:"请输入章节排序"},model:{value:t.dataForm.details_sort,callback:function(e){t.$set(t.dataForm,"details_sort",e)},expression:"dataForm.details_sort"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"免费观看时长",prop:"details_can_see"}},[a("el-input",{attrs:{type:"number",placeholder:"请输入免费观看时长"},model:{value:t.dataForm.details_can_see,callback:function(e){t.$set(t.dataForm,"details_can_see",e)},expression:"dataForm.details_can_see"}},[a("template",{slot:"append"},[t._v("s")])],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"备注",prop:"remark"}},[a("el-input",{attrs:{type:"textarea",placeholder:"请输入备注"},model:{value:t.dataForm.remark,callback:function(e){t.$set(t.dataForm,"remark",e)},expression:"dataForm.remark"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取消")]),t._v(" "),"create"==t.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:t.createData}},[t._v("确定")]):a("el-button",{attrs:{type:"primary"},on:{click:t.updateData}},[t._v("确定")])],1)],1)],1)},n=[],i=a("098d"),o=i["a"],l=(a("77f6"),a("9ca4")),s=Object(l["a"])(o,r,n,!1,null,null,null);e["default"]=s.exports}}]);