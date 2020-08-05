<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>员工考评表汇总开始。。。。。。。。。。</div>
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            :rules="rules"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="12">
                    <el-form-item label="公司" prop="company">
                        <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
                            <el-option
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="单据号" prop="name">
                        <el-input v-model="formdata.code" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年度" prop="name">
                        <el-input v-model="formdata.bumen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份" prop="name">
                        <el-input v-model="formdata.gangwei" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经经办日期">
                        <el-input v-model="formdata.nianfen" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="汇总部门" prop="name">
                        <el-input type="textarea" v-model="formdata.huizongbumen" :rows="3" disabled></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click=""></el-button>  
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="不参与考评人员" prop="name">
                        <el-input type="textarea" v-model="formdata.bucanyukaopingrenyuan" :rows="3" disabled></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click=""></el-button>  
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="汇总说明">
                        <el-input type="textarea" v-model="formdata.huizongshuoming" :rows="3" disabled></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click=""></el-button>  
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="汇总部门明细行" name="first">
                    <dynamic-table
                        :columns="columns"
                        :table-data="tableData"
                        :total="total"
                        size="mini"
                        :isShowPager="false"    
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                    <el-row>
                        <el-col :span="5">
                            <el-button size="small" :disabled="isLook"  v-show="!isEdit" type="success" plain @click="baseInputTable('新增一岗一表')">新增</el-button>
                            <el-button size="small" :disabled="isLook" type="danger" plain @click="deleteRow()">删除</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="附件" name="second">
                    <dynamic-table
                        :columns="attachmentColumns"
                        :table-data="tableData"
                        :total="total"
                        size="mini"
                        :isShowPager="false"
                        ref="multipleTable"
                        :page-num="pageNum"
                        :page-size="pageSize"
                        v-loading="false"
                        element-loading-text="加载中"
                    ></dynamic-table>
                </el-tab-pane>
            </el-tabs> 
            
        </el-form>
    <div>员工考评表汇总结束。。。。。。。。</div>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEACHPerEachJobDataObj: Object,
        rowEACHPerEachJobtype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            columns:[
                {
                    key: 'key1',
                    title: '部门名称'
                },
                {
                    key: 'key2',
                    title: '部门编码'
                },
                {
                    key: 'key3',
                    title: '备注'
                },
            ],
            peopleTableForm:{
                zhibiaoku: "",
                guanjinzhibiao: "",
                zizhibiao:'',
                dingyizhibiao:'',
                kaopingfangfa:'',
                beizhu:''
            },
            attachmentColumns:[
                {
                    key: 'key1',
                    title: '序号'
                },
                {
                    key: 'key2',
                    title: '名称'
                },
                {
                    key: 'key3',
                    title: '操作'
                },
            ],
            tableData:[],
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            },
            peopleTableRules:{
                zhibiaoku: [
                { required: true, message: "请输入xxxxxx", trigger: "blur" }
                ],
                guanjinzhibiao: [
                { required: true, message: "请输入xxxxxxxxxx", trigger: "blur" }
                ],
                zizhibiao: [
                { required: true, message: "请输入xxxxxx", trigger: "blur" }
                ],
            },
        }
    },
    methods: {
        //pop框里面的新增表格行
        baseInputTable(Str) {
            alert("新增111111111");
            this.peopleJobgsTableVisible = true;
        },
        MoreSearchPS(){

        },
        handleClick(){

        }
    },
    watch:{
        //新建一岗一表行数据清空
        peopleJobgsTableVisible(val){
            switch (val) {
                case false:
                    this.$refs['peopleTableForm'].resetFields();
                    this.checked = false;
                break;
            
                default:
                break;
            }
            },
        rowEACHPerEachJobtype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEACHPerEachJobtype;
        }
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
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