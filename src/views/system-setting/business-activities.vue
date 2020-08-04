<template>
    <div>
        <el-dialog :title="title" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="40%">
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
        <el-dialog :title="title" :visible.sync="MoreSearchVisible" :append-to-body="true" v-if="MoreSearchVisible" :close-on-click-modal="false" width="30%">
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
                    <el-col :span="6" class="elColCenter">编码</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.code"></el-input>
                    </el-col>
                </el-row>
                <el-row class="elrowStyle">
                    <el-col :span="6" class="elColCenter">名称</el-col>
                    <el-col :span="6"  class="elColCenter">左右匹配</el-col>
                    <el-col :span="8">
                       <el-input v-model="dialog.name"></el-input>
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
        rowBADataObj:Object,
        rowBAtype: Boolean
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
            labelPosition: 'left',
            rowFincename:'',
            companyoptions: new proData().company,
            formdata:{
                searchName:'',
                company:'',
            },
            dialog:{
                name:'',
                company:'',
                code:'',
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
                    key: 'fremark',
                    title: '描述'
                }
            ],
            tableData:[],
            multipleSelection:[],
            address: [
                {
                    value: 'QS_0005',
                    label: '业务活动查询方案'
                },
                {
                    value: 'E10704181645156201',
                    label: '业务活动查询方案_不带工作类型'
                },
            ],
        }
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            //返回选中的父组件选中的row,并修某些改值
            this.ShowFinancVisible = false;
            this.$emit('changeShow',this.rowBADataObj,false);
        },
        //选中数据改变
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //下一页
        onCurrentChange(val) {
            let formDataA ={};
            formDataA.page=val;
            formDataA.size=this.pageSize;
            this.getActivity(formDataA);
        },
        //提交
        savefinanceValue(){
            let SelectData=this.multipleSelection;
            if(SelectData.length > 1){
                this.$message.error("只能选择一个!");
            }else{
                if(SelectData[0]){
                    this.rowBADataObj.selectBADataObj=SelectData[0];
                    this.$emit('changeShow',this.rowBADataObj,false);
                }else{
                    this.$message.error("请选择一行数据!");
                }
            }
        },
        //高级查询
        onHandleMoreSearch(){
            let formDataA ={};
            formDataA.page=this.pageNum;
            formDataA.size=this.pageSize;
            if(this.dialog.code){
                formDataA.fcode=this.dialog.code;
            }
            if(this.dialog.name){
                formDataA.fname=this.dialog.name;
            }
            this.getActivity(formDataA);
        },
        //获取业务活动
        getActivity(data){
            let formDataA =data;
            this.$api.SystemSet.getProcessActivity(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data.rows;
                    this.tableData = tableDataArr;
                    this.total=returndata.data.total;
                } else {
                    this.$message.success('查询失败!');
                }
            })
        }
    },
    watch:{
        rowBAtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowBAtype;
            let rowDataObj=this.rowBADataObj;
            this.title=rowDataObj.nametitle;
            this.formdata.searchName=rowDataObj.finanrowId;
            this.rowFincename=rowDataObj.finanrowname;
            let formData ={};
            formData.page=this.pageNum;
            formData.size=this.pageSize;
            this.getActivity(formData);
        }
    }
}
</script>
<style lang='scss' scoped>
.el-form-item__label {
    text-align: left;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.topinput {
    width: 100px;
}
.topselect {
    width: 242px;
}
.datatable {
    margin-top: 20px;
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