<template>
    <!-- 弹出框内容 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        v-if="dialogVisible"
        :modal="false"
        :close-on-click-modal="closeConfig"
        :close-on-press-escape="closeConfig"
        @close="closeDialog"
        style="z-index:2007"
    >

        <el-form
            v-if="type !== '用户'"
            :model="formData"
            label-width="97px"
            label-suffix="："
            label-position="right"
            ref="workflowConfigForm"
            :rules="configRules"
            size="small"
            @submit.native.prevent
        >
         <!-- 搜索框 -->
             <el-row :gutter="24">
                  <el-col :span="8" v-show=" type !=='审核'">
                    <el-form-item label="编码" label-width="43px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="8"  v-show=" type !=='审核'">
                    <el-form-item label="名称" label-width="43px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                 
                  <el-col :span="8" v-show="type !=='服务' && type !=='审核'">
                    <el-form-item label="状态" label-width="43px">
                         <el-select v-model="formData.formCtionTypeCon" clearable placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        
                    </el-form-item>
                  </el-col> 
                <el-col :span="6" :offset="2" v-show="type ==='服务'">
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
                </el-col>
             </el-row>
             <el-row :gutter="24" >
                <el-col :span="8" v-show="type !=='服务'  && type !=='审核'">
                    <el-form-item :label="type ==='职务'?'公司':'角色类别'" :label-width="type ==='职务'?'43px':'70px'">
                         <el-select v-model="formData.formCtionRole" clearable placeholder="请选择">
                            <el-option
                            v-for="item in roleoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
                 <el-col :span="10" v-show="type ==='角色'">
                    <el-form-item label="缺省管理员角色" label-width="112px">
                    <el-radio-group v-model="radio">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                 </el-form-item>
                </el-col> 
                 <el-col :span="10" v-show="type ==='职务'" class="job-class">
                     <el-form-item label="职务类型" label-width="70px">
                     <el-input clearable size="small" v-model="formData.formRoleName" placeholder="请输入条件值"></el-input>
                    <img class="icon-search" src="../../../assets/img/search.svg" >
                 </el-form-item>
                  
                </el-col> 
                 <!-- 审核-业务数据 -->
                  <span v-show="type ==='审核'">
                    <el-col :span="12">
                    <el-form-item label="编码" label-width="56px">
                        <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="12">
                    <el-form-item label="名称" label-width="56px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  <el-col :span="12">
                    <el-form-item label="超类编码" label-width="84px">
                        <el-input clearable size="small" v-model="formData.formName" placeholder="请输入条件值"></el-input>
                    </el-form-item>
                  </el-col> 
                  </span>
                <el-col :span="6" v-show="type !=='服务'">
                    <el-button type="primary" size="small" plain @click="reWorkSearchTable">重置</el-button>
                    <el-button type="primary" size="small" plain @click="workSearchTable">搜索</el-button>
                </el-col>
             </el-row>
               
         </el-form>
         <el-row class="user-class">
            <el-col  v-if="type === '用户'" :span="12" class="tree-class">
                <!-- 树状图 -->
                <el-tree
                    v-show="type === '用户'"
                    :data="treeData"
                    :props="defaultProps"
                    accordion
                    @node-click="handleNodeClick">
                </el-tree>
            </el-col>
            <el-col :span="type === '用户'?12:24" >
                <el-row :gutter="24" v-show="type === '用户'">
                    <el-col :span="18">
                        <el-form-item label="搜索" >
                            <el-input v-model="searchKeyW" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" plain  size="small" @click="searchKey">查询</el-button>
                    </el-col>
               </el-row>
                 
                 
                <!-- 表格 -->
                <dynamic-table
                    class="workTable"
                    :columns="columns3"
                    :table-data="gridData"
                    :height="type === '用户'?250:300"
                    :total="total"
                    :isShowPager="totalpage"
                    :page-num="pageNum"
                    :page-size="pageSize"
                    @current-change="onCurrentChange"
                    @selection-change="onSelectionChange"
                    v-loading="tableLoading"
                    element-loading-text="加载中"
                ></dynamic-table>
            </el-col>
        </el-row>
          <el-row :gutter="20">
            <el-col :span="13" style="text-align: right;">
                <el-button  size="small" @click="saveConfig">确定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>

import DynamicTable from '../../../components/common/dytable/dytable.vue';
export default {
    name: 'baseInfoDialog',
     components: {
      DynamicTable,
    },
    props: {
        type:{
            type: String,
            default: ''
        },
        // 当前配置节点类型
        title: {
            type: String,
            default: ''
        },
        // 配置对话框显示标识
        visible: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            searchKeyW:'',
            options: [],
            roleoptions: [],
            radio:1,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            totalpage:true,
            tableLoading:false,
            // 关闭对话框配置
            closeConfig: false,
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: {},
            gridData:[],
            searchgridData:[],
            multipleSelection: [],
             // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入英文名', trigger: 'blur' },
                displayName: { required: true, message: '请输入名称', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
            columns3: [],
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'fname'
            },
        };
    },
    computed: {
        // title () {
        //     const typeConfig = {
        //         Start: '端点配置',
        //         End: '端点配置',
        //         Condition: '手工活动配置',
        //         Fork: '自由活动配置',
        //         Join: '审核活动配置',
        //         Task: '路由配置',
        //         Line: '连接线配置'
        //     };
        //     return typeConfig[this.type] || '保存工作流';
        // }
    },
    watch: {
         // 对话框显示 自动聚焦name输入框
        visible (bool) {//console.log(bool)
            this.dialogVisible = bool;
            //角色查询
            if(this.type ==="角色"){
                this.columns3=[
                    {
                        type: 'selection'
                    },
                    {
                        key: 'code',
                        title: '编码'
                    },
                    {
                        key: 'name',
                        title: '名称'
                    },
                    {
                        key: 'role_expression',
                        title: '角色类别'
                    },
                    {
                        key: 'sortOrder',
                        title: '描述'
                    },
                    {
                        key: 'AdminS',
                        title: '缺省管理员'
                    },
                ];
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize
                this.$api.processSet.getRolesData(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    for(var i=0;i< resData.length;i++){
                        if(resData[i].admin){
                            resData[i].AdminS="是";
                        }else{
                            resData[i].AdminS="否";
                        }
                    }
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
            //用户查询
            if(this.type ==="用户"){
                this.columns3=[
                    {
                        type: 'selection'
                    },
                    {
                        key: 'fcode',
                        title: '编码'
                    },
                    {
                        key: 'fname',
                        title: '名称'
                    },
                    {
                        key: 'positionName',
                        title: '职务'
                    },
                ];
                if(this.title =='用户查询'){
                    this.gridData =[];
                    let fromdata={};
                    fromdata.queryType='';
                    this.$api.processSet.getUserTree(fromdata).then(res=>{
                        let resData=res.data.data;
                        let resDataArr= eval("("+resData+")");//console.log(resDataArr.JsonInfo[0])
                        this.treeData = resDataArr.JsonInfo;
                        this.totalpage=false;
                    },error=>{
                        console.log(error)
                    })
                }else if(this.title =='组织结构查询'){
                    let fromdata={};
                    fromdata.queryType='org';
                    this.gridData =[];
                    this.$api.processSet.getUserTree(fromdata).then(res=>{
                        let resData=res.data.data;
                        let resDataArr= eval("("+resData+")");
                        this.treeData = resDataArr;
                        this.totalpage=false;
                    },error=>{
                        console.log(error)
                    })
                }
                
            }
            //服务
            if(this.type ==="服务"){
                this.columns3=[
                    {
                        type: 'selection'
                    },
                    {
                        key: 'fcode',
                        title: '编码'
                    },
                    {
                        key: 'fname',
                        title: '名称'
                    },
                    {
                        key: 'fremark',
                        title: '备注'
                    },
                ];
                this.gridData =[];
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize
                this.$api.processSet.getWfBusinessService(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                    this.totalpage=true;
                },error=>{
                    console.log(error)
                })
            }
            if(this.type ==="职务"){
                this.columns3=[
                    {
                        type: 'selection'
                    },
                    {
                        key: 'fcode',
                        title: '编码'
                    },
                    {
                        key: 'fname',
                        title: '名称'
                    },
                    {
                        key: 'positionType',
                        title: '职务类型'
                    },
                    {
                        key: 'fremark',
                        title: '备注'
                    },
                ];
                this.gridData =[];
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize
                this.$api.processSet.positionList(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                    this.totalpage=true;
                },error=>{
                    console.log(error)
                })
            }
            //审核 
            if(this.type ==="审核"){
                  this.columns3=[
                    {
                        type: 'selection'
                    },
                    {
                        key: 'fcode',
                        title: '编码'
                    },
                    {
                        key: 'fname',
                        title: '名称'
                    },
                    {
                        key: 'fremark',
                        title: '描述'
                    }
                ];
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize
                this.$api.svg.getProcessData(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            let children = data.children;
            if(children){
                if(children.length > 0){
                    if(this.title =='用户查询'){
                        if(children[0].types === '2'){
                            this.gridData = children;
                            this.searchgridData= children;
                        }
                    }else if(this.title =='组织结构查询'){
                        this.gridData = children;
                        this.searchgridData= children;
                    }
                    
                }
            }
        },
        closeDialog(){
            let serchData=[];
            let dialogType=this.title;
            let typeS=this.type;
            this.$emit('closeDialog',serchData,dialogType,typeS);
        },
        searchKey(){
            let usertable = this.searchgridData;
            let searchdata=[];
            let serachS=this.searchKeyW;
            if(usertable.length >0){
                if(serachS !=''){
                    for(var i=0;i<usertable.length;i++){
                        let positionName=usertable[i].positionName;
                        let fcode=usertable[i].fcode;
                        let fname=usertable[i].fname;
                        if(positionName.indexOf(serachS)>-1){
                            searchdata.push(usertable[i]);
                        }else if(fcode.indexOf(serachS)>-1){
                            searchdata.push(usertable[i]);
                        }else if(fname.indexOf(serachS)>-1){
                            searchdata.push(usertable[i]);
                        }
                    }
                    this.gridData=searchdata;
                }else{
                    this.gridData=this.searchgridData;
                }
            }else{
                this.gridData=this.searchgridData;
            }
        },
        reWorkSearchTable(){
            if(this.type ==="服务"){
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize
                this.$api.processSet.getWfBusinessService(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
            if(this.type ==="角色"){
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize
                this.$api.processSet.getRolesData(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    for(var i=0;i< resData.length;i++){
                        if(resData[i].admin){
                            resData[i].AdminS="是";
                        }else{
                            resData[i].AdminS="否";
                        }
                    }
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
            if(this.type ==="职务"){
                let fromdata1={};
                fromdata1.page=this.pageNum;
                fromdata1.size=this.pageSize
                this.$api.processSet.positionList(fromdata1).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            } 
        },
        workSearchTable(){
            if(this.type ==="服务"){
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                let formCode=this.formData.formCode;
                if(formCode){
                    fromdata.fcode=formCode;
                }
                let formName=this.formData.formName;
                if(formName){
                    fromdata.fname=formName;
                }
                this.$api.processSet.getWfBusinessService(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
            if(this.type ==="角色"){
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                let formCode=this.formData.formCode;
                if(formCode){
                    fromdata.code=formCode;
                }
                let formName=this.formData.formName;
                if(formName){
                    fromdata.name=formName;
                }
                let formCtionTypeCon=this.formData.formCtionTypeCon;
                if(formCtionTypeCon){
                    fromdata.role_expression=formCtionTypeCon;
                }
                let formCtionRole=this.formData.formCtionRole;
                if(formCtionRole){
                    fromdata.portalRole=formCtionRole;
                }
                let formradio=this.radio;
                if(formradio){
                    fromdata.admin=formradio;
                }
                this.$api.processSet.getRolesData(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    for(var i=0;i< resData.length;i++){
                        if(resData[i].admin){
                            resData[i].AdminS="是";
                        }else{
                            resData[i].AdminS="否";
                        }
                    }
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
            if(this.type ==="职务"){
                let fromdataZW={};
                fromdataZW.page=this.pageNum;
                fromdataZW.size=this.pageSize;
                let formCode=this.formData.formCode;
                if(formCode){
                    fromdataZW.fcode=formCode;
                }
                let formName=this.formData.formName;
                if(formName){
                    fromdataZW.fname=formName;
                }
                let formCtionTypeCon=this.formData.formCtionTypeCon;
                if(formCtionTypeCon){
                    fromdataZW.fstatus=formCtionTypeCon;
                }
                let formCtionRole=this.formData.formCtionRole;
                if(formCtionRole){
                    fromdataZW.fcompanyoid=formCtionRole;
                }
                let formRole=this.formData.formRoleName;
                if(formRole){
                    fromdataZW.positionType=formRole;
                }
                this.$api.processSet.positionList(fromdataZW).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
        },
        saveConfig(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    //返回选中的父组件选中的row,并修某些改值
                    let serchData=this.multipleSelection;
                    let dialogType=this.title;
                    let typeS=this.type;
                    this.$emit('closeDialog',serchData,dialogType,typeS);
                }
            }else{
                this.$message.error('请选择一行数据!');
            }
            
        },
        onCurrentChange(val){
            //下一页
            if(this.type ==="角色"){
                let fromdata={};
                fromdata.page=val;
                fromdata.size=this.pageSize;
                this.$api.processSet.getRolesData(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    for(var i=0;i< resData.length;i++){
                        if(resData[i].admin){
                            resData[i].AdminS="是";
                        }else{
                            resData[i].AdminS="否";
                        }
                    }
                    this.gridData = resData;
                    this.pageNum = res.data.data.page;
                    this.total = res.data.data.total;
                },error=>{
                console.log(error)
                })
            }
            if(this.type ==="服务"){
                let fromdata={};
                fromdata.page=val;
                fromdata.size=this.pageSize
                this.$api.processSet.getWfBusinessService(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.pageNum = res.data.data.page;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
            if(this.type ==="职务"){
                let fromdata={};
                fromdata.page=val;
                fromdata.size=this.pageSize
                this.$api.processSet.positionList(fromdata).then(res=>{
                    let resData=res.data.data.rows;
                    this.gridData = resData;
                    this.pageNum = res.data.data.page;
                    this.total = res.data.data.total;
                },error=>{
                    console.log(error)
                })
            }
        },
        onSelectionChange(val){
            this.multipleSelection = val;
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 500px !important;
}
.user-class{
    /deep/ .el-form-item__label{
    width: 50px !important;
    }
    /deep/ .el-form-item__content{
        margin-left: 50px !important;
    }
    .tree-class{
        height: 310px;
        overflow: auto;
    }
}
.icon-search{
     width: 24px;
     height: auto;
     margin-left: 12px;
     cursor: pointer;
 }
 .job-class{
     /deep/ .el-form-item__content{
          width: 64%;
     }
        
 }
.workTable{
    /deep/ .el-input{
        width: 50% !important;
    }
}
</style>
