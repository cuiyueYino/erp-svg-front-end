<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            label-width="110px"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" :disabled="true">
                            <el-option
                                v-for="item in companyData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="项目：">
                        <el-select v-model="formdata.project" value-key="value" :disabled="true">
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
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.bumen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务状态：">
                        <el-input v-model="formdata.renwuzhaungtai" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务类型：">
                        <el-input v-model="formdata.renwuleixing" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务级别：">
                        <el-input v-model="formdata.renwujibie" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1">
                    <el-form-item label="周期性任务：" ><el-checkbox v-model="formdata.checked" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label="年计划调整：" ><el-checkbox v-model="formdata.checked" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="重点级别：">
                        <el-checkbox-group v-model="focusLevelCheckList" :disabled="true">
                            <el-checkbox label="集团重点"></el-checkbox>
                            <el-checkbox label="公司重点"></el-checkbox>
                            <el-checkbox label="部门重点"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>  
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="工作名称：">
                        <el-input v-model="formdata.gongzuomingcheng" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="14" :offset="2">
                    <el-form-item label="工作标准：">
                        <el-input v-model="formdata.gongzuobiaozhun" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row>
                <el-col :span="6">
                    <el-form-item label="责任人：">
                        <el-input v-model="formdata.bumen" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="检查人：">
                        <el-input v-model="formdata.renwuzhaungtai" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="交办人：">
                        <el-input v-model="formdata.renwuleixing" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="开始时间：">
                        <el-input v-model="formdata.starttime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="完成时间：">
                        <el-input v-model="formdata.endtime" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="秘书：">
                        <el-input v-model="formdata.mishu" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                     <el-form-item label="完成情况(%)：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="是否自己完成："><el-checkbox v-model="formdata.checked" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="协办人：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" :disabled="true"></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="情况说明：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="备注：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="附件" name="first">
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
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEachPerEachTableDelayDataObj: Object,
        rowEachPerEachTableReporttype:Boolean,
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            attachColumns:[
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
            formLabelWidth: '120px',
            ShowFinancVisible:false,
            peopleJobgsTableVisible: false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            isEdit: false,
            isLook:false,
            focusLevelCheckList: ['集团重点','公司重点'],
            peopleTableForm:{
                zhibiaoku: "",
                guanjinzhibiao: "",
                zizhibiao:'',
                dingyizhibiao:'',
                kaopingfangfa:'',
                beizhu:''
            },
            tableData:[],
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
        handleClick(){

        },
        //pop框里面的新增表格行
        baseInputTable(Str) {
            alert("新增111111111");
            this.peopleJobgsTableVisible = true;
        },
        MoreSearchPS(){

        },
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
        rowEachPerEachTableReporttype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEachPerEachTableReporttype;
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