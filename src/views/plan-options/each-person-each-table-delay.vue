<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
    <div>一人一表任务表（延期功能）开始。。。。。。。。。。</div>
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
                        <el-input v-model="formdata.bumen" disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务状态：">
                        <el-input v-model="formdata.renwuzhaungtai" disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务类型：">
                        <el-input v-model="formdata.renwuleixing" disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务级别：">
                        <el-input v-model="formdata.renwujibie" disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1">
                    <el-form-item label="周期性任务：" ><el-checkbox v-model="formdata.checked" disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="2">
                    <el-form-item label="年计划调整：" ><el-checkbox v-model="formdata.checked" disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="9" :offset="2">
                    <el-form-item label="重点级别：">
                        <el-checkbox-group v-model="focusLevelCheckList" disabled="true">
                            <el-checkbox label="集团重点"></el-checkbox>
                            <el-checkbox label="公司重点"></el-checkbox>
                            <el-checkbox label="部门重点" disabled></el-checkbox>
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
                <el-col :span="6">
                    <el-form-item label="原完成时间："> 
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="延期完成时间：" :label-width="formLabelWidth">
                        <el-date-picker
                            clearable
                            v-model="formdata.fenddate"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            size="small"
                            placeholder="选择日期"
                            style="width: 100%;"
                            :disabled="false"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="考核指标(%)：">
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="是否开会"><el-checkbox v-model="formdata.checked" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="拟定开会时间：" :label-width="formLabelWidth">
                        <el-date-picker
                            clearable
                            v-model="formdata.fenddate"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            size="small"
                            placeholder="选择日期"
                            style="width: 100%;"
                            :disabled="true"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="解决方案：" >
                        <el-input v-model="formdata.text1" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    :span-method="objectSpanMethod"
                    :data="tableFirstData"
                    height="250"
                    border
                    style="width: 100%">
                        <el-table-column
                        prop="number"
                        label="序号"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="参数名称"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="num"
                        label="数值">
                        </el-table-column>
                        <el-table-column
                        prop="unit"
                        label="单位">
                        </el-table-column>
                </el-table>
            </el-row>
            <el-row class="table-bottom">
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
    <div>一人一表任务表（延期功能）结束。。。。。。。。</div>
    </div>
    
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEachPerEachTableDelayDataObj: Object,
        rowEachPerEachTableDelaytype:Boolean,
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
            tableFirstData:[
                {
                    number: '计划值',
                    name: 'Q 累计预计计划完成指标',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'F 价差完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'J 客户提出偏差数价差完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'H 离职人数',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'N 实际综合费率/问卷得分/期权平均完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'O 前月及本月末在编人数和',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'P 实际完成值、巡检、检查、走访等每日或每天进行的工作次数、累计完成金额、实支物流费、实际价差、实际到货量、实际发货量、当月受载期内抵达装货港船舶数量',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'X 最终偏差数价差完成率',
                    num: '',
                    unit: '',
                }, 
                {
                    number: '实际填入值',
                    name: 'Y 出错/失误次数/超期时数（小时或天）',
                    num: '',
                    unit: '',
                }, 
            ],
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
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === 1) {
                    return {
                    rowspan: 8,
                    colspan: 1
                    };
                } else if (rowIndex === 0) {
                return {
                    rowspan: 1,
                    colspan: 1
                    };
                } else {
                    return {
                    rowspan: 0,
                    colspan: 0
                    };
                }
            }
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
        rowEachPerEachTableDelaytype(oldVal,newVal){
            this.ShowFinancVisible=this.rowEachPerEachTableDelaytype;
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
.table-bottom {
    margin-top:18px;
}
</style>