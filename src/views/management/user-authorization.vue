<template>
    <div>
        <el-card class="box-card">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form :inline="true"  class="demo-form-inline">
                        <el-col :span="5">
                            <el-select v-model="formInline.company" placeholder="公司" clearable>
                                <el-option
                                    v-for="item in companyData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                       </el-col>
                    </el-form>
                </el-col>
                 <el-col :span="6" :offset="6">
                    <el-button type="success" icon="el-icon-refresh" plain @click="Changedimension">切换维度</el-button> 
                    <el-button type="success" icon="el-icon-refresh" plain @click="remove">确定</el-button>
                 </el-col>
            </el-row>
        </el-card>
        <el-card>
            <el-row>
                <el-col :span="11">
                    <el-row>
                        <el-col :span="5" :offset="1">
                            <el-select v-model="formInline.regionleft" placeholder="请选择">
                                <el-option
                                    v-for="item in leftData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-input v-model="formInline.searchValueleft"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="success" icon="el-icon-refresh" plain @click="filterLeft">过滤</el-button>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="success" icon="el-icon-refresh" plain @click="getALLLeft">全部</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-row>
                        <el-col :span="5" :offset="1">
                            <el-select v-model="formInline.regionRight" placeholder="请选择">
                                <el-option
                                    v-for="item in rightData"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                       </el-col>
                        <el-col :span="6" :offset="1">
                            <el-input v-model="formInline.searchValueright"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="success" icon="el-icon-refresh" plain @click="filterRight">过滤</el-button>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="success" icon="el-icon-refresh" plain @click="getALLRight">全部</el-button>
                        </el-col>
                        <el-col :span="2" :offset="1">
                            <el-button type="success" icon="el-icon-refresh" plain @click="RoleSelectData">已选中</el-button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="magiantop">
                <el-col :span="11">
                    <div v-if="dimension">
                        <el-table
                            ref="userTable"
                            :data="UsertableData"
                            tooltip-effect="dark"
                            size="small"
                            border
                            style="width: 100%"
                            :row-style="rowClass"
                            @row-click="selectRow">
                            <el-table-column prop="fcode" size="small" label="登录账户" ></el-table-column>
                            <el-table-column prop="fname" size="small" label="用户名称" ></el-table-column>
                            <el-table-column prop="fcompanyoid" size="small" label="公司名称" ></el-table-column>
                        </el-table>
                        <div class="pagination" v-if="UsertableData.length >0">
                            <el-pagination
                                :total="total"
                                background
                                layout="prev, pager, next,jumper,total"
                                :page-size="pageSize"
                                @size-change="onSizeChange"
                                @current-change="onUserCurrentChange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                    <div v-else>
                        <el-table
                            ref="roleLTable"
                            :data="roleLtableData"
                            tooltip-effect="dark"
                            size="small"
                            border
                            style="width: 100%"
                            :row-style="roleLrowClass"
                            @row-click="selectroleLRow">
                            <el-table-column prop="code" size="small" label="角色编码" ></el-table-column>
                            <el-table-column prop="name" size="small" label="角色名称" ></el-table-column>
                            <el-table-column prop="company" size="small" label="公司名称" ></el-table-column>
                        </el-table>
                        <div class="pagination" v-if="roleLtableData.length >0">
                            <el-pagination
                                :total="roleLtotal"
                                background
                                layout="prev, pager, next,jumper,total"
                                @size-change="onroleLSizeChange"
                                @current-change="onroleLCurrentChange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11" :offset="1">
                    <div v-if="dimension" :class="disShowPager==true?'':'CheckTable'">
                        <dynamic-table
                            :columns="Rolecolumns"
                            :table-data="RoletableData"
                            :total="total1"
                            :page-num="pageNum1"
                            :page-size="pageSize1"
                            ref="roleTable"
                            :isShowPager="disShowPager"
                            @current-change="onRoleCurrentChange"
                            @selection-change="onRoleSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </div>
                    <div v-else :class="disShowPager==true?'':'CheckTable'">
                        <dynamic-table
                            :columns="UserLcolumns"
                            :table-data="UserLtableData"
                            :total="totalUserL"
                            :page-num="pageNum"
                            :page-size="pageSize"
                            :isShowPager="disShowPager"
                            ref="UserLTable"
                            @current-change="onUserLCurrentChange"
                            @selection-change="onUserLSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </div>
                    
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    name:'workProcess',
    components: {
      DynamicTable,
    },
    data(){
        return{
            dimension:false,
            disShowPager:true,
            companyData:new proData().company,
            formInline: {
                company:'_DefaultCompanyOId'
            },
            pageNum: 1,
            pageSize: 10,
            total: 2,
            pageNum1: 1,
            pageSize1: 10,
            total1: 2,
            totalUserL: 2,
            roleLtotal: 2,
            UsertableData:[],
            UserselectedList: [],
            UserselectedRow: [],
            roleLselectedList: [],
            roleLselectedRow: [],
            Rolecolumns: [
                {
                    type: 'selection'
                },
                {
                    key: 'code',
                    title: '角色编码'
                },
                {
                    key: 'name',
                    title: '角色名称'
                },
                {
                    key: 'company',
                    title: '公司名称'
                },
            ],
            roleLtableData:[],
            RoletableData:[],
            RoleselectData:[],
            RUserLselectData:[],
            UserLcolumns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fcode',
                    title: '登录账户'
                },
                {
                    key: 'fname',
                    title: '用户名称'
                },
                {
                    key: 'fcompanyoid',
                    title: '公司名称'
                },
            ],
            UserLtableData:[],
            leftData:[],
            rightData:[],
            UserData:[
                {
                value: '',
                label: '--'
                },
                {
                value: 'code',
                label: '登录账户'
                },
                {
                value: 'name',
                label: '用户名称'
                },
                {
                value: 'company',
                label: '公司名称'
                },
            ],
            roleData:[
                {
                value: '',
                label: '--'
                },
                {
                value: 'name',
                label: '角色名称'
                },
                {
                value: 'code',
                label: '角色编码'
                },
                {
                value: 'company',
                label: '公司名称'
                },
            ],
        }
    },
    created(){
        this.leftData=this.roleData;
        this.rightData=this.UserData;
        let fromdata={};
        fromdata.page=this.pageNum;
        fromdata.size=this.pageSize;
        this.searchRole(fromdata);
        this.getUserData(fromdata);
    },
    methods:{
        //获取人员
        getUserData(data){
            let fromdata=data;
            this.$api.management.getUserTableData(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data.rows;
                    this.UserLtableData=tableDataArr;
                    this.UsertableData=tableDataArr;
                    this.total = responsevalue.data.data.total;
                    this.totalUserL= responsevalue.data.data.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //获取角色
        searchRole(data){
            let fromdata=data;
            this.$api.RoleManagement.findRolePage(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.rows;
                    this.roleLtableData=tableDataArr;
                    this.RoletableData=tableDataArr;
                    this.total1=returndata.total;
                    this.roleLtotal=returndata.total;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //左边过滤条件
        filterLeft(){
            if(this.dimension ==true){
                let  fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                if(this.formInline.regionleft=="name"){
                    fromdata.fname=this.formInline.searchValueleft;
                }else if(this.formInline.regionleft=="code"){
                    fromdata.fcode=this.formInline.searchValueleft;
                }else if(this.formInline.regionleft=="company"){
                    fromdata.fcompanyoid=this.formInline.searchValueleft;
                }
                this.getUserData(fromdata);
            }else{
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize;
                if(this.formInline.regionleft=="name"){
                    fromdataU.name=this.formInline.searchValueleft;
                }else if(this.formInline.regionleft=="code"){
                    fromdataU.code=this.formInline.searchValueleft;
                }else if(this.formInline.regionleft=="company"){
                    fromdataU.company=this.formInline.searchValueleft;
                }
                this.searchRole(fromdataU);
            }
        },
        //右边过滤条件
        filterRight(){
            //formInline.regionRight
            //formInline.searchValueright
            if(this.dimension ==true){
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize;
                if(this.formInline.regionRight=="name"){
                    fromdataU.name=this.formInline.searchValueright;
                }else if(this.formInline.regionRight=="code"){
                    fromdataU.code=this.formInline.searchValueright;
                }else if(this.formInline.regionRight=="company"){
                    fromdataU.company=this.formInline.searchValueright;
                }
                this.searchRole(fromdataU);
            }else{
                let  fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                if(this.formInline.regionRight=="name"){
                    fromdata.fname=this.formInline.searchValueright;
                }else if(this.formInline.regionRight=="code"){
                    fromdata.fcode=this.formInline.searchValueright;
                }else if(this.formInline.regionRight=="company"){
                    fromdata.fcompanyoid=this.formInline.searchValueright;
                }
                this.getUserData(fromdata);
            }
        },
        //左边全部点击事件
        getALLLeft(){
            if(this.dimension ==true){
                let  fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                this.getUserData(fromdata);
            }else{
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize;
                this.searchRole(fromdataU);
            }
        },
        //右边全部点击事件
        getALLRight(){
            if(this.dimension ==true){
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize;
                this.searchRole(fromdataU);
            }else{
                let  fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                this.getUserData(fromdata);
            }
        },
        remove(){},
        //切换维度
        Changedimension(){
            //切换维度前清空搜索条件
            this.formInline.regionleft='';
            this.formInline.regionRight='';
            this.formInline.searchValueleft='';
            this.formInline.searchValueright='';
            //切换维度
            if(this.dimension ==true){
                this.dimension=false;
                this.leftData=this.roleData;
                this.rightData=this.UserData;
            }else{
                this.dimension=true;
                this.leftData=this.UserData;
                this.rightData=this.roleData;
            }
        },
        selectRow(row, column, event){
            this.UserselectedList=[];
            this.UserselectedList.push(row);

        },
        rowClass(data){
            if(this.UserselectedRow.includes(data.rowIndex)){
                return {"background-color":"#98F898"}
            }
        },
        //角色table行点击事件
        selectroleLRow(row, column, event){
            this.roleLselectedList=[];
            this.roleLselectedList.push(row);
            console.log(row)
            //通过角色查询用户
            let fromdata={};
            fromdata.roleId=row.id;
            this.$api.management.findUserByRoleId(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data.rows;
                    console.log(returndata)
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        roleLrowClass(data){
            if(this.roleLselectedRow.includes(data.rowIndex)){
                return {"background-color":"#98F898"}
            }
        },
        onroleLSizeChange(){},
        onroleLCurrentChange(){},
        onSizeChange(){},
        onUserCurrentChange(row){
            console.log("111")
        },
        //下一页
        onRoleCurrentChange(){

        },
        onRoleSelectionChange(data){
            this.RoleselectData=data;
        },
        //role已选中
        RoleSelectData(){
            this.RoletableData= this.RoleselectData;
        },
        onUserLCurrentChange(){

        },
        onUserLSelectionChange(data){
            this.RUserLselectData=data;
        }
    },
    watch:{
        UserselectedList(data){
            this.UserselectedRow=[];
            if(data.length > 0){
                data.forEach((item,index) => {
                    this.UserselectedRow.push(this.UsertableData.indexOf(item));
                });
            }
        },
        roleLselectedList(data){
            this.roleLselectedRow=[];
            if(data.length > 0){
                data.forEach((item,index) => {
                    this.roleLselectedRow.push(this.roleLtableData.indexOf(item));
                });
            }
        },
    }
}
</script>
<style lang="scss" scoped>
 /deep/ .el-textarea .el-input__count{
     background: #fff0;
 }
/deep/ .el-select{
    width: 100%;
}
 /deep/ .el-dropdown-menu__item{
    padding: 0;
}
.el-dropdown-link {
cursor: pointer;
color: #409EFF;
margin-right: 10px;
}
.el-icon-arrow-down {
font-size: 12px;
}
.box-card:first-child{
    margin-bottom: 16px;
}
.search-all{
    margin-left: 50px;
}
.dataForm {
    margin-top: 10px;
}
.elrowStyle {
    margin-top: 20px;
}
.elColCenter {
    text-align: center;
}
.pbackground {
    text-align: center;
    height: 30px;
    font-size: 15px;
    line-height: 30px;
    background-color: skyblue;
}
.CheckTable{
    height: 500px;
    overflow-y:auto;
}
</style>
<style lang='scss'>
.replydiag {
    .el-textarea__inner {
        min-height: 300px !important;
    }
}
.el-dialog__body{
    padding: 0;
}
.el-card__header{
    padding: 10px 20px;
}
.magiantop{
    margin-top: 20px;
}
</style>