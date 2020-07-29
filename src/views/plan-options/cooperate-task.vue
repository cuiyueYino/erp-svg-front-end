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
                    <el-form-item label="部门">
                        <el-input v-model="formdata.voucherid" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="责任部门" prop="name">
                        <el-input v-model="formdata.creditcontract" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="检查人" prop="name">
                        <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务类型">
                        <el-input v-model="formdata.voucherid" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="任务等级" prop="name">
                        <el-input v-model="formdata.creditcontract" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
                <el-col :span="5" :offset="2">
                    <el-form-item label="状态" prop="name">
                        <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="交办人">
                        <el-input v-model="formdata.voucherid" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="开始时间" prop="name">
                        <el-input v-model="formdata.creditcontract" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="完成时间" prop="name">
                        <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="任务名称">
                        <el-input v-model="formdata.voucherid" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办人" prop="name">
                        <el-input v-model="formdata.creditcontract" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset="2">
                    <el-form-item label="经办时间" prop="name">
                        <el-input v-model="formdata.adjustdateStr" v-bind:disabled="disabled"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="21">
                    <el-form-item label="责任人">
                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="1">
                    <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchPS(formdata)"></el-button>
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
            <el-row>
                <el-col :span="22">
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="formdata.remark" :rows="5"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import proData from '../../components/common/proData/proData';
export default {
    props: {
        rowCOOTaskDataObj: Object,
        rowCOOTasktype:Boolean,
    },
    data(){
        return{
            ShowFinancVisible:false,
            disabled:false,
            labelPosition: 'left',
            formdata:{},
            companyData:new proData().company,
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

        }
    },
    watch:{
        rowCOOTasktype(oldVal,newVal){
            this.ShowFinancVisible=this.rowCOOTasktype;
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