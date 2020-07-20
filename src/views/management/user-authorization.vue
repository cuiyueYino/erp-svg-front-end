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
                    <el-button type="success" icon="el-icon-refresh" plain @click="determineSave">确定</el-button>
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
                            <el-button type="success" icon="el-icon-refresh" plain @click="RightSelecT">已选中</el-button>
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
                                @current-change="onroleLCurrentChange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11" :offset="1">
                    <div v-if="dimension" class="CheckTable">
                        <el-table
                            ref="roleTable"
                            :data="RoletableData"
                            tooltip-effect="dark"
                            size="small"
                            border
                            style="width: 100%"
                            @select="onRoleSelectionChange">
                            <el-table-column type="selection" min-width="5%"></el-table-column>
                            <el-table-column prop="code" size="small" label="角色编码" ></el-table-column>
                            <el-table-column prop="name" size="small" label="角色名称" ></el-table-column>
                            <el-table-column prop="company" size="small" label="公司名称" ></el-table-column>
                        </el-table>
                        <div class="pagination" v-if="RoletableData.length >0">
                            <el-pagination
                                :total="total1"
                                background
                                layout="prev, pager, next,jumper,total"
                                @current-change="onRoleCurrentChange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                    <div v-else class="CheckTable">
                        <el-table
                            ref="UserLTable"
                            :data="UserLtableData"
                            tooltip-effect="dark"
                            size="small"
                            border
                            style="width: 100%"
                            @select="onUserLSelectionChange">
                            <el-table-column type="selection" min-width="5%"></el-table-column>
                            <el-table-column prop="fcode" size="small" label="登录账户" ></el-table-column>
                            <el-table-column prop="fname" size="small" label="用户名称" ></el-table-column>
                            <el-table-column prop="company" size="small" label="公司名称" ></el-table-column>
                        </el-table>
                        <div class="pagination" v-if="UserLtableData.length >0">
                            <el-pagination
                                :total="totalUserL"
                                background
                                layout="prev, pager, next,jumper,total"
                                @current-change="onUserLCurrentChange"
                            >
                            </el-pagination>
                        </div>
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
            ALLSelectFlage:false,
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
            pageSize2: 10,
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
                    title: ''
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
        let fromdataU={};
        fromdataU.page=this.pageNum;
        fromdataU.size=this.pageSize;
        this.getUserData(fromdataU);
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
                    if(this.dimension === false){
                        this.$nextTick(() => {
                            // 在这里面去设置人员选中
                            this.selectRUserRow();
                        });
                    }
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //通过ID字符串查用户
        getUserDataByID(data,total){
            let fromdata=data;
            this.$api.management.getUserByIds(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.UserLtableData=tableDataArr;
                    this.UsertableData=tableDataArr;
                    this.total = total;
                    this.totalUserL= total;
                    if(this.dimension === false){
                        this.$nextTick(() => {
                            // 在这里面去设置人员选中
                            this.selectRUserRow();
                        });
                    }
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
                    if(this.dimension){
                        this.$nextTick(() => {
                            // 在这里面去设置角色选中
                            this.selectRRoleRow();
                        });
                    }
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        //左边过滤条件
        filterLeft(){
            this.ALLSelectFlage=false;
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
            this.disShowPager=true;
            this.ALLSelectFlage=false;
            if(this.dimension ==true){
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize1;
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
                fromdata.size=this.pageSize2;
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
            this.ALLSelectFlage=false;
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
            this.ALLSelectFlage=false;
            this.disShowPager=true;
            if(this.dimension ==true){
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize1;
                this.searchRole(fromdataU);
            }else{
                let  fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize2;
                this.getUserData(fromdata);
            }
        },
        //切换维度
        Changedimension(){
            this.disShowPager=true;
            this.ALLSelectFlage=false;
            //切换维度前清空搜索条件
            this.formInline.regionleft='';
            this.formInline.regionRight='';
            this.formInline.searchValueleft='';
            this.formInline.searchValueright='';
            this.UserselectedList=[];
            this.UserselectedRow=[];
            this.roleLselectedList=[];
            this.roleLselectedRow=[];
            this.RUserLselectData=[];
            this.RoleselectData=[];
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
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            this.searchRole(fromdata);
            let fromdataU={};
            fromdataU.page=this.pageNum;
            fromdataU.size=this.pageSize;
            this.getUserData(fromdataU);
        },
        //左侧人员table行点击事件
        selectRow(row, column, event){
            this.UserselectedList=[];
            this.UserselectedList.push(row);
            //通过用户查询角色
            this.RoleselectData=[];
            let fromdata={};
            fromdata.userId=row.foid;
            this.$api.management.findRoleByUserId(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.RoleselectData=tableDataArr;
                    this.$nextTick(() => {
                        // 在这里面去设置角色选中
                        this.selectRRoleRow();
                    });
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        },
        rowClass(data){
            if(this.UserselectedRow.includes(data.rowIndex)){
                return {"background-color":"#98F898"}
            }
        },
        //左侧角色table行点击事件
        selectroleLRow(row, column, event){
            this.roleLselectedList=[];
            this.roleLselectedList.push(row);
            //通过角色查询用户
            this.RUserLselectData=[];
            let fromdata={};
            fromdata.roleId=row.id;
            this.$api.management.findUserByRoleId(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.RUserLselectData=tableDataArr;
                    this.$nextTick(() => {
                        // 在这里面去设置人员选中
                        this.selectRUserRow();
                    });
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
        //左侧角色分页下一页
        onroleLCurrentChange(val){
            let  fromdataU={};
            fromdataU.page=val;
            fromdataU.size=this.pageSize;
            if(this.formInline.regionleft=="name"){
                fromdataU.name=this.formInline.searchValueleft;
            }else if(this.formInline.regionleft=="code"){
                fromdataU.code=this.formInline.searchValueleft;
            }else if(this.formInline.regionleft=="company"){
                fromdataU.company=this.formInline.searchValueleft;
            }
            if(this.ALLSelectFlage==true){
                let RoleRSelect=this.RoleselectData;
                fromdataU.roleIds=RoleRSelect;
            }
            this.searchRole(fromdataU);
        },
        //左侧人员分页下一页
        onUserCurrentChange(val){
            if(this.ALLSelectFlage===true){
                this.UserSelectDataPage(val,this.pageSize,this.RUserLselectData);
            }else{
                let  fromdata={};
                fromdata.page=val;
                fromdata.size=this.pageSize;
                if(this.formInline.regionleft=="name"){
                    fromdata.fname=this.formInline.searchValueleft;
                }else if(this.formInline.regionleft=="code"){
                    fromdata.fcode=this.formInline.searchValueleft;
                }else if(this.formInline.regionleft=="company"){
                    fromdata.fcompanyoid=this.formInline.searchValueleft;
                }
                this.getUserData(fromdata);
            }
        },
        //右侧角色下一页
        onRoleCurrentChange(val){
            let  fromdataU={};
            fromdataU.page=val;
            fromdataU.size=this.pageSize1;
            if(this.formInline.regionRight=="name"){
                fromdataU.name=this.formInline.searchValueright;
            }else if(this.formInline.regionRight=="code"){
                fromdataU.code=this.formInline.searchValueright;
            }else if(this.formInline.regionRight=="company"){
                fromdataU.company=this.formInline.searchValueright;
            }
            if(this.ALLSelectFlage==true){
                let RoleRSelect=this.RoleselectData;
                fromdataU.roleIds=RoleRSelect;
            }
            this.searchRole(fromdataU);
        },
        //右侧角色选中事件
        onRoleSelectionChange(data,val){
            this.getRRoleSelectedList(val.id);
        },
        //右侧已选中点击事件
        RightSelecT(){
            this.ALLSelectFlage=true;
            if(this.dimension ==true){
                let  fromdataU={};
                fromdataU.page=this.pageNum;
                fromdataU.size=this.pageSize1;
                let RoleRSelect=this.RoleselectData;
                fromdataU.roleIds=RoleRSelect;
                this.searchRole(fromdataU);
            }else{
                this.UserSelectDataPage(this.pageNum,this.pageSize,this.RUserLselectData);
            }
        },
        //人员已选中处理分页
        UserSelectDataPage(pageNum,size,data){
            let USerSelectData=[];
            USerSelectData=data;
            let UserIDStr='';
            for(var i=0;i<USerSelectData.length;i++){
                if(i>=(pageNum-1)*size && i<(pageNum*size)){
                    UserIDStr+=USerSelectData[i]+",";
                }
            }
            UserIDStr=UserIDStr.slice(0,UserIDStr.length-1);
            let  fromdataU={};
            fromdataU.userIds=UserIDStr;
            this.getUserDataByID(fromdataU,USerSelectData.length);
        },
        //右侧角色选中去重
        getRRoleSelectedList(id){
            var hasId = false;
            for (var i = 0; i < this.RoleselectData.length; i++) {
                var item = this.RoleselectData[i];
                if (id == item) {
                    this.RoleselectData[i] = '';
                    hasId = true;
                }
            }
            if (!hasId) {
                this.RoleselectData[this.RoleselectData.length] = id;
            }
        },
        //右侧角色添加默认选中
        selectRRoleRow() {
            this.$refs.roleTable.clearSelection();
            this.RoletableData.forEach(row => {
                if (this.RoleselectData.includes(row.id)) {
                    this.$refs.roleTable.toggleRowSelection(row);
                }
            });
        },
        //右侧人员下一页
        onUserLCurrentChange(val){
            if(this.ALLSelectFlage===true){
                this.UserSelectDataPage(val,this.pageSize,this.RUserLselectData);
            }else{
                let fromdata={};
                fromdata.page=val;
                fromdata.size=this.pageSize2;
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
        //右侧人员选中事件
        onUserLSelectionChange(data,val){
            this.getRUserSelectedList(val.foid);
        },
        //右侧人员选中去重
        getRUserSelectedList(id){
            var hasId = false;
            for (var i = 0; i < this.RUserLselectData.length; i++) {
                var item = this.RUserLselectData[i];
                if (id == item) {
                    this.RUserLselectData[i] = '';
                    hasId = true;
                }
            }
            if (!hasId) {
                this.RUserLselectData[this.RUserLselectData.length] = id;
            }
        },
        //右侧人员添加默认选中
        selectRUserRow() {
            this.$refs.UserLTable.clearSelection();
            this.UserLtableData.forEach(row => {
                if (this.RUserLselectData.includes(row.foid)) {
                    this.$refs.UserLTable.toggleRowSelection(row);
                }
            });
        },
        //确认提交事件
        determineSave(){
            this.ALLSelectFlage=false;
            if(this.dimension ==true){
                //给人员授权角色
                let UserSelect =this.UserselectedList;
                let RoleRSelect=this.RoleselectData;
                if(UserSelect.length >0){
                    if(RoleRSelect.length >0){
                        let UserID=UserSelect[0].foid;
                        let RoleID=[];
                        for(var i=0;i<RoleRSelect.length;i++){
                            if(RoleRSelect[i]){
                                RoleID.push(RoleRSelect[i])
                            }
                        }
                        let fromdata={};
                        fromdata.roleIds=RoleID;
                        fromdata.userId=UserID;
                        this.$api.management.userAuthRole(fromdata).then(response => {
                            let responsevalue = response;
                            if (responsevalue.data.data=="success") {
                                this.$message.success('授权成功!');
                                this.disShowPager=true;
                            } else {
                                this.$message.error(responsevalue.data.msg);
                            }
                        });
                    }else{
                        this.$message.error('请选择角色数据!');     
                    }
                }else{
                    this.$message.error('请选择一行人员数据!');
                }
            }else{
                //给角色授权人员
                let RoleSelect =this.roleLselectedList;
                let UserRSelect=this.RUserLselectData;
                if(RoleSelect.length >0){
                    if(UserRSelect.length >0){
                        let roleID=RoleSelect[0].id;
                        let UserID=[];
                        for(var i=0;i<UserRSelect.length;i++){
                            if(UserRSelect[i]){
                                UserID.push(UserRSelect[i])
                            }
                        }
                        let FormData={};
                        FormData.roleId=roleID;
                        FormData.userIds=UserID;
                        this.$api.management.roleAuthUser(FormData).then(response => {
                            let responsevalue = response;
                            if (responsevalue.data.data=="success") {
                                this.$message.success('授权成功!');
                                this.disShowPager=true;
                            } else {
                                this.$message.error(responsevalue.data.msg);
                            }
                        });
                    }else{
                        this.$message.error('请选择人员数据!');     
                    }
                }else{
                    this.$message.error('请选择一行角色数据!');
                }
            }
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