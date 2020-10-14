<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
        <el-form
            :label-width="formLabelWidth"
            v-model="formdata"
            class="dataForm"
            size="mini"
            :model="formdata"
            :label-position="labelPosition"
             :disabled="!disFlag"
        >
            <el-row>
                <el-col :span="6">
                    <el-form-item label="公司：">
                        <el-select v-model="formdata.company" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in companyData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="员工考评编号：">
                        <el-input v-model="formdata.voucherId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="部门：">
                        <el-input v-model="formdata.departmentName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="岗位：">
                        <el-input v-model="formdata.positionName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="姓名：">
                        <el-input v-model="formdata.name" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="年份：">
                        <el-select v-model="formdata.year" value-key="value" :disabled="true">
                            <el-option  
                                v-for="item in yearsData"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="月份：">
                        <el-input v-model="formdata.month" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="版本：">
                        <el-input v-model="formdata.version" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="大学生：" ><el-checkbox v-model="formdata.collegeStudent" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="试用期：" ><el-checkbox v-model="formdata.newRecruits" :disabled="true"></el-checkbox></el-form-item>
                </el-col>
            </el-row>
            <el-row>
                 <el-col :span="6">
                    <el-form-item label="总分：">
                        <el-input v-model="formdata.score" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="指标比例：">
                        <el-input v-model="formdata.biliName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-tabs v-model="atctiveName" @tab-click="handleClick">
                <el-tab-pane label="指标关联任务" name="first">
                    <el-table :data="item.List" border v-for="(item,i) in taskLine" row-key="id">
                        <el-table-column prop="index"
                            label="" 
                            type="expand">
                            <template slot-scope="props">
                                <el-table
                                    :data="[]"
                                    border
                                    >
                                   <el-table-column
                                        prop="taskType"
                                        label="任务类型"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="taskLevel"
                                        label="任务级别"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="workName"
                                        label="任务名称"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="beginDate"
                                        label="开始时间"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="endDate"
                                        label="结束时间"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="responsibleName"
                                        label="责任人"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="assignerName"
                                        label="交办人"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="examiner"
                                        label="检查人"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="responsible"
                                        label="责任人ID"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="assigner"
                                        label="交办人ID"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="completion"
                                        label="完成情况"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="pvalue"
                                        label="P值"
                                        >
                                    </el-table-column>
                                    <el-table-column
                                        prop="planFinish"
                                        label="Q值"
                                        >
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="kpx"
                            label="考评项" 
                            >
                        </el-table-column>
                        <el-table-column
                            prop="zbdy"
                            label="指标定义"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="gjzbx"
                            label="关键指标项"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="zzb"
                            label="子指标"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="kpff"
                            label="考评方法"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="jsgs"
                            label="计算公式"
                            >
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="期权详情" name="second">
                    <dynamic-table
                        :columns="detailsColumns"
                        :table-data="tableData2"
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
                        :columns="comColumns"
                        :table-data="tableData3"
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
        </el-dialog>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
import DynamicTable from '../../components/common/dytable/dytable.vue';
export default {
    props: {
        rowEmpApprTabDetailDataObj: String,
        rowEmpApprTabDetailtype:Boolean,
        disFlag:Boolean
    },
    components: {
        DynamicTable,
    },
    data(){
        return{
            tableData:[],
            tableData2:[],
            tableData3:[],
            yearData:[],
            monthData:[],
            formLabelWidth: "120px",
            ShowFinancVisible:false,
            labelPosition: 'left',
            taskLine:[],
            qqLine:[],
            comLine:[],
            formdata:{
                company:'',
                voucherId:'',
                departmentName:'',
                positionName:'',
                name:'',
                year:'',
                month:'',
                version:'',
                collegeStudent:false,
                newRecruits:false,
                score:'',
                biliName:'',
            },
            companyData:[],
            yearsData:[],
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            columns:[
                {
                    key: 'kpx',
                    title: '考评项'
                },
                {
                    key: 'zbdy',
                    title: '指标定义'
                },
                {
                    key: 'gjzbx',
                    title: '关键指标项'
                },
                {
                    key: 'zzb',
                    title: '子指标'
                },
                {
                    key: 'kpff',
                    title: '考评方法'
                },
                {
                    key: 'jsgs',
                    title: '计算公式'
                }
            ],
            detailsColumns:[
                {
                    key: 'kpx',
                    title: '考评项(一级)'
                },
                {
                    key: 'gjzb',
                    title: '关键指标(二级)'
                },
                {
                    key: 'zzb',
                    title: '子指标(三级)'
                },
                {
                    key: 'zbqz',
                    title: '指标权重'
                },
                {
                    key: 'zbdf',
                    title: '指标得分'
                },
                {
                    key: 'nameOfDeductionItemName',
                    title: '扣减项名称'
                },
                {
                    key: 'deductions',
                    title: '扣减项扣除'
                },
                 {
                    key: 'fjxkjxName',
                    title: '否决项名称'
                },
                {
                    key: 'fjkjbl',
                    title: '否决项扣除'
                },
                {
                    key: 'zzdf',
                    title: '最终得分'
                },
                {
                    key: 'qqkcbl',
                    title: '期权扣除比例及原因'
                },
            ],
            // encColumns:[
            //     {
            //         key: 'key1',
            //         title: '指标分类名称'
            //     },
            //     {
            //         key: 'key2',
            //         title: '指标类型'
            //     },
            //     {
            //         key: 'key3',
            //         title: '权重'
            //     },
            //     {
            //         key: 'key4',
            //         title: '计划值'
            //     },
            //     {
            //         key: 'key5',
            //         title: '实际值'
            //     },
            //     {
            //         key: 'key6',
            //         title: '比例'
            //     },
            //     {
            //         key: 'key7',
            //         title: '否决项名称'
            //     },
            //     {
            //         key: 'key8',
            //         title: '否决项扣除'
            //     },
            //     {
            //         key: 'key9',
            //         title: '扣减项名称'
            //     },
            //     {
            //         key: 'key10',
            //         title: '扣减项扣除'
            //     },
            //     {
            //         key: 'key11',
            //         title: '得分'
            //     },
            //     {
            //         key: 'key12',
            //         title: '备注'
            //     },
            // ],
            comColumns:[
                {
                    key: 'companyName',
                    title: '公司名称'
                },
                {
                    key: 'departmentName',
                    title: '部门名称'
                },
                {
                    key: 'weight',
                    title: '权重'
                },
                {
                    key: 'ratio',
                    title: '比例'
                },
                {
                    key: 'fjxkjxName',
                    title: '否决项名称'
                },
                {
                    key: 'fjkjbl',
                    title: '否决项扣除'
                },
                {
                    key: 'nameOfDeductionItemName',
                    title: '扣减项名称'
                },
                {
                    key: 'deductions',
                    title: '扣减项扣除'
                },
                {
                    key: 'score',
                    title: '得分'
                },
                {
                    key: 'remark',
                    title: '备注'
                },
            ],
            
        }
    },
    methods: {
        selectCom(){
            this.$api.jobUserManagement.getCompanyData().then((res) => {
                if (res.status == "200") {
                    this.companyData= res.data.data.rows;
                }
            }),
            (error) => {
                console.log(error);
            };
        },
        //获取员工考评表详情
        geTempApprSelected(data) {
        this.$api.processSet.getTempApprDetail(data)
        .then((res) => {
                if(res.status == 200){
                    this.formdata = res.data;
                    // this.taskLine = res.data.qqLine;  
                    let restaskLine = res.data.qqLine;
                    var qqLineArray = [];
                    restaskLine.map((mapItem) => {
                        qqLineArray.push({ id: mapItem.id, List: [mapItem] })
                    })
                    this.taskLine = qqLineArray;
                    debugger
                    console.log('sly,,,');
                    console.log(res.data.taskLine);
                    // for(var i=0;i<res.data.qqLine.length;i++) {
                    //     this.taskLine[i]['id'] = i;
                    //     if(qqLineArray.length <= 1) {
                    //         qqLineArray.push(res.data.qqLine[i]);
                    //     } 
                    //     // this.taskLine[i]['list'] = qqLineArray.push(res.data.qqLine[i]);
                    // }
                    



                    // item.list[

                    // ]

                    // [
                    //     {
                    //         id:'1',
                    //         list:[

                    //         ]
                    //     }，
                    //      {
                    //         id:'2',
                    //         list:[

                    //         ]
                    //     }
                    // ]



                    // var qqLineData = [];
                    // for(var i=0;i<res.data.qqLine.length;i++) {

                    //     // this.tableData.push(res.data.qqLine[i]);
                    // }


                // res.qqLine
                // let tableDataObj = {};
                // tableDataObj["key1"] = '计划值';
                // tableDataObj["key2"] = 'Q 累计预计计划完成指标';
                // tableDataObj["optionValue"] = res.data.data.optionValue;
                // tableDataObj["unit"] = res.data.data.unit;
                // this.tableData.push(tableDataObj);
                // let taskStateParams = res.data.data.taskState;
                // let taskTypeParams = res.data.data.taskType;
                // let taskLeveParams = res.data.data.taskLevel;
                // switch(taskStateParams) {
                //     case "1": 
                //         this.formdata.taskState = '可执行';
                //         break;
                //     case "2":
                //         this.formdata.taskState = '已完成';
                //         break;
                //     case "3":
                //         this.formdata.taskState = '未完成';
                //         break;
                //     case "4":
                //         this.formdata.taskState = '延期';
                //         break;
                //     case '5':
                //         this.formdata.taskState ='作废';
                //         break;
                //     case '0':
                //         this.formdata.taskState ='未发生';
                //         break;
                //     case '10':
                //         this.formdata.taskState ='已报待批';
                //         break;
                //     default:
                //         break; 
                // }
                // switch(taskTypeParams) {
                //     case 1: 
                //         this.formdata.taskType = '主任务';
                //         break;
                //     case 2:
                //         this.formdata.taskType = '临时任务';
                //         break;
                //     case 3:
                //         this.formdata.taskType = '配合任务';
                //         break;
                //     default:
                //         break; 
                // }
                // switch(taskLeveParams) {
                //     case 1: 
                //         this.formdata.taskLevel = '一级';
                //         break;
                //     case 2:
                //         this.formdata.taskLevel = '二级';
                //         break;
                //     case 3:
                //         this.formdata.taskLevel = '三级';
                //         break;
                //     case 4:
                //         this.formdata.taskLevel = '四级';
                //         break;
                //     case 5:
                //         this.formdata.taskLevel ='五级';
                //         break;
                //     case 6:
                //         this.formdata.taskLevel ='六级';
                //         break;
                //     case 7:
                //         this.formdata.taskLevel ='七级';
                //         break;
                //     case 8:
                //         this.formdata.taskLevel ='八级';
                //         break;
                //     case 9:
                //         this.formdata.taskLevel ='九级';
                //         break;
                //     case 10:
                //         this.formdata.taskLevel ='十级';
                //         break;
                //     default:
                //         break; 
                // }
                // if(res.data.data.groupPoint) {
                //     this.focusLevelCheckList.push('集团重点');
                // } else if(res.data.data.companyPoint) {
                //     this.focusLevelCheckList.push('公司重点');
                // }  else if(res.data.data.departmentPoint) {
                //     this.focusLevelCheckList.push('部门重点')
                // } else {
                //     this.focusLevelCheckList.push('');
                // }
                }
            }),error => {
            console.log(error);
            }
        },
        handleClick() {

        }
    },
    watch:{
        rowEmpApprTabDetailtype(oldVal){
            if(this.rowEmpApprTabDetailtype){
                this.ShowFinancVisible=this.rowEmpApprTabDetailtype;
                let empApprSelected = {};     
                empApprSelected.id = this.rowEmpApprTabDetailDataObj;
                this.geTempApprSelected(JSON.stringify(empApprSelected));
                this.selectCom();
            }
            
        },
    }
}
</script>
<style lang='scss' scoped>
.itemDivStyle{
    margin-left: 20px;
}
</style>
<style lang='scss'>
</style>