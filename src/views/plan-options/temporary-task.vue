<template>
    <div v-if="ShowFinancVisible" class="itemDivStyle">
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
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="部门" >
                        <el-input v-model="formdata.creditcontract" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="责任部门" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="检查人" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="交办人" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务状态" >
                        <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="14">
                    <el-form-item label="责任人" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="调整" >
                        <el-checkbox v-model="formdata.checked">时间调整</el-checkbox>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="协办人">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="秘书">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="开始时间" prop="name">
                        <el-date-picker
                            v-model="formdata.name"
                            type="date"
                            v-bind:disabled="disabled"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="结束时间" prop="name">
                        <el-date-picker
                            v-model="formdata.name"
                            type="date"
                            v-bind:disabled="disabled"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务类型" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务等级" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="任务名称" prop="name">
                        <el-input v-model="formdata.name" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人" >
                        <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="经办时间">
                        <el-date-picker
                            v-model="formdata.name"
                            type="date"
                            v-bind:disabled="disabled"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="14" :offset="2">
                    <el-form-item label="重要级别" >
                        <el-radio v-model="formdata.radio" label="1">集团重点</el-radio>
                        <el-radio v-model="formdata.radio" label="2">公司重点</el-radio>
                        <el-radio v-model="formdata.radio" label="3">部门重点</el-radio>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="工作标准">
                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="22">
                    <el-table
                        :data="tableData"
                        ref="table"
                        size="mini"
                        tooltip-effect="dark"
                        border
                        stripe
                        style="width:100%;">
                        <el-table-column label="序号" >
                            计划值
                        </el-table-column>
                        <el-table-column label="参数名称" >
                            Q累计预计计划完成指标
                        </el-table-column>
                        <el-table-column label="期权数值" >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.awardable" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量单位" >
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.awardableamount" size="mini"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
              </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowTEMTaskDataObj: Object,
        rowTEMTasktype:Boolean,
    },
    components: {
        
    },
    data(){
        return{
            ShowFinancVisible:false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
            atctiveName:'first',
            pageNum: 1,
            pageSize: 10,
            total: 20,
            tableData:[
                {
                    awardable:'',
                    awardableamount:'',
                }
            ],
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        }
    },
    methods: {
        MoreSearchPS(){

        },
        handleClick(){

        },
    },
    watch:{
        rowTEMTasktype(oldVal,newVal){
            this.ShowFinancVisible=this.rowTEMTasktype;
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