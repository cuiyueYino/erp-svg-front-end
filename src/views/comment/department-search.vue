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
                                <el-button class="sky" size="small" @click="MoreSearchVisible = true" round>高级查询</el-button>
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
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="savefinanceValue">提交</el-button>
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
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
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
                <el-row class="elrowStyle" size="mini">
                    <el-col :span="6" class="elColCenter">虚拟组织</el-col>
                    <el-col :span="6"  class="elColCenter">等于</el-col>
                    <el-col :span="6">
                        <el-radio v-model="dialog.radio" label="1">是</el-radio>
                        <el-radio v-model="dialog.radio" label="2">否</el-radio>
                    </el-col>
                </el-row>
            </el-card>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="MoreSearchVisible = false">取 消</el-button>
                <el-button type="primary" @click="onHandleMoreSearch">查询</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import DynamicTable from '../../components/common/dytable/dytable.vue';
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowDSDataObj:Object,
        rowDStype: Boolean
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
            companyoptions: new proData().company,
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
                    key: 'name',
                    title: '名称'
                },
                {
                    key: 'virtual',
                    title: '虚拟组织'
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
            this.$emit('changeShow',this.rowDSDataObj,false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //获取部门数据
        getdepaData(data){
            let fromdata=data;
            this.$api.processSet.getdepaSearch(fromdata).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data.rows;
                    this.tableData = tableDataArr;
                    this.total = returndata.data.total;
                    this.MoreSearchVisible=false;
                } else {
                    this.$message.success('没有查到数据!');
                }
            });
        },
        //下一页
        onCurrentChange(val) {
            let fromdata={};
            fromdata.page=val;
            fromdata.size=this.pageSize;
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
            let radioS=this.dialog.radio;
            if(radioS){
                fromdata.virtual=this.dialog.radio;
            }
            this.getdepaData(fromdata);    
        },
        //获得查询结果
        onHandleMoreSearch() {
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
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
            let radioS=this.dialog.radio;
            if(radioS){
                fromdata.virtual=this.dialog.radio;
            }
            this.getdepaData(fromdata);
        },
        //提交
        savefinanceValue(){
            let selectOption= this.multipleSelection;
            if(selectOption.length >0){
                if(selectOption.length >1){
                    this.$message.error('只能选择一行!');
                }else{
                    //返回选中的父组件选中的row,并修某些改值
                    this.rowDSDataObj.selectOptionCode=selectOption[0].code;
                    this.rowDSDataObj.selectOptionname=selectOption[0].name;
                    this.rowDSDataObj.selectOptionId=selectOption[0].foid;
                    this.$emit('changeShow',this.rowDSDataObj,false);
                    this.ShowFinancVisible = false;
                }
            }else{
                this.$message.error('请选择一行数据!');
            }
        }
    },
    watch:{
        rowDStype(oldVal,newVal){
            this.ShowFinancVisible=this.rowDStype;
            let rowDataObj=this.rowDSDataObj;
            this.title=rowDataObj.nametitle;
            this.formdata.searchName=rowDataObj.finanrowId;
            this.rowFincename=rowDataObj.finanrowname;
            this.dialog={};
            let fromdata={};
            fromdata.page=this.pageNum;
            fromdata.size=this.pageSize;
            this.getdepaData(fromdata);
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