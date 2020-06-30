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
                        <el-col :span="6">
                            <el-input v-model="formInline.searchValueleft"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="2">
                            <el-button type="success" icon="el-icon-refresh" plain @click="remove">过滤</el-button>
                        </el-col>
                        <el-col :span="2" :offset="2">
                            <el-button type="success" icon="el-icon-refresh" plain @click="remove">全部</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="11" :offset="1">
                    <el-row>
                        <el-col :span="6">
                            <el-input v-model="formInline.searchValueright"></el-input>
                        </el-col>
                        <el-col :span="2" :offset="2">
                            <el-button type="success" icon="el-icon-refresh" plain @click="remove">过滤</el-button>
                        </el-col>
                        <el-col :span="2" :offset="2">
                            <el-button type="success" icon="el-icon-refresh" plain @click="remove">全部</el-button>
                        </el-col>
                        <el-col :span="2" :offset="2">
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
                            <el-table-column prop="name" size="small" label="用户名称" ></el-table-column>
                            <el-table-column prop="Comname" size="small" label="公司名称" ></el-table-column>
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
                            <el-table-column prop="fcode" size="small" label="角色编码" ></el-table-column>
                            <el-table-column prop="name" size="small" label="角色名称" ></el-table-column>
                            <el-table-column prop="Comname" size="small" label="公司名称" ></el-table-column>
                        </el-table>
                        <div class="pagination" v-if="roleLtableData.length >0">
                            <el-pagination
                                :total="roleLtotal"
                                background
                                layout="prev, pager, next,jumper,total"
                                :page-size="roleLpageSize"
                                @size-change="onroleLSizeChange"
                                @current-change="onroleLCurrentChange"
                            >
                            </el-pagination>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11" :offset="1">
                    <div v-if="dimension">
                        <dynamic-table
                            :columns="Rolecolumns"
                            :table-data="RoletableData"
                            :total="total1"
                            :page-num="pageNum1"
                            :page-size="pageSize1"
                            ref="roleTable"
                            @current-change="onRoleCurrentChange"
                            @selection-change="onRoleSelectionChange"
                            v-loading="false"
                            element-loading-text="加载中"
                        ></dynamic-table>
                    </div>
                    <div v-else>
                        <dynamic-table
                            :columns="UserLcolumns"
                            :table-data="UserLtableData"
                            :total="totalUserL"
                            :page-num="pageNum"
                            :page-size="pageSize"
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
            companyData:new proData().company,
            formInline: {
                company:'_DefaultCompanyOId'
            },
            pageNum: 1,
            pageSize: 10,
            total: 2,
            pageNum1: 1,
            pageSize1: 10,
            roleLpageSize: 10,
            total1: 2,
            totalUserL: 2,
            roleLtotal: 2,
            UsertableData:[
                {
                    fcode:'001',
                    name:'李敏',
                    Comname:'福佳'
                },
                {
                    fcode:'002',
                    name:'许小树',
                    Comname:'石化'
                },
                {
                    fcode:'003',
                    name:'徐婷婷',
                    Comname:'芳烃'
                },
            ],
            UserselectedList: [],
            UserselectedRow: [],
            roleLselectedList: [],
            roleLselectedRow: [],
            Rolecolumns: [
                {
                    type: 'selection'
                },
                {
                    key: 'fcode',
                    title: '角色编码'
                },
                {
                    key: 'name',
                    title: '角色名称'
                },
                {
                    key: 'Cname',
                    title: '公司名称'
                },
            ],
            roleLtableData:[
                 {
                    fcode:'001',
                    name:'管理员',
                    Cname:'福佳'
                },
                {
                    fcode:'002',
                    name:'资产管理',
                    Cname:'石化'
                },
                {
                    fcode:'003',
                    name:'会计',
                    Cname:'芳烃'
                },
            ],
            RoletableData:[
                 {
                    fcode:'001',
                    name:'管理员',
                    Cname:'福佳'
                },
                {
                    fcode:'002',
                    name:'资产管理',
                    Cname:'石化'
                },
                {
                    fcode:'003',
                    name:'会计',
                    Cname:'芳烃'
                },
            ],
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
                    key: 'name',
                    title: '用户名称'
                },
                {
                    key: 'Cname',
                    title: '公司名称'
                },
            ],
            UserLtableData:[
                {
                    fcode:'001',
                    name:'李敏',
                    Comname:'福佳'
                },
                {
                    fcode:'002',
                    name:'许小树',
                    Comname:'石化'
                },
                {
                    fcode:'003',
                    name:'徐婷婷',
                    Comname:'芳烃'
                },
            ],
        }
    },
    methods:{
        remove(){},
        //切换维度
        Changedimension(){
            if(this.dimension ==true){
                this.dimension=false;
            }else{
                this.dimension=true;
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
        selectroleLRow(row, column, event){
            this.roleLselectedList=[];
            this.roleLselectedList.push(row);
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