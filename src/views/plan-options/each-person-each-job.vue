<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>一人一岗测试开始。。。。。。。。。。</div>
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
                    <el-form-item label="部门">
                        <el-input v-model="formdata.department" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="岗位" prop="name">
                        <el-input v-model="formdata.job" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="版本" prop="name">
                        <el-input v-model="formdata.version" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办人">
                        <el-input v-model="formdata.agent" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间">
                        <el-input v-model="formdata.agenttime" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="版本号">
                        <el-input v-model="formdata.versionnum" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="一岗一表行" name="first">
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
                <el-tab-pane label="经济指标" name="second">
                    <dynamic-table
                        :columns="ecoIndiColumns"
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
                <el-tab-pane label="公司指标" name="third">
                    <dynamic-table
                        :columns="comIndiColumns"
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
                <el-tab-pane label="附件" name="fourth">
                    <dynamic-table
                        :columns="attachColumns"
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
    <div>一人一岗测试结束。。。。。。。。。。</div>
    <!-- 新建一岗一表行弹窗 -->
    <el-dialog
    :title="一岗一表"
    top="20px"
    :visible.sync="peopleJobgsTableVisible"
    :close-on-click-modal="false"  
    :modal-append-to-body=false
    >
    <el-form :model="peopleTableForm" :rules="peopleTableRules" ref="peopleTableForm">
        <el-row>
            <el-col :span="5" :offset="2">
                <el-form-item label="指标库" :label-width="formLabelWidth"  prop="zhibiaoku">
                    <el-input v-model="peopleTableForm.zhibiaoku" size="small" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="zhibiaoku(peopleTableForm)"></el-button>
                </el-col>
            <el-col :span="6">
                <el-form-item label="关键指标" :label-width="formLabelWidth" prop="guanjinzhibiao">
                    <el-input v-model="peopleTableForm.guanjinzhibiao" size="small" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="子指标" :label-width="formLabelWidth" prop="zizhibiao">
                    <el-input v-model="peopleTableForm.zizhibiao" size="small" autocomplete="off"></el-input>cv     
                </el-form-item>
            </el-col>
        </el-row>
            <el-row>
            <el-col :span="6">
                <el-form-item label="指标定义" :label-width="formLabelWidth" prop="dingyizhibiao">
                    <el-input v-model="peopleTableForm.dingyizhibiao" size="small" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="考评方法" :label-width="formLabelWidth" prop="kaopingfangfa">
                    <el-input v-model="peopleTableForm.kaopingfangfa" size="small" autocomplete="off"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="22">
                <el-form-item label="备注">
                <el-input type="textarea" v-model="formdata.beizhu" :rows="5"></el-input>
            </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="peopleTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit('peopleTableForm')">确 定</el-button>
    </div>
    </el-dialog>
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
                    title: '指标库'
                },
                {
                    key: 'key2',
                    title: '关键指标'
                },
                {
                    key: 'key3',
                    title: '子指标'
                },
                {
                    key: 'key4',
                    title: '指标定义'
                },
                {
                    key: 'key5',
                    title: '指标权重'
                },
                {
                    key: 'key6',
                    title: '考评方法'
                },
                {
                    key: 'key7',
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
            ecoIndiColumns:[
                {
                    key: 'statusString',
                    title: '指标项名称'
                },
                {
                    key: 'statusString',
                    title: '指标类型'
                },
                {
                    key: 'statusString',
                    title: '指标权重'
                },
                {
                    key: 'statusString',
                    title: '指标定义'
                },
                {
                    key: 'statusString',
                    title: '考评方法'
                },
                {
                    key: 'statusString',
                    title: '备注'
                },
            ],
            comIndiColumns:[
                {
                    key: 'statusString',
                    title: '公司'
                },
                {
                    key: 'statusString',
                    title: '部门'
                },
                {
                    key: 'statusString',
                    title: '权重'
                },
                {
                    key: 'statusString',
                    title: '备注'
                },
            ],
            attachColumns:[
                {
                    key: 'statusString',
                    title: '序号'
                },
                {
                    key: 'statusString',
                    title: '名称'
                },
                {
                    key: 'statusString',
                    title: '权重'
                },
                {
                    key: 'statusString',
                    title: '备注'
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