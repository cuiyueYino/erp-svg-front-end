<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="60%">
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
                                <el-button class="sky" size="medium" @click="MoreSearchVisible = true" round>高级查询</el-button>
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
                <el-button type="success" icon='el-icon-copy-document' size="medium" @click="savefinanceValue">提交</el-button>
                <el-button type="warning" icon='el-icon-close' size="medium" @click="handleClose">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog :title="title" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="50%">
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
                        <el-select v-model="dialog.company">
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
                       <el-input v-model="dialog.codeNomber"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">名称</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="6">
                       <el-input v-model="dialog.name"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">状态</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="6">
                        <el-select v-model="dialog.fstatus">
                            <el-option
                                v-for="item in usertypeoptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">职务类型</el-col>
                    <el-col :span="6" class="elColCenter">等于</el-col>
                    <el-col :span="6">
                        <el-select v-model="dialog.fpositioncategory">
                            <el-option
                                v-for="item in jobtypeoptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" icon='el-icon-search' size="medium" @click="onHandleMoreSearch">查询</el-button>
                <el-button type="warning" icon='el-icon-close' size="medium" @click="MoreSearchVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowDUTSDataObj:Object,
        rowDUTStype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data(){
        return{
            title:'',
            ShowFinancVisible:false,
            MoreSearchVisible:false,
            disabled:false,
            checked:false,
            pageNum: 1,
            pageSize: 10,
            total: 20,
            companyoptions:[],
            jobtypeoptions:[
                {
                    code:'--',
                    name:'--'
                },
                {
                    code:'ZW001',
                    name:'管理'
                },
                {
                    code:'ZW002',
                    name:'非管理'
                },
            ],
            usertypeoptions:[
                {
                    label:'--',
                    value:'-1'
                },
                {
                    label:'保存',
                    value:'1'
                },
                {
                    label:'提交',
                    value:'2'
                },
                {
                    label:'有效',
                    value:'3'
                },
                {
                    label:'回收',
                    value:'4'
                },
                {
                    label:'作废',
                    value:'7'
                },
                {
                    label:'关闭',
                    value:'8'
                },
                {
                    label:'退房',
                    value:'9'
                },
                {
                    label:'已变更',
                    value:'10'
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
            },
            columns: [
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
                    key: 'fstatus',
                    title: '职务类型'
                },
                {
                    key: 'fremark',
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
            this.$emit('changeShow',this.rowDUTSDataObj,false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {
            let fromdata={};
            fromdata.page=val;
            fromdata.size=this.pageSize;
            let namevalueS=this.dialog.name;
            if(namevalueS && namevalueS!=''){
                fromdata.fname=this.dialog.name;
            }
            let codevalueS=this.dialog.codeNomber;
            if(codevalueS && codevalueS!=''){
                fromdata.fcode=this.dialog.codeNomber;
            }
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                fromdata.fcompanyoid=this.dialog.company;
            }
            let fstatusS=this.dialog.fstatus;
            if(fstatusS && fstatusS!=''){
                fromdata.fstatus=this.dialog.fstatus;
            }
            let fpostype=this.dialog.fpositioncategory;
            if(fpostype && fpostype!=''){
                fromdata.fpositioncategory=this.dialog.fpositioncategory;
            }
            this.$api.jobUserManagement.getTableData(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data.data;
                    let tableDataArr=returndata.rows;
                    this.tableData = tableDataArr;
                    for (let i in this.tableData) {
                        switch (this.tableData[i].fstatus) {
                        case 3:
                            this.tableData[i].fstatus = "有效";
                            break;
                        case 8:
                            this.tableData[i].fstatus = "禁用";
                            break;
                        default:
                            break;
                        }
                    }
                    this.total = returndata.total;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        //获得查询结果
        onHandleMoreSearch() {
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            let namevalueS=this.dialog.name;
            if(namevalueS && namevalueS!=''){
                fromdata.fname=this.dialog.name;
            }
            let codevalueS=this.dialog.codeNomber;
            if(codevalueS && codevalueS!=''){
                fromdata.fcode=this.dialog.codeNomber;
            }
            let compvalueS=this.dialog.company;
            if(compvalueS && compvalueS!=''){
                fromdata.fcompanyoid=this.dialog.company;
            }
            let fstatusS=this.dialog.fstatus;
            if(fstatusS && fstatusS!=''){
                fromdata.fstatus=this.dialog.fstatus;
            }
            let fpostype=this.dialog.fpositioncategory;
            if(fpostype && fpostype!=''){
                fromdata.fpositioncategory=this.dialog.fpositioncategory;
            }
            this.$api.jobUserManagement.getTableData(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data.data;
                    let tableDataArr=returndata.rows;
                    this.tableData = tableDataArr;
                    for (let i in this.tableData) {
                        switch (this.tableData[i].fstatus) {
                        case 3:
                            this.tableData[i].fstatus = "有效";
                            break;
                        case 8:
                            this.tableData[i].fstatus = "禁用";
                            break;
                        default:
                            break;
                        }
                    }
                    this.total = returndata.total;
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
                    this.rowDUTSDataObj.awardcreditbreed=selectOption[0].fcode;
                    this.rowDUTSDataObj.awardcreditbreedname=selectOption[0].fname;
                    this.rowDUTSDataObj.awardcreditbreedId=selectOption[0].foid;
                    this.$emit('changeShow',this.rowDUTSDataObj,false);
                    this.ShowFinancVisible = false;
                }
            }else{
                this.$message.error('请选择一行数据!');
            }
        },
    },
    watch:{
        rowDUTStype(oldVal,newVal){
            if(this.rowDUTStype){
                this.ShowFinancVisible=this.rowDUTStype;
                let rowDataObj=this.rowDUTSDataObj;
                this.title=rowDataObj.nametitle;
                this.formdata.searchName=rowDataObj.finanrowId;
                this.rowFincename=rowDataObj.finanrowname;
                this.dialog={};
                this.selectCom();
                let fromdata={};
                fromdata.page=this.pageNum;
                fromdata.size=this.pageSize;
                this.$api.jobUserManagement.getTableData(fromdata).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data.data;
                        let tableDataArr=returndata.rows;
                        this.tableData = tableDataArr;
                        for (let i in this.tableData) {
                            switch (this.tableData[i].fstatus) {
                            case 3:
                                this.tableData[i].fstatus = "有效";
                                break;
                            case 8:
                                this.tableData[i].fstatus = "禁用";
                                break;
                            default:
                                break;
                            }
                        }
                        this.total = returndata.total;
                    } else {
                        this.$message.success('没有查到数据!');
                    }
                });
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
