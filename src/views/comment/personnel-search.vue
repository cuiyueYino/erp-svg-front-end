<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="45%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <div class="container">
                        <div class="search-left">
                            <el-select v-model="formdata.searchName" placeholder="" clearable disabled>
                                <el-option
                                    v-for="item in address"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="search-right">
                            <div class="fr">
                                <el-button class="sky" size="small" @click="seniorSearch" round>高级查询</el-button>
                            </div>
                        </div>
                    </div>
                    <dynamic-table
                        :columns="columns"
                        :table-data="tableData"
                        :total="total"
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        @current-change="onCurrentChange"
                        @selection-change="onSelectionChange"
                        @size-change="onSizeChange"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" icon='el-icon-copy-document' size="small" @click="savefinanceValue">提交</el-button>
                <el-button type="success" icon='el-icon-refresh' size="small" @click="refresh">刷新</el-button>
                <el-button type="warning" icon='el-icon-close' size="small" @click="handleClose">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="40%">
            <el-form
                label-width="100px"
                v-model="dialog"
                class="dataForm"
                :label-position="labelPosition"
            >
            <el-card>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="pbackground">查询条件</el-col>
                    <el-col :span="6"  class="pbackground">操作符</el-col>
                    <el-col :span="12" class="pbackground">条件值</el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">公司</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="6">
                        <el-select v-model="dialog.company" size="mini">
                            <el-option
                                v-for="item in companyoptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">编码</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="6">
                       <el-input v-model="dialog.codeNomber" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">名称</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="6">
                       <el-input v-model="dialog.name" size="mini"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">部门</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="6">
                       <el-input v-model="dialog.departmentName" size="mini"></el-input>
                    </el-col>
                    <!-- <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchDS(dialog)"></el-button>
                    </el-col> -->
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">在职状态</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="6">
                       <el-select v-model="dialog.usertype" size="mini">
                            <el-option
                                v-for="item in usertypeoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" icon='el-icon-search' size="small" @click="onHandleMoreSearch">查询</el-button>
                <el-button type="warning" icon='el-icon-close' size="small" @click="MoreSearchVisible = false">取消</el-button>
            </span>
        </el-dialog>
        <DSpage  :rowDStype="rowDStype" :rowDSDataObj="rowDSDataObj" @changeShow="showORhideForDS"/>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
import DSpage from './department-search.vue';
export default {
    props: {
        rowPSDataObj:Object,
        rowPStype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
        DSpage
    },
    inject: ['reload'],
    data(){
        return{
            title:'',
            ShowFinancVisible:false,
            MoreSearchVisible:false,
            rowDStype:false,
            disabled:false,
            checked:false,
            rowDSDataObj:{},
            pageNum: 1,
            pageSize: 10,
            total: 20,
            companyoptions:[],
            usertypeoptions:[
                {
                    label:'--',
                    value:'-1'
                },
                {
                    label:'在职',
                    value:'1'
                },
                {
                    label:'离职',
                    value:'2'
                },
            ],
            formdata:{
                searchName:'',
                company:'',
            },
            dialog:{
                name:'',
                company:'',
                codeNomber:'',
                departmentName:'',
                usertype:'',
            },
            columns: [
                {
                    type: 'selection'
                },
                {
                    key: 'code',
                    title: '编码'
                },
                {
                    key: 'department',
                    title: '部门'
                },
                {
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'firmPosition',
                    title: '职位'
                },
                {
                    key: 'remark',
                    title: '描述'
                }
            ],
            tableData:[],
            address: new proData().address,
            labelPosition: 'left',
            multipleSelection: [],
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            //返回选中的父组件选中的row,并修某些改值
            this.ShowFinancVisible = false;
            this.$emit('changeShow',this.rowPSDataObj,false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        MoreSearchDS(data){
            this.rowDStype = true;
            let finandata=data;
            finandata.finanrowname="部门缺省查询方案";
            finandata.finanrowId="QS_0033";
            finandata.nametitle=this.title;
            this.rowDSDataObj=finandata;
        },
        //控制部门查询显示
        showORhideForDS(data,type){
            if(type === false){
                this.rowDStype = false
            }else{
                this.rowDStype = true
            }
            if(data.selectOptionId){
                this.dialog.departmentName=data.selectOptionname;
                this.dialog.departmentid=data.selectOptionId;
            }
        },
        //获取发起人详细信息
        GetUSerData(data){
            let fromdata=data;

            //设置筛选条件
            let namevalueS=this.dialog.name;
            if(namevalueS && namevalueS!=''){
                fromdata.name=this.dialog.name;
            }
            let codevalueS=this.dialog.codeNomber;
            if(codevalueS && codevalueS!=''){
                fromdata.code=this.dialog.codeNomber;
            }
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                fromdata.company=this.dialog.company;
            }
            let departS=this.dialog.departmentName;
            if(departS && departS!=''){
                fromdata.department=this.dialog.departmentName;
            }
            let usertypeS=this.dialog.usertype;
            if(usertypeS && usertypeS!='-1'){
                fromdata.quit=this.dialog.usertype;
            }
            this.$api.processSet.getaddresserSearch(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data.rows;
                    this.tableData = tableDataArr;
                    this.total = returndata.data.total;
                } else {
                    this.$message.success('没有查到数据!');
                }

                this.MoreSearchVisible = false; //关闭筛选条件窗口
            });
        },
        //下一页
        onCurrentChange(val) {
            let fromdata={};
            fromdata.page=val;
            fromdata.size=this.pageSize;
            this.GetUSerData(fromdata);
        },
        //高级查询
        seniorSearch(){
            this.MoreSearchVisible = true;
        },
        //刷新
        refresh() {
            //清空筛选条件
            for(let key in this.dialog){
                this.dialog[key]  = '';
            }

            let fromdata={};
            fromdata.page=1;
            fromdata.size=10;
            this.GetUSerData(fromdata);
        },
        //获得查询结果
        onHandleMoreSearch() {
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            this.GetUSerData(fromdata);
            
            this.$api.processSet.getaddresserSearch(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data.rows;
                    this.tableData = tableDataArr;
                    this.total = returndata.data.total;
                    this.MoreSearchVisible = false;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },

        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyoptions= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
        //提交
        savefinanceValue(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    //返回选中的父组件选中的row,并修某些改值
                    this.rowPSDataObj.selectOptionCode=selectOption[0].code;
                    this.rowPSDataObj.selectOptionName=selectOption[0].name;
                    this.rowPSDataObj.selectOptionID=selectOption[0].foid;
                    this.rowPSDataObj.promoterStaffId=selectOption[0].staff;
                    this.$emit('changeShow',this.rowPSDataObj,false);
                    this.ShowFinancVisible = false;
                }
            }else{
                this.$message.error('请选择一行数据!');
            }
        }
    },
    watch:{
        rowPStype(oldVal,newVal){
            if(this.rowPStype){
            this.multipleSelection.length = 0;  //清空选择列表
            this.ShowFinancVisible=this.rowPStype;
            let rowDataObj=this.rowPSDataObj;
            this.title=rowDataObj.nametitle;
            this.formdata.searchName=rowDataObj.finanrowId;
            this.rowFincename=rowDataObj.finanrowname;
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            this.GetUSerData(fromdata);
            this.selectCom();
            }
        }
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
</style>