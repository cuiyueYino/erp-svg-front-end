<template>
    <div>
        <el-dialog title="综合授信合同登记" @close="handleClose" :visible.sync="ShowFinancVisible" :append-to-body="true" v-if="ShowFinancVisible" :close-on-click-modal="false" width="70%">
            <el-form
                label-width="110px"
                v-model="formdata"
                class="dataForm"
                :rules="rules"
                size="mini"
                :model="formdata"
                :label-position="labelPosition"
            >
                <el-card>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="公司" prop="company">
                                <el-select v-model="formdata.company" value-key="value" v-bind:disabled="disabled">
                                    <el-option
                                        v-for="item in companyoptions"
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
                            <el-form-item label="授信合同编码" prop="code">
                                <el-input v-model="formdata.contractcode" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="合同名称" prop="name">
                                <el-input v-model="formdata.contractname" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="用信品种">
                                <el-input v-model="formdata.usercreditbreed" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信主体" prop="code">
                                <el-input v-model="formdata.parta" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" :offset="2">
                            <el-form-item label="授信额度" prop="name">
                                <el-input v-model="formdata.awardamount" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信品种">
                                <el-input v-model="formdata.awardcreditbreed" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                        <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="授信银行" prop="code">
                                <el-input v-model="formdata.parta" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="primary" size="mini" icon="el-icon-search" @click="MoreSearchuserVisible = true"></el-button>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信调整额度" prop="name">
                                <el-input v-model="formdata.awardamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="2">
                            <el-form-item label="授信占用">
                                <el-input v-model="formdata.awardcreditbreed" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信天数" prop="code">
                                <el-input v-model="formdata.awarddays" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信可用额度" prop="name">
                                <el-input v-model="formdata.awardableamount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="2">
                            <el-form-item label="授信余额">
                                <el-input v-model="formdata.awardover" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="授信起始日" prop="code">
                                <el-input v-model="formdata.startdate" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="授信到期" prop="name">
                                <el-input v-model="formdata.enddate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="2">
                            <el-form-item label="剩余天数">
                                <el-input v-model="formdata.overdays" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="经办人" prop="code">
                                <el-input v-model="formdata.handler" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="2">
                            <el-form-item label="经办时间" prop="name">
                                <el-input v-model="formdata.voucherdate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7" :offset="2">
                            <el-form-item label="经办部门">
                                <el-input v-model="formdata.gestordept" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="23">
                            <el-form-item label="项目描述">
                                <el-input type="textarea" v-model="formdata.remark" :rows="8" v-bind:disabled="disabled"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-tabs v-model="atctiveName">
                        <el-tab-pane label="用信合同登记" name="first">
                            <dynamic-table
                                :columns="Registrationcolumns"
                                :table-data="RegistrationtableData"
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
                        </el-tab-pane>
                        <el-tab-pane label="综合授信合同调整记录" name="second">
                            <dynamic-table
                                :columns="RegRecodecolumns"
                                :table-data="RegRecodetableData"
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
                        </el-tab-pane>
                        <el-tab-pane label="附件" name="third">
                            <dynamic-table
                                :columns="enclosurecolumns"
                                :table-data="enclosuretableData"
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
                        </el-tab-pane>
                    </el-tabs>
                    <dynamic-table
                        :columns="processcolumns"
                        :table-data="processtableData"
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
                <el-button @click="EditFinancVisible = false">查看流程图</el-button>
                <el-button @click="ShowFinancVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveNewAndEdit">提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import DynamicTable from '../../../components/common/dytable/dytable.vue';
import proData from '../../../components/common/proData/proData';
export default {
    props: {
        EditfinanrowId: String,
        saveflage: String,
        Editfinancingtype: Boolean
    },
    name: 'basetable',
    components: {
        DynamicTable,
    },
    inject: ['reload'],
    data: function() {   
        return {
            atctiveName: 'first',
            ShowFinancVisible:false,
            labelPosition: 'left',
            disabled:false,
            companyData:new proData().company,
            objectoptions:new proData().project,
            formdata: {
                company: '',
                objectName:'',
                code: '',
                remark: '',
                name: ''
            },
            Registrationcolumns:[
                {
                    key: 'contractcode',
                    title: '授信业务编码'
                },
                {
                    key: 'parta',
                    title: '授信主体'
                },
                {
                    key: 'contractname',
                    title: '用信合同名称'
                },
                {
                    key: 'statusString',
                    title: '融资金额-人民币'
                },
                {
                    key: 'statusString',
                    title: '质押金额'
                },
                {
                    key: 'statusString',
                    title: '用途'
                },
                {
                    key: 'statusString',
                    title: '到期日'
                },
                {
                    key: 'statusString',
                    title: '业务币种'
                },
                {
                    key: 'statusString',
                    title: '融资金额-原币'
                },
                {
                    key: 'statusString',
                    title: '授信占用(人民币)'
                },
            ],
            RegRecodecolumns:[
                {
                    key: 'Cnumber',
                    title: '序号'
                },
                {
                    key: 'statusString',
                    title: '授信品种'
                },
                {
                    key: 'statusString',
                    title: '授信额度'
                },
                {
                    key: 'statusString',
                    title: '授信可用额度'
                },
                {
                    key: 'statusString',
                    title: '授信调整额度'
                },
                {
                    key: 'statusString',
                    title: '授信占用'
                },
                {
                    key: 'statusString',
                    title: '授信余额'
                },
                {
                    key: 'statusString',
                    title: '备注'
                },
            ],
            enclosurecolumns:[
                {
                    key: 'Cnumber',
                    title: '文件类型'
                },
                {
                    key: 'Cnumber',
                    title: '文件'
                },
                {
                    key: 'Cnumber',
                    type: 'selection',
                    title: '必须'
                },
                {
                    key: 'Cnumber',
                    title: '编制单位'
                },
                {
                    key: 'Cnumber',
                    title: '负责人'
                },
                {
                    key: 'Cnumber',
                    title: '审核单位'
                },
                {
                    key: 'Cnumber',
                    title: '审核人'
                },
                {
                    key: 'Cnumber',
                    title: '定版日期'
                },
                {
                    key: 'Cnumber',
                    title: '文档等级'
                },
                {
                    key: 'Cnumber',
                    title: '保管期限'
                },
                {
                    key: 'Cnumber',
                    title: '备注'
                },
            ],
            processcolumns:[
                {
                    key: 'Cnumber',
                    title: '流程节点'
                },
                {
                    key: 'Cnumber',
                    title: '审批人'
                },
                {
                    key: 'Cnumber',
                    title: '审批结论'
                },
                {
                    key: 'Cnumber',
                    title: '审批说明'
                },
                {
                    key: 'Cnumber',
                    title: '审批时间'
                },
                {
                    key: 'Cnumber',
                    title: '标准时间'
                },
                {
                    key: 'Cnumber',
                    title: '耗时'
                },
                {
                    key: 'Cnumber',
                    title: '回复'
                },
                {
                    key: 'Cnumber',
                    title: '纸质签收日期'
                },
            ],
            RegistrationtableData: [],
            RegRecodetableData: [],
            enclosuretableData: [],
            processtableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 20,
            rules: {
                name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
                company:[{ required: true, message: '请选择公司', trigger: 'blur' }],
                code:[{ required: true, message: '请输入编码', trigger: 'blur' }],
            }
        };
    },
    methods: {
        //关闭当前dialog时给父组件传值
        handleClose(){
            this.$emit('changeShow',false);
        },
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        //分页
        onSizeChange(val) {
            this.pageSize = val;
        },
        //下一页
        onCurrentChange(val) {},
        //提交确认
        //提交确认
        saveNewAndEdit(){
            let editflag= this.editabled;
            if(editflag){
              let companyS= this.formdata.company;
              if(companyS== ''){
                this.$message.error('请选择公司!');
              }
              let codeS= this.formdata.code;
              let nameS= this.formdata.name;
              let remarkS= this.formdata.remark;
              let fromObj={};
              let saceFlage=this.saveflage;
              if(saceFlage === 'Update'){
                let selectOption= this.multipleSelection;
                fromObj.id=selectOption[0].id;
              }
              fromObj.company=companyS;
              fromObj.creator=localStorage.getItem('ms_userId');
              fromObj.code=codeS;
              fromObj.name=nameS;
              fromObj.remark=remarkS;
              let checkedS=this.checked;
              let messageStr=codeS+":"+nameS+"?";
              let tital="提交确认:";
              this.$Uconfirm(tital,messageStr).then(() => {
                this.$api.task.savepledgeTypeVO(fromObj).then(response => {
                    let responsevalue = response;
                    if (responsevalue) {
                        let returndata = responsevalue.data;
                        let tableDataArr=returndata.data;
                        this.NewEditVisible= false;
                        if(checkedS ===true){
                            this.onRowAddButtonClick();
                        }else{
                            this.reload();
                        }
                    } else {
                        this.$message.success('数据库没有该条数据!');
                    }
                });
              }).catch(() => {
                this.$message.success('取消提交!');
              });
            }else{
              this.NewEditVisible= false;  
            }
        }
    },
    mounted() {
    },
    watch:{
        Editfinancingtype(oldVal,newVal){
            this.ShowFinancVisible=this.Editfinancingtype;
            let finandata=this.EditfinanrowId;
            let editflag=this.saveflage;
            let formDataA ={};
            formDataA.id=finandata;
            this.$api.task.getComplexCreditContractRegisterVO(formDataA).then(response => {
                let responsevalue = response;
                if (responsevalue) {
                    let returndata = responsevalue.data;
                    let tableDataArr=returndata.data;
                    this.disabled = true;
                    this.editabled=false;
                    this.formdata=tableDataArr;
                    this.saveflage='Look';
                    this.NewEditVisible= true;
                    this.showCheckBox= false;
                    this.checked=false;
                } else {
                    this.$message.success('数据库没有该条数据!');
                }
            });
        }
    }
};
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