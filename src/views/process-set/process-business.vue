<template>
    <div>     
    <!-- 搜索框 -->
        <el-card class="box-card">
           <el-row :gutter="24">
               <el-col :span="14">
                    <el-form :inline="true"  class="demo-form-inline">
                    <el-form-item >
                        <el-input clearable v-model="formCode" placeholder="请输入任意查询内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="onSubmit">搜索</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="getAll" class="search-all">重置</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
                 <el-col :span="10">
                     <el-button type="success" plain @click="add('新增业务')">新增</el-button>
                     <el-button type="danger" plain @click="deleteMsgData">删除</el-button>
                     <el-button type="warning" plain @click="add('编辑业务')">编辑</el-button>
                     <el-button type="success" plain @click="add('查看业务')">查看</el-button>
                 </el-col>
            </el-row>
        </el-card>
    <!-- 表格 -->
        <el-card class="box-card">
            <dynamic-table
                :columns="columns1"
                :table-data="tableData"
                :total="total"
                :page-num="pageNum"
                :page-size="pageSize"
                @current-change="onCurrentChange"
                @selection-change="onSelectionChange"
                v-loading="false"
                element-loading-text="加载中"
            ></dynamic-table>
        </el-card>
    <!-- 弹出框 -->
        <el-dialog :title="homeTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="部门" :label-width="formLabelWidth" prop="departMentName">
                    <el-input 
                    v-model="form.departMentName"
                    class="Carfiles"
                     :disabled="homeTitle == '查看业务'?true:false" 
                     autocomplete="off"
                     ></el-input>
                    <img class="icon-search"  
                    v-show="homeTitle !== '查看业务'"
                     @click="workSearch"
                      src="../../assets/img/search.svg">
                </el-form-item>
            </el-form>
             <el-row :gutter="24" class="joinTableBox">
                    <el-col :span="20">
                        <dynamic-table
                            :columns="columns"
                            :table-data="tableUBData"
                            :isShowPager="ShowPager"
                            :height="350"
                            @selection-change="onUBSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </el-col>
                     <el-col :span="3" class="joinBtnBox">
                        <el-button type="success" size="mini" :disabled="homeTitle == '查看业务'?true:false"  plain @click="joinSearch('用户')">新建</el-button>
                        <el-button type="danger" size="mini" :disabled="homeTitle == '查看业务'?true:false"  plain @click="deleteMsg">删除</el-button>
                    </el-col>
                </el-row>
            <el-row :gutter="20">
            <el-col :span="12" style="text-align: right;">
                <el-button  size="small" v-show="homeTitle !== '查看业务'" @click="saveConfig">保存</el-button>
            </el-col>
            <el-col :span="12"  :offset="homeTitle == '查看业务'?11:0">
                <el-button size="small" @click="cancelConfig">{{homeTitle == '查看业务'?'关闭':'取消'}}</el-button>
            </el-col>
        </el-row>
        </el-dialog>
        <!-- 部门弹出框 -->
        <pro-bus-dialog :visible="proBusDialogF" :title="titleStr" :type="userType"  @closeDialog="closeBaseInfo"></pro-bus-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proBusDialog from './proces-busines-dialog.vue'
export default {
    name:'businessProcess',
    components: {
      DynamicTable,
      proBusDialog,
    },
    inject: ['reload'],
    data() {
        return {
            homeTitle:'',
            userType:'',
            proBusDialogF:false,
            proApartDialogF:false,
            dialogFormVisible:false,
            ShowPager:false,
            titleStr:'',
            formCode:'',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fuserName',
                    title: '用户名称'
                },
                {
                    key: 'froleName',
                    title: '角色'
                }, 
            ],
            columns1: [
                {
                    type: 'selection'
                },
                {
                    key: 'statusStr',
                    title: '状态'
                },
                {
                    key: 'departMentName',
                    title: '部门'
                },
                {
                    key: 'companyName',
                    title: '公司'
                },
            
            ],
            tableData:[],
            tableUBData:[],
            multipleSelection: [],
            UBmultipleSelection: [],
            checked:false,
            form: {},
            formLabelWidth: '120px',
            rules: {
                departMentName:[{ required: true, message: '请输入部门', trigger: 'blur' }],
            }
        };
    },
    
    created(){
        let fromdata={};
        fromdata.page=this.pageNum;
        fromdata.size=this.pageSize;
        fromdata.fcreator=localStorage.getItem("ms_userId")
        this.getPBListData(fromdata);
    },
    computed:{
        
    },
    methods:{
        //流程业务组查询
        getPBListData(params){
            let fromdata=params;
            this.$api.processSet.getProBusList(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    if(returndata.data){
                        let tableArr=returndata.data.rows;
                        this.tableData=tableArr;
                        this.total=returndata.data.total;
                    }else{
                        this.tableData=[];
                        this.total=0;
                    }
                    this.dialogWFMVisible=false;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //多选
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        onUBSelectionChange(val) {
            this.UBmultipleSelection = val;
        },
        //分页、下一页
        onCurrentChange(val){
            let fromdata={};
            fromdata.page=val;
            fromdata.size=this.pageSize;
            fromdata.fcreator=localStorage.getItem("ms_userId")
            this.getPBListData(fromdata);
        },
        //搜索
        onSubmit(){
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            fromdata.fcreator=localStorage.getItem("ms_userId");
            fromdata.companyName=this.formCode;
            this.getPBListData(fromdata);
        },
        //重置
        getAll(){
            this.reload();
        },
        //新建、编辑、查看
        add(data){
            if(data=='新增业务'){
                this.dialogFormVisible=true;
                this.homeTitle=data;
                this.form={};
                this.tableUBData=[];
            }else{
                if(this.multipleSelection.length > 1){
                    this.$message.error('只能选择一个');
                }else if(this.multipleSelection.length == 0){
                    this.$message.error('请选择一项');
                }else{
                    let fromdata={};
                    fromdata.foid=this.multipleSelection[0].foid;
                    this.getLCData(fromdata,data);
                }
            }
        },
        //删除流程业务
        deleteMsgData(){
            if(this.multipleSelection.length > 1){
                this.$message.error('只能选择一个');
            }else if(this.multipleSelection.length == 0){
                this.$message.error('请选择一项');
            }else{
                let fromdata={};
                fromdata.foids=this.multipleSelection[0].foid;
                this.$api.processSet.delProBusData(fromdata).then(response => {
                    let responsevalue = response;
                    if(responsevalue){
                        this.$message.success('删除成功!');
                        this.dialogFormVisible=false;
                        this.reload();
                    }else{
                        this.$message.error('删除失败!');    
                    }
                });
            }
        },
        //删除用户/角色
        deleteMsg(){
            let selectUB=this.UBmultipleSelection;
            if(selectUB.length == 0){
                this.$message.error('请选择删除数据');
            }else{
                for (let i = 0; i < this.UBmultipleSelection.length; i++) {
                    let val = this.UBmultipleSelection;
                    val.forEach((val, index) => {
                        this.tableUBData.forEach((v, i) => {
                            if (val.fuserId === v.fuserId) {
                                // i 为选中的索引
                                this.tableUBData.splice(i, 1)
                            }
                        })
                    })
                }
            }
        },
        //关闭
        cancelConfig(){
            this.dialogFormVisible=false;
        },
        //保存
        saveConfig(){
            if(this.homeTitle=='新增业务'){
                let SaveFlag=true;
                let formData ={};
                if(this.form.departMentName){
                    formData.fdepartmentid=this.form.fdepartmentid;
                    SaveFlag=true;
                }else{
                   this.$message.error('请选择部门!');
                   SaveFlag=false;
                }
                if(this.tableUBData.length >0){
                    let roleList=[];
                    let userList=[];
                    for(let i=0;i<this.tableUBData.length;i++){
                        roleList.push(this.tableUBData[i].froleId);
                        userList.push(this.tableUBData[i].fuserId);
                    }
                    formData.roleList=roleList;
                    formData.userList=userList;
                    SaveFlag=true;
                }else{
                   this.$message.error('请添加角色和用户!');
                   SaveFlag=false;
                }
                formData.fcompanyid=localStorage.getItem('ms_companyId');
                formData.fhandler=localStorage.getItem('ms_userId');
                formData.fcreator=localStorage.getItem('ms_userId');
                if(SaveFlag){
                    this.saveLCData(formData);
                }
            }else if(this.homeTitle=='编辑业务'){
                let SaveFlag=true;
                let formData ={};
                if(this.form.departMentName){
                    formData.fdepartmentid=this.form.fdepartmentid;
                    SaveFlag=true;
                }else{
                   this.$message.error('请选择部门!');
                   SaveFlag=false;
                }
                if(this.tableUBData.length >0){
                    let roleList=[];
                    let userList=[];
                    for(let i=0;i<this.tableUBData.length;i++){
                        roleList.push(this.tableUBData[i].froleId);
                        userList.push(this.tableUBData[i].fuserId);
                    }
                    formData.roleList=roleList;
                    formData.userList=userList;
                    SaveFlag=true;
                }else{
                   this.$message.error('请添加角色和用户!');
                   SaveFlag=false;
                }
                formData.fcompanyid=this.form.fcompanyid;
                formData.fhandler=localStorage.getItem('ms_userId');
                formData.fcreator=localStorage.getItem('ms_userId');
                formData.foid=this.form.foid;
                if(SaveFlag){
                    this.updateLCData(formData);
                }
            }else{
                this.dialogFormVisible=false;
            }
        },
        //新建流程业务
        saveLCData(params){
            let fromdata=params;
            this.$api.processSet.saveProBusData(fromdata).then(response => {
                let responsevalue = response;
                if(responsevalue){
                    this.$message.success('新建成功!');
                    this.dialogFormVisible=false;
                    this.reload();
                }else{
                    this.$message.error('新建失败!');    
                }
            });
        },
        //更新流程业务
        updateLCData(params){
            let fromdata=params;
            this.$api.processSet.updateProBusData(fromdata).then(response => {
                let responsevalue = response;
                if(responsevalue){
                    this.$message.success('更新成功!');
                    this.dialogFormVisible=false;
                    this.reload();
                }else{
                    this.$message.error('更新失败!');    
                }
            });
        },
        //获取某一条流程业务数据
        getLCData(params,data){
            let fromdata=params;
            this.$api.processSet.getProBusData(fromdata).then(response => {
                let responsevalue = response;
                if(responsevalue){
                    this.form=responsevalue.data.data;
                    this.dialogFormVisible=true;
                    this.homeTitle=data;
                    let UBData=[];
                    let roleList=responsevalue.data.data.roleVoList;
                    let userList=responsevalue.data.data.userVoList;
                    if(roleList && userList){
                        for(let i=0;i<roleList.length;i++){ 
                            let DataObj={};
                            DataObj.froleId=roleList[i][0].oid;
                            DataObj.froleName=roleList[i][0].name;
                            let userId='';
                            let userName='';
                            let usetL=userList[i];
                            for(let j=0;j<usetL.length;j++){
                                let LSTObj=usetL[j];
                                userId+=LSTObj.oid+",";
                                userName+=LSTObj.name+",";
                            }
                            userId=userId.slice(0,userId.length -1);
                            userName=userName.slice(0,userName.length -1);
                            DataObj.fuserId=userId;
                            DataObj.fuserName=userName;
                            UBData.push(DataObj);
                        }
                        this.tableUBData=UBData;
                    }else{
                        this.tableUBData=[];
                    }
                }else{
                    this.$message.error('查询失败!');    
                }
            });
        },
        //查询部门按钮点击事件
        workSearch(){
            this.titleStr = '部门查询'
            this.proBusDialogF = true;
            this.userType = '部门'
        },
        //新建用户角色
        joinSearch(Str){
            this.titleStr = '新建用户&角色'
            this.proBusDialogF = true;
            this.userType = Str;
        },
        closeBaseInfo(data,type){
            this.proBusDialogF = false;
            if(type=="关闭"){}else{
                if(type =='部门'){
                    let depData=data.DepSelection;
                    if(depData[0]){
                        this.form.departMentName=depData[0].name;
                        this.form.fdepartmentid=depData[0].foid;
                    }
                }else{
                    let RoleData=data.RoleSelection;
                    let UserData=data.NodeCheckData;
                    let RowObj={};
                    if(RoleData[0]){
                        RowObj.froleName=RoleData[0].name;
                        RowObj.froleId=RoleData[0].foid;
                    }
                    let userName='';
                    let userID='';
                    for(let i=0;i<UserData.length;i++){
                        if(UserData[i]){
                            userName+=UserData[i].fname+',';
                            userID+=UserData[i].foid+',';
                        }
                    }
                    userName=userName.slice(0,userName.length -1);
                    userID=userID.slice(0,userID.length -1);
                    RowObj.fuserName=userName;
                    RowObj.fuserId=userID;
                    this.tableUBData.push(RowObj);
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
}
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
 /deep/ .el-textarea{
      width: 70%;
 }
.box-card:first-child{
    margin-bottom: 16px;
}
.Carfiles{
     width: 70%;
 }
.search-all{
    margin-left: 50px;
}
.icon-search{
     width: 24px;
     height: auto;
     margin-left: 12px;
     cursor: pointer;
 }
 .joinTableBox{
    margin-bottom:30px;
    margin-left: 10px;
 }
  .joinBtnBox{
     display: flex;
     align-items: center;
     flex-wrap: wrap;
     justify-content: center;
     button{
         margin-bottom: 10px;
     }
     /deep/ .el-button+.el-button{
         margin-left: 0; 
     }
 }

</style>