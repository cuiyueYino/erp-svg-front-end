<template>
<!-- 弹出框内容 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        :modal="false"
        :close-on-click-modal="closeConfig"
        :close-on-press-escape="closeConfig"
        @closed="closeDialog"
        style="z-index:2007"
        :width="type == '用户'?'70%':'50%'"
    >
    <el-form
            :model="formData"
            label-width="97px"
            label-suffix="："
            label-position="right"
            ref="workflowConfigForm"
            :rules="configRules"
            size="small"
            @submit.native.prevent
        >
     <!-- 新建用户&角色 -->
     <el-row :gutter="20">
        <el-col  v-show="type === '用户'" :span="8" class="tree-class">
            <h3>人员</h3>
                    <el-col :span="16">
                        <el-form-item label="搜索"  label-width="60px">
                            <el-input v-model="searchKeyW" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-button type="primary"  icon='el-icon-search' size="small"   @click="searchKey">查询</el-button>
                    </el-col>
            <el-col :span="24" class="user-tree">
            <!-- 树状图 -->
            <el-tree
                v-show="type === '用户'"
                :data="treeData"
                ref="tree"
                :props="defaultProps"
                :default-expand-all="expandAll"
                :render-content="renderContent"
                show-checkbox
                accordion>
            </el-tree>
            </el-col>
        </el-col>
        <el-col  :span="1"  v-show="type == '用户'"  class="tree-class">
            <el-divider direction="vertical"></el-divider>
         </el-col>
        <el-col  :span="type == '用户'?15:24" class="tree-class">
            <h3  v-show="type == '用户'">角色</h3>
            <!-- 搜索框 -->
             <el-row :gutter="12" v-if="type === '用户'" >
                    <el-col :span="8">
                        <el-form-item label="编码" label-width="70px">
                            <el-input clearable size="small" v-model="formData.formCode" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col> 
                    <el-col :span="8">
                        <el-form-item label="名称" label-width="70px">
                            <el-input clearable size="small" v-model="formData.formName" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" size="small" icon='el-icon-search'  @click="workSearchTable">搜索</el-button>
                        <el-button type="primary" size="small" icon='el-icon-refresh'  @click="reWorkSearchTable()">重置</el-button>
                    </el-col>
                 </el-row>
                <!--<el-col :span="8" v-show="type !== '用户'">
                    <el-form-item label="虚拟组织" label-width="84px">
                        <el-radio-group v-model="radio">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col> 
                <el-col :span="8"  v-show="type === '用户'">
                    <el-form-item label="缺省管理员角色" label-width="124px">
                        <el-radio-group v-model="radio">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>-->
             <!-- </el-row>
            <el-row :gutter="24" > -->
                <!--<el-col :span="8">
                    <el-form-item label="组织类型" v-show="type !== '用户'" label-width="84px">
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
                 <el-col :span="8">
                    <el-form-item label="状态"  v-show="type === '用户'" label-width="70px">
                         <el-select v-model="formData.formCtionTypeCon" clearable placeholder="请选择">
                            <el-option
                            v-for="item in StaOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
                 <el-col :span="8">
                    <el-form-item label="角色类别"  v-show="type === '用户'" label-width="84px">
                         <el-select v-model="formData.roleType" clearable placeholder="请选择">
                            <el-option
                            v-for="item in Roleoptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>-->
                 <!-- <el-col :span="8">
                    <el-form-item label="公司" v-show="type !== '用户'" label-width="70px" prop="fcompanyoid">
                         <el-select v-model="formData.fcompanyoid" clearable placeholder="请选择">
                            <el-option
                            v-for="item in Companyoptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col> -->
                <el-row v-show="type !== '用户'">
                    <el-col :span="8">
                        <el-form-item label="编码" label-width="70px">
                            <el-input clearable size="small" v-model="formData.formCodeDep" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col> 
                    <el-col :span="8">
                        <el-form-item label="名称" label-width="70px">
                            <el-input clearable size="small" v-model="formData.formNameDep" placeholder="请输入"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" size="small" icon='el-icon-search'  @click="workSearchTable">搜索</el-button>
                        <el-button type="primary" size="small" icon='el-icon-refresh'  @click="reWorkSearchTable()">重置</el-button>
                    </el-col>
                </el-row>
            
              <!-- 表格-->
                <dynamic-table
                 v-show=" type !== '用户'"
                    class="workTable"
                    :height="340"
                    :columns="columns3"
                    :table-data="griddepData"
                    :total="total3"
                    :page-num="pageNum3"
                    :page-size="pageSize3"
                    @current-change="onDepCurrentChange"
                    @selection-change="onDepSelectionChange"
                    v-loading="DeptableLoading"
                    element-loading-text="加载中"
                ></dynamic-table>
                 <dynamic-table
                    v-show=" type == '用户'"
                    class="workTable"
                    :height="340"
                    :columns="columns"
                    :table-data="gridData"
                    :total="total"
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
            <el-col :span="13" style="text-align: right;margin-top: 18px;">
                <el-button  type='success' size="small" icon='el-icon-check' @click="saveConfig">确定</el-button>
            </el-col>
        </el-row>
         </el-form>
    </el-dialog>
</template>

<script>

import DynamicTable from '../../components/common/dytable/dytable.vue';


export default {
    name: 'procesBusinesDialog',
    components: {
      DynamicTable,
    },
    props: {
        type:{
            type: String,
            default: ''
        },
        companyId:{
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
            formCodeDepFlag:'',
            formNameDepFlag:'',
            searchKeyW:'',
            options: [],
            Roleoptions: [],
            StaOptions: [],
            Companyoptions: [],
            radio:'1',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            pageNum3: 1,
            pageSize3: 10,
            total3: 20,
            tableLoading:false,
            DeptableLoading:false,
            // 关闭对话框配置
            closeConfig: false,
            expandAll: false,
            // 对话框显示标识
            dialogVisible: this.visible,
            // 配置表单数据
            formData: {},
            gridData:[],
            multipleSelection: [],
            DepmultipleSelection: [],
             // 配置表单校验规则
            configRules: {
                name: { required: true, message: '请输入英文名', trigger: 'blur' },
                displayName: { required: true, message: '请输入名称', trigger: 'blur' },
                performType: { required: true, message: '请选择参与类型', trigger: 'change' }
            },
            griddepData:[],
            columns: [
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
                    key: 'roleTypeName',
                    title: '角色类型'
                },
                {
                    key: 'remark',
                    title: '描述'
                },
                
            ],
            columns3: [
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
            ],
            treeData:[],
            defaultProps: {
                children: 'children',
                label: 'label'
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
        visible (bool) {
            this.dialogVisible = bool;
            // if(bool){
            //     this.formData.formCodeDep ='';
            // }
            if(this.type =='用户'){
                let fromdata={};
                fromdata.id='_DefaultCompanyOId';
                this.getUserTreeData(fromdata);
                let Roledata={};
                Roledata.queryType='';
                Roledata.page=this.pageNum;
                Roledata.size=this.pageSize;
                this.getUserRole(Roledata);
            }else{
                let Roledata={};
                Roledata.page=this.pageNum;
                Roledata.size=this.pageSize;
                Roledata.companyOid=this.companyId;
                this.getDepartment(Roledata);
                let Comdata={};
                // this.getCompany(Comdata);
            }
        }
    },
    methods: {
        //查询人员
        getUserTreeData(data){
            let fromdata=data;
            this.$api.processSet.getUserTreeData(fromdata).then(res=>{
                
                let resData=res.data.data;
                let resDataArr= eval("("+resData+")");
                this.treeData = resDataArr;
            },error=>{
                console.log(error)
            })
        },
        //查询角色
        getUserRole(data){
            let fromdata=data;
            if((fromdata.code != '' && fromdata.code != undefined) || (fromdata.name != '' && fromdata.name != undefined)){
                if(!fromdata.changePage){//处理当前页数不在第一页时，发生条件搜索的情况
                    fromdata.page = 1;
                }
            }
            this.$api.processSet.findRolePage(fromdata).then(res=>{
                let resData=res;
                let returndata = resData.data;
                let tableDataArr=returndata.data.rows;
                this.gridData=tableDataArr;
                this.total=returndata.data.total;
                this.pageNum=returndata.data.page;
            },error=>{
                console.log(error)
            })
        },
        //查询部门
        getDepartment(data){
            let fromdata = {};
            fromdata.company = data.companyOid;
            fromdata.code = data.fcode;
            fromdata.name = data.fname;
            fromdata.page = data.page;
            fromdata.size = data.size;
            // if((fromdata.code != '' && fromdata.code != undefined) || (fromdata.name != '' && fromdata.name != undefined)){
            //     if(!fromdata.changePage){//处理当前页数不在第一页时，发生条件搜索的情况
            //         fromdata.page = 1;
            //     }
            // }
            this.$api.processSet.getDepartmentInfosByCompany(fromdata).then(res=>{
                let resData=res;
                this.griddepData=resData.data.data.rows;
                this.total3=resData.data.data.total;
                this.pageNum3=resData.data.data.page;
            },error=>{
                console.log(error)
            })
        },
        //
        //查询公司
        getCompany(data){
            let fromdata=data;
            this.$api.processSet.getCompanyData(fromdata).then(res=>{
                let resData=res;
                this.Companyoptions=resData.data.data.rows;
            },error=>{
                console.log(error)
            })
        },
        //查询状态
        getStatus(data){
            let fromdata=data;
            this.$api.processSet.getStatus(fromdata).then(res=>{
                let resData=res;
                let StaObj=resData.data.data;
                for(var item in StaObj){
                    let obj={};
                    obj.label=StaObj[item];
                    obj.value=item;
                    this.StaOptions.push(obj);
                }
            },error=>{
                console.log(error)
            })
        },
        //tree 改写样式
        renderContent(h, { node, data, store }) {
            if(data){
                if(data.fstruid){
                    let fstruid =data.fstruid; 
                    if(fstruid.length > 5){
                        return(
                            <span class="custom-tree-node">
                                <span><i class="el-icon-folder-opened"></i></span>
                                <span style="margin-left: 5px;">{node.data.fname}</span>
                            </span>
                        )
                    }else{
                        return(
                            <span class="custom-tree-node">
                                <span><i class="el-icon-folder"></i></span>
                                <span style="margin-left: 5px;">{node.data.fname}</span>
                            </span>
                        ) 
                    }
                }else{
                    return(
                        <span class="custom-tree-node">
                            <span><i class="el-icon-user-solid"></i></span>
                            <span style="margin-left: 5px;">{node.data.fname}</span>
                        </span>
                    )
                }
            }  
        },
        //点击关闭
        closeDialog(){
            let SerchData={};
            this.$emit('closeDialog',SerchData,'关闭');
        },
        //查询人员
        searchKey(){
            let fromdata={};
            fromdata.name=this.searchKeyW;
            this.getUserTreeData(fromdata);
        },
        //重置role table
        reWorkSearchTable(){
            this.formData = {};
            if(this.type =='用户'){
                let Roledata={};
                Roledata.queryType='';
                Roledata.page=1;
                Roledata.size=this.pageSize;
                this.getUserRole(Roledata);
            }else{
                let Roledata={};
                Roledata.queryType='';
                Roledata.page=1;
                Roledata.size=this.pageSize;
                Roledata.companyOid=this.companyId;
                this.getDepartment(Roledata);
                // let Roledata={};
                // Roledata.page=this.pageNum;
                // Roledata.size=this.pageSize;
                // Roledata.company=this.companyId;
                // this.getDepartment(Roledata);
                // let Comdata={};
                // this.getCompany(Comdata);


            }
        },
        //条件查询 role table
        workSearchTable(){
            if(this.type =='用户'){
                let Roledata={};
                Roledata.queryType='';
                Roledata.page=this.pageNum;
                Roledata.size=this.pageSize;
                Roledata.code=this.formData.formCode;
                Roledata.name=this.formData.formName;
                this.getUserRole(Roledata);
            }else{
                this.formCodeDepFlag = this.formData.formCodeDep;
                this.formNameDepFlag = this.formData.formNameDep;
                let Roledata={};
                Roledata.queryType='';
                Roledata.page=1;
                Roledata.size=this.pageSize;
                Roledata.fcode=this.formCodeDepFlag;
                Roledata.fname=this.formNameDepFlag;
                Roledata.companyOid=this.companyId;
                this.getDepartment(Roledata);
            }
        },
        //提交
        saveConfig(){
            if(this.type =='用户'){
                let users = this.$refs.tree.getCheckedNodes(false);
                if(this.multipleSelection.length > 1){
                    this.$message.error('只能选择一个!');
                }else if(this.multipleSelection.length == 0 && users.length == 0){
                    this.$message.error('请选择人员和角色!');
                } else if(users.length == 0) {
                    this.$message.error('请至少选择一个人员!');
                } else if(this.multipleSelection.length == 0) {
                    this.$message.error('请选择角色!');
                } else{
                    //去掉人员中的空部门
                    let relUserList = new Array();
                    for(var i = 0; i < users.length; i++) {
                        if(!users[i].hasOwnProperty("children")) {
                            if(users[i].fstruid == undefined){
                                relUserList.push(users[i]);
                            }
                        }
                        
                    }

                    if(relUserList.length == 0){
                        this.$message.error('人员无效，至少选择一个有效的人员！(没有人员的公司或部门为无效选择)');
                        return;
                    }

                    let SerchData={};
                    SerchData.RoleSelection=this.multipleSelection;
                    SerchData.DepSelection=this.DepmultipleSelection;
                    SerchData.NodeCheckData=relUserList;
                    this.$emit('closeDialog',SerchData,this.type);
                }
            }else{
                if(this.DepmultipleSelection.length > 1){
                    this.$message.error('只能选择一个');
                }else if(this.DepmultipleSelection.length == 0){
                    this.$message.error('请选择一项');
                }else{
                    let SerchData={};
                    SerchData.RoleSelection=this.multipleSelection;
                    SerchData.DepSelection=this.DepmultipleSelection;
                    let NodeCheckData=this.$refs.tree.getCheckedNodes(false);
                    SerchData.NodeCheckData=NodeCheckData;
                    this.$emit('closeDialog',SerchData,this.type);
                }
            }
        },
        //角色下一页
        onCurrentChange(val){
            let Roledata={};
            this.pageNum = val;
                Roledata.queryType='';
                Roledata.page=this.pageNum;
                Roledata.size=this.pageSize;
                Roledata.code=this.formData.formCode;
                Roledata.name=this.formData.formName;
                Roledata.changePage=true;
				this.getUserRole(Roledata);
        },
        //角色table选中事件
        onSelectionChange(val){
                // let Roledata={};
                //     this.pageNum = val;
                //     Roledata.queryType='';
                //     Roledata.page=this.pageNum;
                //     Roledata.size=this.pageSize;
                //     Roledata.code=this.formData.formCode;
                //     Roledata.name=this.formData.formName;
                // this.getUserRole(Roledata);
                 this.multipleSelection = val;
        },
        //部门下一页
        onDepCurrentChange(val){
            let Roledata={};
            Roledata.page=val;
            Roledata.size=this.pageSize;
            Roledata.companyOid=this.companyId;
            Roledata.fcode=this.formCodeDepFlag;
            Roledata.fname=this.formNameDepFlag;
            Roledata.changePage=true;
            this.getDepartment(Roledata);
        },
        //部门table选中事件
        onDepSelectionChange(val){
            this.DepmultipleSelection = val;
        },
    }
};
</script>
<style  lang="scss" scoped>
/deep/ .el-dialog__body{
    padding:20px !important;
    max-height: 600px !important;
}
 /deep/ .el-divider--vertical{
     height: 480px;
 }
 /deep/ h3{
     margin-top: 0;
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
.user-tree{
    height: 410px;
    overflow:auto;
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
 

</style>
